'use client'

import { motion } from 'framer-motion'
import { Mail, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 mb-6">
            <Mail className="w-10 h-10 text-purple-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            이메일을 확인해주세요
          </h1>
          
          <p className="text-gray-600 mb-8">
            가입하신 이메일로 인증 링크를 보내드렸습니다.
            이메일을 확인하고 링크를 클릭하여 가입을 완료해주세요.
          </p>
          
          <div className="space-y-4">
            <Button
              variant="primary"
              className="w-full"
              onClick={() => window.location.href = 'mailto:'}
            >
              이메일 앱 열기
            </Button>
            
            <Link href="/auth/signin">
              <Button variant="secondary" className="w-full">
                로그인 페이지로 돌아가기
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              이메일을 받지 못하셨나요?
            </p>
            <button className="text-sm text-primary font-medium hover:underline">
              인증 메일 다시 보내기
            </button>
          </div>
          
          <div className="mt-6 text-xs text-gray-500">
            스팸 폴더도 확인해주세요
          </div>
        </Card>
      </motion.div>
    </div>
  )
}