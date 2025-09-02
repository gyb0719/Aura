import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function POST(request: NextRequest) {
  try {
    const { paymentKey, orderId, amount } = await request.json()

    // 토스페이먼츠 결제 승인
    const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(process.env.TOSS_SECRET_KEY + ':').toString('base64')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount
      })
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json(
        { error: '결제 승인에 실패했습니다', details: error },
        { status: 400 }
      )
    }

    const payment = await response.json()
    
    // orderId에서 userId 추출
    const userId = orderId.split('_')[1]
    
    // 구독 활성화
    await prisma.subscription.updateMany({
      where: { userId },
      data: {
        status: 'ACTIVE',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      }
    })

    // 사용자 멤버십 등급 업데이트
    const subscription = await prisma.subscription.findUnique({
      where: { userId }
    })

    if (subscription) {
      await prisma.user.update({
        where: { id: userId },
        data: { membershipTier: subscription.tier }
      })
    }

    return NextResponse.json({ 
      success: true, 
      payment,
      message: '결제가 완료되었습니다' 
    })

  } catch (error) {
    console.error('토스페이먼츠 Webhook 오류:', error)
    return NextResponse.json(
      { error: '결제 처리 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}