import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: '인증되지 않은 사용자입니다' },
        { status: 401 }
      )
    }

    const userProfile = await prisma.profile.findUnique({
      where: { userId: user.id }
    })

    if (!userProfile) {
      return NextResponse.json(
        { error: '프로필을 먼저 작성해주세요' },
        { status: 400 }
      )
    }

    interface Preferences {
      gender?: string[]
      ageRange?: [number, number]
      distance?: number
    }
    
    const preferences = (userProfile.preferences || {}) as Preferences
    
    const existingMatches = await prisma.match.findMany({
      where: {
        OR: [
          { userId1: user.id },
          { userId2: user.id }
        ]
      },
      select: {
        userId1: true,
        userId2: true
      }
    })

    const excludedUserIds = new Set([user.id])
    existingMatches.forEach(match => {
      excludedUserIds.add(match.userId1)
      excludedUserIds.add(match.userId2)
    })

    const whereClause: any = {
      userId: {
        notIn: Array.from(excludedUserIds)
      }
    }

    if (preferences.gender && preferences.gender.length > 0) {
      whereClause.gender = {
        in: preferences.gender
      }
    }

    if (preferences.ageRange) {
      whereClause.age = {
        gte: preferences.ageRange[0],
        lte: preferences.ageRange[1]
      }
    }

    if (preferences.distance && userProfile.location) {
      whereClause.location = userProfile.location
    }

    const recommendations = await prisma.profile.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            membershipTier: true,
            verified: true
          }
        },
        photos: {
          where: { isPrimary: true },
          take: 1
        }
      },
      take: 10,
      orderBy: [
        { verified: 'desc' },
        { completionScore: 'desc' },
        { lastActive: 'desc' }
      ]
    })

    const recommendationsWithScore = await Promise.all(
      recommendations.map(async (profile) => {
        const compatibility = await calculateDetailedCompatibility(userProfile, profile)
        return {
          ...profile,
          compatibility
        }
      })
    )

    recommendationsWithScore.sort((a, b) => b.compatibility - a.compatibility)

    return NextResponse.json(recommendationsWithScore)
  } catch (error) {
    console.error('추천 조회 오류:', error)
    return NextResponse.json(
      { error: '추천 조회 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}

interface ProfileCompat {
  interests?: string[]
  lookingFor?: string[]
  age: number
  location: string
  education?: string | null
  verified: boolean
  completionScore: number
  lastActive: Date
}

async function calculateDetailedCompatibility(profile1: ProfileCompat, profile2: ProfileCompat): Promise<number> {
  let score = 50

  if (profile1.interests && profile2.interests) {
    const commonInterests = profile1.interests.filter((i: string) => 
      profile2.interests?.includes(i)
    )
    score += Math.min(commonInterests.length * 3, 15)
  }

  if (profile1.lookingFor && profile2.lookingFor) {
    const commonGoals = profile1.lookingFor.filter((g: string) => 
      profile2.lookingFor?.includes(g)
    )
    score += Math.min(commonGoals.length * 5, 20)
  }

  const ageDiff = Math.abs(profile1.age - profile2.age)
  if (ageDiff <= 3) score += 10
  else if (ageDiff <= 5) score += 7
  else if (ageDiff <= 10) score += 3

  if (profile1.location === profile2.location) score += 10

  if (profile1.education && profile2.education) {
    if (profile1.education === profile2.education) score += 5
  }

  if (profile2.verified) score += 5

  if (profile2.completionScore >= 80) score += 5

  const daysSinceActive = Math.floor(
    (Date.now() - new Date(profile2.lastActive).getTime()) / (1000 * 60 * 60 * 24)
  )
  if (daysSinceActive <= 1) score += 5
  else if (daysSinceActive <= 7) score += 3

  return Math.min(score, 100)
}