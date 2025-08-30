import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/db/prisma'
import { MatchStatus } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: '인증되지 않은 사용자입니다' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') as MatchStatus | null

    const matches = await prisma.match.findMany({
      where: {
        AND: [
          {
            OR: [
              { userId1: user.id },
              { userId2: user.id }
            ]
          },
          status ? { status } : {}
        ]
      },
      include: {
        user1: {
          include: {
            profile: {
              include: {
                photos: {
                  where: { isPrimary: true },
                  take: 1
                }
              }
            }
          }
        },
        user2: {
          include: {
            profile: {
              include: {
                photos: {
                  where: { isPrimary: true },
                  take: 1
                }
              }
            }
          }
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      },
      orderBy: { updatedAt: 'desc' }
    })

    const formattedMatches = matches.map(match => {
      const otherUser = match.userId1 === user.id ? match.user2 : match.user1
      return {
        id: match.id,
        user: otherUser,
        compatibility: match.compatibility,
        status: match.status,
        matchedAt: match.matchedAt,
        lastMessage: match.messages[0] || null,
        lastInteraction: match.lastInteraction
      }
    })

    return NextResponse.json(formattedMatches)
  } catch (error) {
    console.error('매치 조회 오류:', error)
    return NextResponse.json(
      { error: '매치 조회 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: '인증되지 않은 사용자입니다' },
        { status: 401 }
      )
    }

    const { targetUserId, action } = await request.json()

    if (!targetUserId || !action) {
      return NextResponse.json(
        { error: '필수 정보가 누락되었습니다' },
        { status: 400 }
      )
    }

    const existingMatch = await prisma.match.findFirst({
      where: {
        OR: [
          { userId1: user.id, userId2: targetUserId },
          { userId1: targetUserId, userId2: user.id }
        ]
      }
    })

    if (existingMatch) {
      if (action === 'like' && existingMatch.status === MatchStatus.PENDING) {
        const updatedMatch = await prisma.match.update({
          where: { id: existingMatch.id },
          data: {
            status: MatchStatus.MATCHED,
            matchedAt: new Date(),
            lastInteraction: new Date()
          }
        })
        return NextResponse.json(updatedMatch)
      }
      
      return NextResponse.json(
        { error: '이미 매치 요청이 존재합니다' },
        { status: 400 }
      )
    }

    const match = await prisma.match.create({
      data: {
        userId1: user.id,
        userId2: targetUserId,
        status: action === 'like' ? MatchStatus.PENDING : MatchStatus.REJECTED,
        initiatedBy: user.id,
        compatibility: await calculateCompatibility(user.id, targetUserId)
      }
    })

    return NextResponse.json(match, { status: 201 })
  } catch (error) {
    console.error('매치 생성 오류:', error)
    return NextResponse.json(
      { error: '매치 생성 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}

async function calculateCompatibility(userId1: string, userId2: string): Promise<number> {
  try {
    const [profile1, profile2] = await Promise.all([
      prisma.profile.findUnique({ where: { userId: userId1 } }),
      prisma.profile.findUnique({ where: { userId: userId2 } })
    ])

    if (!profile1 || !profile2) return 0

    let score = 50

    if (profile1.interests && profile2.interests) {
      const commonInterests = profile1.interests.filter(i => 
        profile2.interests.includes(i)
      )
      score += commonInterests.length * 5
    }

    if (profile1.lookingFor && profile2.lookingFor) {
      const commonGoals = profile1.lookingFor.filter(g => 
        profile2.lookingFor.includes(g)
      )
      score += commonGoals.length * 10
    }

    const ageDiff = Math.abs(profile1.age - profile2.age)
    if (ageDiff <= 5) score += 10
    else if (ageDiff <= 10) score += 5

    if (profile1.location === profile2.location) score += 15

    return Math.min(score, 100)
  } catch (error) {
    console.error('호환성 계산 오류:', error)
    return 50
  }
}