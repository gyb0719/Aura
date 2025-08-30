"use client"

import { motion } from "framer-motion"
import { Heart, TrendingUp, Calendar, Users } from "lucide-react"
import Card from "@/components/ui/Card"

const stats = [
  { number: "10,847", label: "활성 회원", icon: Users },
  { number: "3,291", label: "성공 매칭", icon: Heart },
  { number: "87%", label: "성공률", icon: TrendingUp },
  { number: "428", label: "올해 약혼", icon: Calendar }
]

const testimonials = [
  {
    name: "김서연",
    age: 32,
    role: "투자은행 임원",
    story: "온라인 데이팅에 회의적이었지만, 오라의 검증 시스템과 회원들의 수준이 제 생각을 완전히 바꿔놓았어요. 3개월 만에 운명의 상대를 만났습니다!",
    rating: 5,
    matched: "이준호, 사모펀드 파트너"
  },
  {
    name: "박민수",
    age: 38,
    role: "스타트업 대표",
    story: "AI 매칭이 정말 놀라울 정도로 정확해요. 제가 원하는 것을 저보다 더 잘 이해하고 있었죠. 이제 결혼한 지 2년이 되었습니다.",
    rating: 5,
    matched: "정하은, 크리에이티브 디렉터"
  },
  {
    name: "최지원",
    age: 35,
    role: "의료원장",
    story: "양보다 질 - 그것이 오라를 특별하게 만듭니다. 모든 매칭이 의미 있었고 제 가치관과 라이프스타일에 완벽하게 맞았어요.",
    rating: 5,
    matched: "김태현, 외과 전문의"
  }
]

export default function SuccessSection() {
  return (
    <section id="success" className="py-20 bg-white">
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
            실제 <span className="text-primary">성공 스토리</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            완벽한 인연을 찾은 수천 명의 회원들과 함께하세요
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center py-8">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-primary mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hoverable className="h-full">
                {/* Rating stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Story */}
                <p className="text-gray-600 mb-4 italic">
                  &ldquo;{testimonial.story}&rdquo;
                </p>

                {/* Profile info */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="font-semibold text-gray-900">
                    {testimonial.name} ({testimonial.age}세)
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-primary">
                    {testimonial.matched}님과 매칭
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Success guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Card className="max-w-2xl mx-auto p-8">
            <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              성공 보장 프로그램
            </h3>
            <p className="text-gray-600 mb-6">
              6개월 내에 의미 있는 인연을 찾지 못하신다면, 
              무료로 멤버십을 연장해 드립니다. 저희 플랫폼에 대한 자신감입니다.
            </p>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">6개월</div>
                <div className="text-sm text-gray-600">평균 매칭 기간</div>
              </div>
              <div className="w-px bg-gray-200" />
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-gray-600">만족도</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}