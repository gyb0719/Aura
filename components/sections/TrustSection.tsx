"use client"

import { motion } from "framer-motion"
import { Shield, Award, Globe, Lock, CheckCircle, Users } from "lucide-react"
import Card from "@/components/ui/Card"

const trustItems = [
  {
    icon: Shield,
    title: "100% 인증 프로필 ✅",
    description: "신분증, 직장, SNS까지 다단계 검증 시스템",
    stat: "100%",
    statLabel: "검증 완료",
    emoji: "🛡️"
  },
  {
    icon: Lock,
    title: "완벽한 보안 🔒",
    description: "256비트 암호화와 블록체인 기반 신원 보호",
    stat: "Zero",
    statLabel: "데이터 유출",
    emoji: "🔐"
  },
  {
    icon: Award,
    title: "프리미엄 멤버십 👑",
    description: "성공한 전문직과 사업가들의 선택",
    stat: "상위 5%",
    statLabel: "소득 수준",
    emoji: "🏆"
  },
  {
    icon: Globe,
    title: "글로벌 네트워크 🌍",
    description: "전 세계 주요 도시의 엘리트 싱글들",
    stat: "50+",
    statLabel: "도시",
    emoji: "🌐"
  }
]

export default function TrustSection() {
  return (
    <section id="features" className="py-32 min-h-screen relative mb-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50/30" />
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-gray-900">
            믿을 수 있는 <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">프리미엄 서비스</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            철저한 검증과 최고의 보안으로 안심하고 만남을 시작하세요
          </p>
        </motion.div>

        {/* Trust cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full text-center">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center mb-6 shadow-md">
                    <item.icon className="w-10 h-10 text-purple-600" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-base text-gray-600 mb-6 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-gray-200 w-full">
                    <div className="text-3xl font-bold text-primary mb-1">{item.stat}</div>
                    <div className="text-sm text-gray-500 uppercase tracking-wider">
                      {item.statLabel}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Real-time stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-gray-900 font-medium">실시간 활동</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-gray-600">2,847명 온라인</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm text-gray-600">오늘 12건 매칭</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}