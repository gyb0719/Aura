import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/db/prisma'

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

    const formData = await request.formData()
    const file = formData.get('file') as File
    const profileId = formData.get('profileId') as string
    const isPrimary = formData.get('isPrimary') === 'true'

    if (!file) {
      return NextResponse.json(
        { error: '파일이 선택되지 않았습니다' },
        { status: 400 }
      )
    }

    // 파일 유효성 검사
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: '파일 크기는 5MB 이하여야 합니다' },
        { status: 400 }
      )
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: '이미지 파일만 업로드 가능합니다' },
        { status: 400 }
      )
    }

    // Supabase Storage에 업로드
    const fileName = `${user.id}/${Date.now()}-${file.name}`
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('profile-photos')
      .upload(fileName, file)

    if (uploadError) {
      return NextResponse.json(
        { error: '파일 업로드에 실패했습니다' },
        { status: 500 }
      )
    }

    // 공개 URL 생성
    const { data: { publicUrl } } = supabase.storage
      .from('profile-photos')
      .getPublicUrl(fileName)

    // 데이터베이스에 사진 정보 저장
    const photo = await prisma.photo.create({
      data: {
        profileId,
        url: publicUrl,
        isPrimary,
        order: 0
      }
    })

    return NextResponse.json(photo, { status: 201 })
  } catch (error) {
    console.error('사진 업로드 오류:', error)
    return NextResponse.json(
      { error: '사진 업로드 중 오류가 발생했습니다' },
      { status: 500 }
    )
  }
}