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
    const matchId = searchParams.get('matchId')

    if (!matchId) {
      return NextResponse.json(
        { error: '매치 ID가 필요합니다' },
        { status: 400 }
      )
    }

    const match = await prisma.match.findFirst({
      where: {
        id: matchId,
        OR: [
          { userId1: user.id },
          { userId2: user.id }
        ]
      }
    })

    if (!match) {
      return NextResponse.json(
        { error: '매치를 찾을 수 없습니다' },
        { status: 404 }
      )
    }

    const messages = await prisma.message.findMany({
      where: { matchId },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      },
      orderBy: { createdAt: 'asc' }
    })

    await prisma.message.updateMany({
      where: {
        matchId,
        senderId: { not: user.id },
        read: false
      },
      data: {
        read: true,
        readAt: new Date()
      }
    })

    return NextResponse.json(messages)
  } catch (error) {
    console.error('메시지 조회 오류:', error)
    return NextResponse.json(
      { error: '메시지 조회 중 오류가 발생했습니다' },
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

    const { matchId, content } = await request.json()

    if (!matchId || !content) {
      return NextResponse.json(
        { error: '필수 정보가 누락되었습니다' },
        { status: 400 }
      )
    }

    const match = await prisma.match.findFirst({
      where: {
        id: matchId,
        status: MatchStatus.MATCHED,
        OR: [
          { userId1: user.id },
          { userId2: user.id }
        ]
      }
    })

    if (!match) {
      return NextResponse.json(
        { error: '매치된 상태가 아닙니다' },
        { status: 403 }
      )
    }

    const message = await prisma.message.create({
      data: {
        matchId,
        senderId: user.id,
        content
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      }
    })

    await prisma.match.update({
      where: { id: matchId },
      data: { lastInteraction: new Date() }
    })

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    console.error('메시지 전송 오류:', error)
    return NextResponse.json(
      { error: '메시지 전송 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}