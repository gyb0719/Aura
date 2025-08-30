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
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50" />
      <div className="absolute inset-0 bg-pattern-dots opacity-5" />
      <div className="container mx-auto px-6 lg:px-12 py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight"
          >
            <span className="text-gray-900">당신의 완벽한</span>
            <br />
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              인연을 만나세요 💕
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed"
          >
            AI가 분석하는 성향 매칭으로 진정한 인연을 찾아드립니다.
            검증된 프리미엄 회원들과 함께하세요.
          </motion.p>

          {/* CTA Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-lg mx-auto"
          >
            <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-5 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all text-gray-900 placeholder-gray-500 text-lg shadow-sm"
                required
              />
              <button
                type="submit"
                className="px-10 py-5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold rounded-2xl transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 text-lg shadow-lg"
              >
                {isSubmitted ? "등록 완료!" : "시작하기"}
              </button>
            </form>
            <p className="text-base text-gray-500 mt-6">
              무료로 시작하고 언제든 취소할 수 있습니다
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-3 gap-12 mt-32 max-w-3xl mx-auto"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">10만+</div>
              <div className="text-base text-gray-600 mt-2">활성 회원 👥</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">87%</div>
              <div className="text-base text-gray-600 mt-2">매칭 성공률 🎯</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">4.9점</div>
              <div className="text-base text-gray-600 mt-2">사용자 만족도 ⭐</div>
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