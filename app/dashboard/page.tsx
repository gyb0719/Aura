'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Users, MessageCircle, Star, TrendingUp, Calendar, Clock, Shield, ChevronRight, Sparkles, Target, Award } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import OptimizedImage from '@/components/ui/OptimizedImage'
import { ListItemSkeleton } from '@/components/ui/SkeletonLoader'
import Link from 'next/link'

interface DashboardData {
  user: {
    name: string
    email: string
    membershipTier: string
    verified: boolean
  }
  stats: {
    newMatches: number
    profileViews: number
    messages: number
    likeScore: number
  }
  profile: {
    completionScore: number
    photos: { url?: string }[]
  }
  recentMatches: Array<{
    id: string
    name: string
    age: number
    photo?: string
    matchedAt: string
  }>
  todayRecommendations: number
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // 포트폴리오용 데모 데이터 사용
      const { demoStats, demoMatches } = await import('@/lib/data/demoData')
      setTimeout(() => {
        setData({
          user: {
            name: '김지원',
            email: 'user@example.com',
            membershipTier: 'PREMIUM',
            verified: true
          },
          stats: demoStats,
          profile: {
            completionScore: 85,
            photos: []
          },
          recentMatches: demoMatches.slice(0, 3).map(match => ({
            id: match.id,
            name: match.user.name,
            age: match.user.age,
            matchedAt: match.matchedAt
          })),
          todayRecommendations: 8
        })
        setIsLoading(false)
      }, 1200)
    } catch (error) {
      console.error('대시보드 데이터 로드 실패:', error)
      setIsLoading(false)
    }
  }

  const stats = [
    { 
      label: '새로운 매치', 
      value: data?.stats.newMatches || 0, 
      icon: Heart, 
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      trend: '+23%'
    },
    { 
      label: '프로필 조회', 
      value: data?.stats.profileViews || 0, 
      icon: Users, 
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-50',
      trend: '+12%'
    },
    { 
      label: '받은 메시지', 
      value: data?.stats.messages || 0, 
      icon: MessageCircle, 
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      trend: '+45%'
    },
    { 
      label: '호감도 점수', 
      value: data?.stats.likeScore || 0, 
      icon: Star, 
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      trend: '+5%'
    }
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="mb-8">
            <div className="h-10 w-64 bg-gray-200 rounded-lg animate-pulse mb-2" />
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                <div className="h-20" />
              </div>
            ))}
          </div>
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              <ListItemSkeleton />
            </div>
            <div>
              <ListItemSkeleton />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* 헤더 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                안녕하세요, {data?.user.name || '회원'}님 
                {data?.user.verified && (
                  <Shield className="inline w-5 h-5 sm:w-6 sm:h-6 text-blue-500 ml-2" aria-label="인증된 사용자" />
                )}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                오늘도 특별한 인연을 만나보세요
              </p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs sm:text-sm font-medium rounded-full">
                {data?.user.membershipTier === 'PREMIUM' ? '프리미엄' : data?.user.membershipTier === 'PLATINUM' ? '플래티넘' : '베이직'}
              </span>
              <span className="px-3 py-1 bg-white/80 backdrop-blur text-gray-700 text-xs sm:text-sm font-medium rounded-full flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {new Date().toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
              </span>
            </div>
          </div>
        </motion.div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <AnimatePresence>
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 sm:p-6 hover:shadow-xl transition-all duration-300 group">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1 mb-3 sm:mb-0">
                      <p className="text-xs sm:text-sm text-gray-600 mb-1">{stat.label}</p>
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-xs text-green-600 font-medium mt-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {stat.trend}
                      </p>
                    </div>
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* 왼쪽: 추천 매치 & 최근 활동 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 오늘의 추천 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-500" />
                    오늘의 추천 매치
                  </h2>
                  <Link href="/matches">
                    <Button variant="ghost" className="text-xs sm:text-sm">
                      모두 보기
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                </div>
                
                {data?.todayRecommendations ? (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1">
                          {data.todayRecommendations}명
                        </p>
                        <p className="text-sm text-gray-600">
                          AI가 엄선한 오늘의 매치
                        </p>
                      </div>
                      <div className="hidden sm:block">
                        <div className="flex -space-x-3">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 border-2 border-white" />
                          ))}
                          <div className="w-12 h-12 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                            <span className="text-xs font-medium">+{data.todayRecommendations - 3}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link href="/matches">
                      <Button variant="primary" fullWidth className="mt-4">
                        지금 확인하기
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">프로필을 완성하면 AI가 최적의 매치를 추천해드립니다</p>
                    <Link href="/profile">
                      <Button variant="primary">프로필 완성하기</Button>
                    </Link>
                  </div>
                )}
              </Card>
            </motion.div>

            {/* 최근 매치 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-pink-500" />
                  최근 매치
                </h2>
                <div className="space-y-3">
                  {data?.recentMatches.map((match, index) => (
                    <motion.div
                      key={match.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-200 to-pink-200" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{match.name}, {match.age}</p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {match.matchedAt}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* 오른쪽: 프로필 상태 & 성과 */}
          <div className="space-y-6">
            {/* 프로필 완성도 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-4 sm:p-6" variant="gradient">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                  프로필 완성도
                </h2>
                <div className="space-y-4">
                  <div className="relative">
                    <div className="flex mb-2 items-center justify-between">
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                        {(data?.profile.completionScore ?? 0) >= 80 ? '우수' : (data?.profile.completionScore ?? 0) >= 50 ? '양호' : '개선필요'}
                      </span>
                      <span className="text-sm font-bold text-purple-600">
                        {data?.profile.completionScore || 0}%
                      </span>
                    </div>
                    <div className="overflow-hidden h-3 text-xs flex rounded-full bg-purple-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${data?.profile.completionScore || 0}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-500 to-pink-500"
                      />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    프로필을 100% 완성하면 매칭률이 <span className="font-bold text-purple-600">3배</span> 증가합니다!
                  </p>
                  <Link href="/profile">
                    <Button variant="secondary" fullWidth className="text-sm">
                      프로필 개선하기
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>

            {/* 이번 주 성과 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  이번 주 성과
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm text-gray-700">매칭 성공률</span>
                    <span className="text-sm font-bold text-yellow-600">87%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <span className="text-sm text-gray-700">응답률</span>
                    <span className="text-sm font-bold text-green-600">92%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm text-gray-700">활동 점수</span>
                    <span className="text-sm font-bold text-blue-600">A+</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}