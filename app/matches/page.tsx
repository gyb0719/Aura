'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, X, MessageCircle, MapPin, Briefcase, Sparkles, User, AlertCircle, RefreshCw } from 'lucide-react'
import Image from 'next/image'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface Recommendation {
  id: string
  user: {
    id: string
    name: string
    membershipTier: string
    verified: boolean
  }
  bio: string
  age: number
  gender: string
  location: string
  occupation: string
  education: string
  height: number
  interests: string[]
  lookingFor: string[]
  photos: { url?: string }[]
  compatibility: number
}

export default function MatchesPage() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imageLoadErrors, setImageLoadErrors] = useState<Set<string>>(new Set())
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)

  useEffect(() => {
    fetchRecommendations()
  }, [])

  const fetchRecommendations = async () => {
    setError(null)
    try {
      const response = await fetch('/api/recommendations')
      if (!response.ok) {
        throw new Error(response.status === 401 ? '로그인이 필요합니다' : '추천을 불러올 수 없습니다')
      }
      const data = await response.json()
      setRecommendations(data)
    } catch (error) {
      console.error('추천 로드 실패:', error)
      setError(error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageError = useCallback((userId: string) => {
    setImageLoadErrors(prev => new Set(prev).add(userId))
  }, [])

  const handleAction = async (action: 'like' | 'pass') => {
    if (currentIndex >= recommendations.length) return

    const currentUser = recommendations[currentIndex]
    setDirection(action === 'like' ? 'right' : 'left')

    try {
      await fetch('/api/matches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUserId: currentUser.user.id,
          action
        })
      })
    } catch (error) {
      console.error('매치 처리 실패:', error)
    }

    setTimeout(() => {
      setCurrentIndex(prev => prev + 1)
      setDirection(null)
    }, 200)
  }

  // 키보드 네비게이션 지원
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handleAction('pass')
      if (e.key === 'ArrowRight') handleAction('like')
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentIndex, recommendations])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-purple-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-purple-600 animate-spin"></div>
          </div>
          <p className="text-gray-600 animate-pulse">AI가 최적의 매치를 찾고 있습니다...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">오류가 발생했습니다</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button 
            variant="primary" 
            onClick={fetchRecommendations}
            className="inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            다시 시도
          </Button>
        </div>
      </div>
    )
  }

  if (currentIndex >= recommendations.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Heart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            오늘의 추천을 모두 확인했습니다
          </h2>
          <p className="text-gray-600 mb-6">
            내일 새로운 매치를 확인해보세요
          </p>
          <Button variant="primary" onClick={() => window.location.reload()}>
            다시 보기
          </Button>
        </div>
      </div>
    )
  }

  const current = recommendations[currentIndex]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-md mx-auto">
          <div className="mb-4 sm:mb-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">오늘의 추천</h1>
            <p className="text-sm sm:text-base text-gray-600">
              AI가 선별한 {recommendations.length}명의 매치
            </p>
            <p className="text-xs text-gray-500 mt-1">← 패스 | 좋아요 → (키보드 사용 가능)</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: 0,
                x: direction === 'left' ? -300 : direction === 'right' ? 300 : 0,
                rotate: direction === 'left' ? -15 : direction === 'right' ? 15 : 0
              }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className="relative"
            >
              <Card className="overflow-hidden">
                <div className="relative">
                  <div className="aspect-[3/4] bg-gradient-to-br from-purple-100 to-pink-100 relative overflow-hidden">
                    {current.photos?.[0]?.url && !imageLoadErrors.has(current.user.id) ? (
                      <img
                        src={current.photos[0].url}
                        alt={`${current.user.name}의 프로필 사진`}
                        className="w-full h-full object-cover"
                        loading="eager"
                        onError={() => handleImageError(current.user.id)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center mx-auto mb-4">
                            <User className="w-16 h-16 text-white" />
                          </div>
                          <p className="text-gray-600 font-medium">프로필 사진 준비중</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 bg-white/90 backdrop-blur rounded-full flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-bold text-purple-600">
                        {current.compatibility}% 매치
                      </span>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 pt-20">
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {current.user.name || '익명'}, {current.age}
                    </h2>
                    <div className="flex items-center gap-4 text-white/90 text-sm">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {current.location}
                      </span>
                      {current.occupation && (
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {current.occupation}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {current.bio && (
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-2">자기소개</h3>
                      <p className="text-gray-700">{current.bio}</p>
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">관심사</h3>
                    <div className="flex flex-wrap gap-2">
                      {current.interests.slice(0, 5).map((interest, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs"
                        >
                          {interest}
                        </span>
                      ))}
                      {current.interests.length > 5 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          +{current.interests.length - 5}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">키</span>
                      <p className="font-medium">{current.height}cm</p>
                    </div>
                    <div>
                      <span className="text-gray-500">학력</span>
                      <p className="font-medium">{current.education || '미입력'}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 sm:gap-6 p-4 sm:p-6 pt-0">
                  <button
                    onClick={() => handleAction('pass')}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                    aria-label="패스하기"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                  </button>
                  
                  <button
                    onClick={() => handleAction('like')}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-lg"
                    aria-label="좋아요"
                  >
                    <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </button>

                  <button 
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                    aria-label="메시지 보내기"
                  >
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </button>
                </div>
              </Card>

              <div className="mt-4 flex justify-center">
                <div className="flex gap-1">
                  {recommendations.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentIndex
                          ? 'bg-purple-600'
                          : index < currentIndex
                          ? 'bg-gray-300'
                          : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}