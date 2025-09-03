'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Heart, Mail, Lock, Sparkles, AlertCircle } from 'lucide-react'
import { signInSchema, type SignInInput } from '@/lib/validations/auth'
import { signIn } from 'next-auth/react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function SignInPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = async (data: SignInInput) => {
    setIsLoading(true)
    setError(null)
    
    // 포트폴리오 데모용 로그인
    try {
      // 간단한 이메일 검증
      if (!data.email || !data.password) {
        setError('이메일과 비밀번호를 입력해주세요')
        return
      }
      
      // 2초 딜레이로 실제 로그인 느낌 연출
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 성공적으로 대시보드로 이동
      alert('포트폴리오 데모: 로그인 성공! 대시보드로 이동합니다.')
      router.push('/dashboard')
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-6 sm:p-8" variant="glass">
          <div className="text-center mb-6 sm:mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 mb-4 shadow-lg"
            >
              <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </motion.div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              다시 만나서 반가워요
            </h1>
            <p className="text-sm sm:text-base text-gray-600 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              당신의 인연이 기다리고 있습니다
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <p className="text-red-600 text-sm">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                이메일
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="your@email.com"
                  disabled={isLoading}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 bg-white text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  placeholder="••••••••"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors p-1"
                  aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary/20" />
                <span className="ml-2 text-sm text-gray-600">로그인 상태 유지</span>
              </label>
              <Link href="/auth/forgot-password" className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
                비밀번호 찾기
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isLoading}
              className="h-12 text-base font-medium"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  로그인 중...
                </div>
              ) : (
                '로그인'
              )}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white/80 backdrop-blur text-gray-500">또는</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  // 포트폴리오 데모용
                  alert('포트폴리오 데모: Google 로그인 기능 (실제로는 OAuth 연동 필요)')
                  // 실제 구현: signIn('google')
                }}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 bg-white rounded-xl hover:bg-gray-50 transition-all"
              >
                <div className="w-5 h-5 mr-2 bg-gradient-to-br from-blue-500 to-red-500 rounded" />
                <span className="text-sm font-medium text-gray-900">Google</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  // 포트폴리오 데모용
                  alert('포트폴리오 데모: 카카오 로그인 기능 (실제로는 Kakao SDK 연동 필요)')
                  // 실제 구현: window.Kakao.Auth.login()
                }}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 bg-white rounded-xl hover:bg-yellow-50 transition-all"
              >
                <div className="w-5 h-5 mr-2 bg-yellow-400 rounded" />
                <span className="text-sm font-medium text-gray-900">Kakao</span>
              </motion.button>
            </div>
          </div>

          <p className="mt-6 sm:mt-8 text-center text-sm text-gray-600">
            아직 계정이 없으신가요?{' '}
            <Link href="/auth/signup" className="text-primary font-semibold hover:text-primary/80 transition-colors">
              회원가입
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  )
}