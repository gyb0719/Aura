'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Heart, Check } from 'lucide-react'
import { signUpSchema, type SignUpInput } from '@/lib/validations/auth'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const passwordRequirements = [
  { regex: /.{8,}/, text: '최소 8자 이상' },
  { regex: /[A-Z]/, text: '대문자 포함' },
  { regex: /[a-z]/, text: '소문자 포함' },
  { regex: /\d/, text: '숫자 포함' },
  { regex: /[@$!%*?&]/, text: '특수문자 포함' }
]

export default function SignUpPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema)
  })

  const watchPassword = watch('password')

  const onSubmit = async (data: SignUpInput) => {
    setIsLoading(true)
    setError(null)
    
    // 포트폴리오 데모용 회원가입
    try {
      // 기본 유효성 검사
      if (!data.email || !data.password || !data.name) {
        setError('모든 필드를 입력해주세요')
        return
      }
      
      if (!data.terms) {
        setError('이용약관에 동의해주세요')
        return
      }
      
      // 2초 딜레이로 실제 회원가입 느낌 연출
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 성공적으로 대시보드로 이동
      alert('포트폴리오 데모: 회원가입 성공! 대시보드로 이동합니다.')
      router.push('/dashboard')
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 mb-4">
              <Heart className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              AURA와 함께 시작하세요
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              검증된 프리미엄 회원들과 만나보세요
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900 dark:text-white text-gray-700 dark:text-gray-300 mb-2">
                이름
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="홍길동"
                disabled={isLoading}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white text-gray-700 dark:text-gray-300 mb-2">
                이메일
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="your@email.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 dark:text-white text-gray-700 dark:text-gray-300 mb-2">
                비밀번호
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    onChange: (e) => setPassword(e.target.value)
                  })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-12"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
              
              {password && (
                <div className="mt-3 space-y-2">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                        req.regex.test(password) ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        {req.regex.test(password) && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`text-sm ${
                        req.regex.test(password) ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900 dark:text-white text-gray-700 dark:text-gray-300 mb-2">
                비밀번호 확인
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword')}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent pr-12"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  {...register('terms')}
                  className="mt-1 rounded text-primary focus:ring-primary"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  <Link href="/terms" className="text-primary hover:underline">이용약관</Link> 및{' '}
                  <Link href="/privacy" className="text-primary hover:underline">개인정보처리방침</Link>에
                  동의합니다
                </span>
              </label>
              {errors.terms && (
                <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? '회원가입 중...' : '회원가입'}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">또는</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button 
                onClick={() => {
                  alert('포트폴리오 데모: Google 로그인 기능 (실제로는 OAuth 연동 필요)')
                }}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="w-5 h-5 mr-2 bg-gradient-to-br from-blue-500 to-red-500 rounded" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Google</span>
              </button>
              <button 
                onClick={() => {
                  alert('포트폴리오 데모: 카카오 로그인 기능 (실제로는 Kakao SDK 연동 필요)')
                }}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="w-5 h-5 mr-2 bg-yellow-400 rounded" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Kakao</span>
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300">
            이미 계정이 있으신가요?{' '}
            <Link href="/auth/signin" className="text-primary font-medium hover:underline">
              로그인
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  )
}