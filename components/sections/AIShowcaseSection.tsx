"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Brain, Sparkles, TrendingUp, Zap, Eye } from "lucide-react"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"

const aiFeatures = [
  {
    icon: Brain,
    title: "심층 매칭",
    description: "200개 이상의 호환성 요소를 분석하는 딥러닝"
  },
  {
    icon: Eye,
    title: "표정 분석",
    description: "미세표정으로 진정한 매력도를 측정"
  },
  {
    icon: Zap,
    title: "실시간 학습",
    description: "모든 상호작용을 통해 계속 발전하는 AI"
  },
  {
    icon: TrendingUp,
    title: "예측 정확도",
    description: "장기적 호환성 예측 92% 정확도"
  }
]

export default function AIShowcaseSection() {
  const [compatibility, setCompatibility] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculateCompatibility = () => {
    setIsCalculating(true)
    setCompatibility(0)
    
    // 애니메이션 효과로 점수 증가
    let score = 0
    const interval = setInterval(() => {
      score += Math.random() * 10
      if (score >= 87) {
        score = 87
        clearInterval(interval)
        setIsCalculating(false)
      }
      setCompatibility(Math.round(score))
    }, 50)
  }

  return (
    <section id="technology" className="py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 mb-8">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-base text-primary font-medium">AI 기반 매칭</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900">
            과학적인 <span className="text-primary">완벽한 매칭</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            수천 개의 데이터 포인트를 분석해 당신의 이상형을 찾아드립니다
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                AI 호환성 테스트
              </h3>
              
              {/* Compatibility Display */}
              <div className="relative mb-8">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-2">
                    {compatibility}%
                  </div>
                  <div className="text-sm text-gray-600">호환성 점수</div>
                </div>
                
                {/* Progress bar */}
                <div className="mt-6 bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${compatibility}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <Button
                onClick={calculateCompatibility}
                variant="primary"
                className="w-full"
                disabled={isCalculating}
              >
                {isCalculating ? "분석 중..." : "매칭 점수 계산하기"}
              </Button>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">성격 매칭</span>
                  <span className="text-sm font-semibold text-primary">94%</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">라이프스타일</span>
                  <span className="text-sm font-semibold text-primary">88%</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">장기적 가능성</span>
                  <span className="text-sm font-semibold text-primary">91%</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center p-6">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-3 text-lg">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}