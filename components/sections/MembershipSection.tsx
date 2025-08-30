"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Crown, Star, Shield, Diamond } from "lucide-react"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"

const membershipTiers = [
  {
    name: "베이직",
    icon: Shield,
    price: "₩99,000",
    period: "월",
    features: [
      "기본 프로필 인증",
      "일일 5명 매칭",
      "기본 메시징",
      "프로필 노출 부스트",
      "기본 검색 필터"
    ],
    popular: false
  },
  {
    name: "프리미엄",
    icon: Star,
    price: "₩199,000",
    period: "월",
    features: [
      "고급 인증 배지",
      "일일 15명 매칭",
      "우선 메시징",
      "좋아요 확인 가능",
      "고급 AI 매칭",
      "화상 통화 기능",
      "월간 엘리트 이벤트"
    ],
    popular: true
  },
  {
    name: "플래티넘",
    icon: Crown,
    price: "₩399,000",
    period: "월",
    features: [
      "프리미엄 인증 씰",
      "무제한 매칭",
      "VIP 메시징 우선권",
      "개인 매치메이커 상담",
      "경영진 전용 필터",
      "독점 이벤트 초대",
      "프로필 심리 분석",
      "여행 매칭 기능"
    ],
    popular: false
  },
  {
    name: "다이아몬드",
    icon: Diamond,
    price: "초대 전용",
    period: "",
    features: [
      "최고급 인증",
      "모든 기능 무제한",
      "전담 관계 코치",
      "큐레이션 소개",
      "글로벌 VIP 이벤트",
      "컨시어지 데이팅 서비스",
      "완벽한 프라이버시",
      "맞춤형 AI 알고리즘",
      "평생 멤버십 혜택"
    ],
    popular: false
  }
]

export default function MembershipSection() {
  const [selectedTier, setSelectedTier] = useState(1)

  return (
    <section id="membership" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            당신에게 맞는 <span className="text-primary">멤버십 선택</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            검증된 엘리트 싱글들의 커뮤니티에 참여하세요
          </p>
        </motion.div>

        {/* Membership cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {membershipTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedTier(index)}
              className="cursor-pointer"
            >
              <Card
                hoverable
                className={`h-full relative ${
                  selectedTier === index ? "ring-2 ring-primary shadow-lg" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                      인기
                    </span>
                  </div>
                )}

                <div className="p-6">
                  {/* Tier icon and name */}
                  <div className="flex items-center justify-center mb-4">
                    <div className={`w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center`}>
                      <tier.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
                    {tier.name}
                  </h3>

                  {/* Pricing */}
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900">
                      {tier.price}
                    </div>
                    {tier.period && (
                      <div className="text-sm text-gray-600">/{tier.period}</div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    variant={selectedTier === index ? "primary" : "secondary"}
                    size="md"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      alert(`${tier.name} 플랜 선택`)
                    }}
                  >
                    {tier.name === "다이아몬드" ? "초대 요청" : "선택하기"}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Card className="max-w-3xl mx-auto p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              모든 멤버십 공통 혜택
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">신원 보호</h4>
                <p className="text-sm text-gray-600">
                  은행 수준의 암호화와 프라이버시 보호
                </p>
              </div>
              <div>
                <Star className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">품질 보장</h4>
                <p className="text-sm text-gray-600">
                  100% 검증된 회원 또는 전액 환불
                </p>
              </div>
              <div>
                <Crown className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">성공 코칭</h4>
                <p className="text-sm text-gray-600">
                  전문가의 데이팅 조언과 프로필 최적화
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}