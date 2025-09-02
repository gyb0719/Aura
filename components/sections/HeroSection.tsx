"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function HeroSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      console.log("대기자 명단 등록:", email)
      setIsSubmitted(true)
      setTimeout(() => setIsSubmitted(false), 3000)
    }
  }

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center justify-center">
          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 sm:mb-8 lg:mb-12 tracking-tight text-center w-full"
          >
            <span className="text-gray-900 dark:text-white block sm:inline">당신의 완벽한</span>
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent block sm:inline">
              인연을 만나세요
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto leading-relaxed text-center px-4"
          >
            AI가 분석하는 성향 매칭으로 진정한 인연을 찾아드립니다.
            <span className="block sm:inline"> 검증된 프리미엄 회원들과 함께하세요.</span>
          </motion.p>

          {/* CTA Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-lg mx-auto w-full px-4 sm:px-0"
          >
            <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                type="email"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-gray-200 bg-white/90 backdrop-blur focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all text-gray-900 placeholder-gray-500 text-base sm:text-lg shadow-sm"
                required
              />
              <button
                type="submit"
                className="px-8 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-xl sm:rounded-2xl transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-base sm:text-lg shadow-lg whitespace-nowrap"
              >
                {isSubmitted ? "등록 완료!" : "시작하기"}
              </button>
            </form>
            <p className="text-sm sm:text-base text-gray-500 mt-4 sm:mt-6">
              무료로 시작하고 언제든 취소할 수 있습니다
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-12 mt-16 sm:mt-20 lg:mt-32 max-w-3xl mx-auto w-full px-4 sm:px-0"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center flex flex-col items-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">10만+</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 sm:mt-2 lg:mt-3">활성 회원</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center flex flex-col items-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">87%</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 sm:mt-2 lg:mt-3">매칭 성공률</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center flex flex-col items-center"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">4.9점</div>
              <div className="text-xs sm:text-sm md:text-base text-gray-600 mt-1 sm:mt-2 lg:mt-3">사용자 만족도</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-gray-400" />
      </motion.button>
    </section>
  )
}