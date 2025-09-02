import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/db/prisma'

const TOSS_SECRET_KEY = process.env.TOSS_SECRET_KEY!
const TOSS_CLIENT_KEY = process.env.TOSS_CLIENT_KEY!

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

    const subscription = await prisma.subscription.findUnique({
      where: { userId: user.id },
      include: {
        user: {
          select: {
            membershipTier: true
          }
        }
      }
    })

    return NextResponse.json(subscription)
  } catch (error) {
    console.error('구독 조회 오류:', error)
    return NextResponse.json(
      { error: '구독 정보 조회 중 오류가 발생했습니다' },
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

    const { tier } = await request.json()

    const priceMap = {
      'PREMIUM': 29900,
      'PLATINUM': 49900, 
      'DIAMOND': 99900
    }

    const amount = priceMap[tier as keyof typeof priceMap]
    if (!amount) {
      return NextResponse.json(
        { error: '유효하지 않은 구독 등급입니다' },
        { status: 400 }
      )
    }

    const orderId = `aura_${user.id}_${Date.now()}`
    const orderName = `AURA ${tier} 구독`

    // 토스페이먼츠 결제 준비
    const paymentData = {
      amount,
      orderId,
      orderName,
      customerEmail: user.email,
      customerName: user.user_metadata?.name || '사용자',
      successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      failUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/fail`
    }

    // 임시 구독 정보 저장 (결제 완료 시 활성화)
    await prisma.subscription.upsert({
      where: { userId: user.id },
      update: {
        tier,
        status: 'TRIAL',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30일 후
      },
      create: {
        userId: user.id,
        tier,
        status: 'TRIAL',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    })

    return NextResponse.json(paymentData, { status: 201 })

  } catch (error) {
    console.error('구독 생성 오류:', error)
    return NextResponse.json(
      { error: '구독 생성 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}

async function getOrCreateCustomer(user: any): Promise<string> {
  const existingSubscription = await prisma.subscription.findUnique({
    where: { userId: user.id }
  })

  if (existingSubscription?.stripeCustomerId) {
    return existingSubscription.stripeCustomerId
  }

  const customer = await stripe.customers.create({
    email: user.email,
    name: user.user_metadata?.name || user.email,
    metadata: { userId: user.id }
  })

  return customer.id
}