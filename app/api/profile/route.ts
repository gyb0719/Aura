import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/db/prisma'
import { profileSchema } from '@/lib/validations/profile'

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

    const profile = await prisma.profile.findUnique({
      where: { userId: user.id },
      include: {
        photos: {
          orderBy: { order: 'asc' }
        }
      }
    })

    if (!profile) {
      return NextResponse.json(
        { error: '프로필을 찾을 수 없습니다' },
        { status: 404 }
      )
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error('프로필 조회 오류:', error)
    return NextResponse.json(
      { error: '프로필 조회 중 오류가 발생했습니다' },
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

    const body = await request.json()
    const validatedData = profileSchema.parse(body)

    const existingProfile = await prisma.profile.findUnique({
      where: { userId: user.id }
    })

    if (existingProfile) {
      return NextResponse.json(
        { error: '이미 프로필이 존재합니다' },
        { status: 400 }
      )
    }

    const profile = await prisma.profile.create({
      data: {
        ...validatedData,
        userId: user.id,
        completionScore: calculateCompletionScore(validatedData)
      }
    })

    return NextResponse.json(profile, { status: 201 })
  } catch (error) {
    console.error('프로필 생성 오류:', error)
    return NextResponse.json(
      { error: '프로필 생성 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: '인증되지 않은 사용자입니다' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = profileSchema.partial().parse(body)

    const profile = await prisma.profile.update({
      where: { userId: user.id },
      data: {
        ...validatedData,
        completionScore: calculateCompletionScore(validatedData),
        lastActive: new Date()
      }
    })

    return NextResponse.json(profile)
  } catch (error) {
    console.error('프로필 업데이트 오류:', error)
    return NextResponse.json(
      { error: '프로필 업데이트 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}

function calculateCompletionScore(data: any): number {
  let score = 0
  const fields = ['bio', 'age', 'gender', 'location', 'occupation', 'education', 'height', 'interests', 'lookingFor']
  
  fields.forEach(field => {
    if (data[field]) {
      if (Array.isArray(data[field]) && data[field].length > 0) {
        score += 10
      } else if (data[field]) {
        score += 10
      }
    }
  })
  
  return Math.min(score, 100)
}