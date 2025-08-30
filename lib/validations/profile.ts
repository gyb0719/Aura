import { z } from 'zod'
import { Gender, LookingFor } from '@/types'

export const profileSchema = z.object({
  bio: z.string().max(500, '자기소개는 500자 이내로 작성해주세요').optional(),
  age: z.number().min(18, '만 18세 이상만 가입 가능합니다').max(100),
  gender: z.nativeEnum(Gender),
  location: z.string().min(1, '위치를 입력해주세요'),
  occupation: z.string().max(100, '직업은 100자 이내로 작성해주세요').optional(),
  education: z.string().max(100, '학력은 100자 이내로 작성해주세요').optional(),
  height: z.number().min(100).max(250).optional(),
  interests: z.array(z.string()).max(10, '관심사는 최대 10개까지 선택 가능합니다'),
  lookingFor: z.array(z.nativeEnum(LookingFor)).min(1, '최소 하나 이상 선택해주세요')
})

export const preferencesSchema = z.object({
  ageRange: z.tuple([z.number().min(18), z.number().max(100)]),
  distance: z.number().min(1).max(500),
  gender: z.array(z.nativeEnum(Gender)).min(1),
  heightRange: z.tuple([z.number().min(100), z.number().max(250)]).optional(),
  education: z.array(z.string()).optional(),
  hasChildren: z.boolean().optional(),
  wantsChildren: z.boolean().optional(),
  smoking: z.boolean().optional(),
  drinking: z.enum(['never', 'social', 'regular']).optional(),
  religion: z.string().optional()
})

export const photoUploadSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, '파일 크기는 5MB 이하여야 합니다')
    .refine(
      (file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
      '이미지 파일만 업로드 가능합니다'
    )
})

export type ProfileInput = z.infer<typeof profileSchema>
export type PreferencesInput = z.infer<typeof preferencesSchema>
export type PhotoUploadInput = z.infer<typeof photoUploadSchema>