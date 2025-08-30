import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/db/prisma'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data: { user: authUser } } = await supabase.auth.getUser()
    
    if (!authUser) {
      return NextResponse.json(
        { error: '인증되지 않은 사용자입니다' },
        { status: 401 }
      )
    }

    let user = await prisma.user.findUnique({
      where: { email: authUser.email! },
      include: {
        profile: {
          include: {
            photos: {
              orderBy: { order: 'asc' }
            }
          }
        },
        subscription: true
      }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: authUser.id,
          email: authUser.email!,
          name: authUser.user_metadata?.name || null,
          image: authUser.user_metadata?.avatar_url || null
        },
        include: {
          profile: {
            include: {
              photos: true
            }
          },
          subscription: true
        }
      })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('사용자 조회 오류:', error)
    return NextResponse.json(
      { error: '사용자 조회 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user: authUser } } = await supabase.auth.getUser()
    
    if (!authUser) {
      return NextResponse.json(
        { error: '인증되지 않은 사용자입니다' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, image } = body

    const user = await prisma.user.update({
      where: { id: authUser.id },
      data: {
        name,
        image,
        updatedAt: new Date()
      },
      include: {
        profile: {
          include: {
            photos: true
          }
        },
        subscription: true
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('사용자 업데이트 오류:', error)
    return NextResponse.json(
      { error: '사용자 업데이트 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json(
        { error: '인증되지 않은 사용자입니다' },
        { status: 401 }
      )
    }

    await prisma.user.delete({
      where: { id: user.id }
    })

    const { error } = await supabase.auth.admin.deleteUser(user.id)
    
    if (error) {
      console.error('Supabase 사용자 삭제 오류:', error)
    }

    return NextResponse.json(
      { message: '계정이 삭제되었습니다' },
      { status: 200 }
    )
  } catch (error) {
    console.error('계정 삭제 오류:', error)
    return NextResponse.json(
      { error: '계정 삭제 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}