"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Users, Clock, ChevronRight } from "lucide-react"
import Card from "@/components/ui/Card"
import Button from "@/components/ui/Button"

const upcomingEvents = [
  {
    title: "프리미엄 와인 테이스팅",
    date: "2024년 12월 15일",
    time: "오후 7:00",
    location: "더 페닌슐라, 서울",
    attendees: 24,
    maxAttendees: 30,
    tier: "골드+",
    image: "/api/placeholder/400/300"
  },
  {
    title: "요트 파티",
    date: "2024년 12월 22일",
    time: "오후 6:00",
    location: "부산 해운대 마리나",
    attendees: 18,
    maxAttendees: 40,
    tier: "플래티넘+",
    image: "/api/placeholder/400/300"
  },
  {
    title: "아트 갤러리 오프닝",
    date: "2025년 1월 5일",
    time: "오후 8:00",
    location: "리움 미술관, 서울",
    attendees: 32,
    maxAttendees: 50,
    tier: "모든 회원",
    image: "/api/placeholder/400/300"
  },
  {
    title: "프라이빗 스키 주말",
    date: "2025년 1월 12-14일",
    time: "종일",
    location: "용평 리조트",
    attendees: 12,
    maxAttendees: 20,
    tier: "다이아몬드 전용",
    image: "/api/placeholder/400/300"
  }
]

export default function EventsSection() {
  return (
    <section className="py-32 min-h-screen relative mb-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-50 via-white to-pink-50" />
      <div className="absolute inset-0 bg-pattern-dots opacity-5" />
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
            독점 <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">엘리트 이벤트</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            검증된 회원들과 함께하는 프리미엄 소셜 이벤트
          </p>
        </motion.div>

        {/* Events grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card hoverable className="overflow-hidden">
                <div className="flex flex-col md:flex-row h-full">
                  {/* Event image placeholder */}
                  <div className="md:w-1/3 h-48 md:h-auto bg-gradient-to-br from-pink-100 to-purple-100 relative flex items-center justify-center">
                    <Calendar className="w-12 h-12 text-purple-600/50" />
                    {event.tier === "다이아몬드 전용" && (
                      <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-semibold rounded shadow-md">
                        VIP
                      </div>
                    )}
                  </div>

                  {/* Event details */}
                  <div className="flex-1 p-8">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-2xl font-semibold text-gray-900">
                        {event.title}
                      </h3>
                      <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">
                        {event.tier}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees}/{event.maxAttendees} 참가 중</span>
                      </div>
                    </div>

                    {/* Attendee avatars and RSVP button */}
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {[...Array(Math.min(4, event.attendees))].map((_, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-light border-2 border-white"
                          />
                        ))}
                        {event.attendees > 4 && (
                          <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                            <span className="text-xs text-gray-600">
                              +{event.attendees - 4}
                            </span>
                          </div>
                        )}
                      </div>
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => alert(`${event.title} 참가 신청`)}
                      >
                        참가 신청
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Card className="max-w-2xl mx-auto p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              나만의 엘리트 이벤트 개최
            </h3>
            <p className="text-gray-600 mb-6">
              플래티넘과 다이아몬드 회원은 프라이빗 이벤트를 만들고 선택한 매칭 상대를 초대할 수 있습니다. 
              저희 컨시어지 팀이 완벽한 경험을 계획하도록 도와드립니다.
            </p>
            <Button 
              variant="primary" 
              size="lg"
              onClick={() => alert("이벤트 개최 안내")}
            >
              이벤트 개최 알아보기
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}