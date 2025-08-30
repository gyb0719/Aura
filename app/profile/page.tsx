'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, MapPin, Briefcase, GraduationCap, Heart, Edit2, Check, X, User, Shield, Star, TrendingUp, AlertCircle } from 'lucide-react'
import OptimizedImage from '@/components/ui/OptimizedImage'
import { ProfileCardSkeleton } from '@/components/ui/SkeletonLoader'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

interface Profile {
  id: string
  bio: string
  age: number
  gender: string
  location: string
  occupation: string
  education: string
  height: number
  interests: string[]
  lookingFor: string[]
  photos: { id: string; url: string; isPrimary: boolean }[]
  completionScore: number
}

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editedProfile, setEditedProfile] = useState<Partial<Profile>>({})

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/profile')
      if (response.ok) {
        const data = await response.json()
        setProfile(data)
        setEditedProfile(data)
      } else if (response.status === 404) {
        router.push('/profile/create')
      }
    } catch (error) {
      console.error('프로필 로드 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedProfile)
      })
      
      if (response.ok) {
        const updatedProfile = await response.json()
        setProfile(updatedProfile)
        setIsEditing(false)
      } else {
        throw new Error('프로필 저장에 실패했습니다')
      }
    } catch (error) {
      console.error('프로필 저장 실패:', error)
      setError(error instanceof Error ? error.message : '알 수 없는 오류')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse" />
            </div>
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="lg:col-span-1">
                <ProfileCardSkeleton />
              </div>
              <div className="lg:col-span-2 space-y-6">
                <ProfileCardSkeleton />
                <ProfileCardSkeleton />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-red-800">{error}</p>
            </motion.div>
          )}
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">내 프로필</h1>
            <div className="flex gap-3">
              {isEditing ? (
                <>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setEditedProfile(profile)
                      setIsEditing(false)
                      setError(null)
                    }}
                    disabled={isSaving}
                    className="text-sm sm:text-base"
                  >
                    <X className="w-4 h-4 mr-1 sm:mr-2" />
                    취소
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="text-sm sm:text-base"
                  >
                    {isSaving ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <Check className="w-4 h-4 mr-1 sm:mr-2" />
                    )}
                    {isSaving ? '저장 중...' : '저장'}
                  </Button>
                </>
              ) : (
                <Button 
                  variant="primary" 
                  onClick={() => setIsEditing(true)}
                  className="text-sm sm:text-base"
                >
                  <Edit2 className="w-4 h-4 mr-1 sm:mr-2" />
                  프로필 수정
                </Button>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-1">
              <Card className="p-4 sm:p-6" variant="glass">
                <div className="relative mb-4 sm:mb-6">
                  <OptimizedImage
                    src={profile.photos?.[0]?.url}
                    alt={`${profile.gender === 'MALE' ? '남성' : profile.gender === 'FEMALE' ? '여성' : '기타'} 프로필 사진`}
                    aspectRatio="1/1"
                    className="rounded-xl"
                    fallback={
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                        <User className="w-16 h-16 sm:w-20 sm:h-20 text-purple-300" />
                      </div>
                    }
                  />
                  <AnimatePresence>
                    {isEditing && (
                      <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute bottom-2 right-2 p-3 bg-white rounded-full shadow-lg"
                      >
                        <Camera className="w-5 h-5 text-gray-600" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">프로필 완성도</h3>
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${profile.completionScore}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-pink-500 to-purple-600"
                        />
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{profile.completionScore}% 완성</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">
                      <TrendingUp className="inline w-4 h-4 mr-1" />
                      빠른 통계
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          프로필 조회
                        </span>
                        <span className="text-sm font-bold text-purple-600">248회</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          받은 좋아요
                        </span>
                        <span className="text-sm font-bold text-pink-600">34개</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          매칭률
                        </span>
                        <span className="text-sm font-bold text-green-600">87%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <Card className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">기본 정보</h2>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      나이
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editedProfile.age}
                        onChange={(e) => setEditedProfile({ ...editedProfile, age: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.age}세</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      성별
                    </label>
                    {isEditing ? (
                      <select
                        value={editedProfile.gender}
                        onChange={(e) => setEditedProfile({ ...editedProfile, gender: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="MALE">남성</option>
                        <option value="FEMALE">여성</option>
                        <option value="OTHER">기타</option>
                      </select>
                    ) : (
                      <p className="text-gray-900">
                        {profile.gender === 'MALE' ? '남성' : profile.gender === 'FEMALE' ? '여성' : '기타'}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline w-4 h-4 mr-1" />
                      위치
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.location}
                        onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.location}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      키
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        value={editedProfile.height}
                        onChange={(e) => setEditedProfile({ ...editedProfile, height: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.height}cm</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Briefcase className="inline w-4 h-4 mr-1" />
                      직업
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.occupation}
                        onChange={(e) => setEditedProfile({ ...editedProfile, occupation: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.occupation || '미입력'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <GraduationCap className="inline w-4 h-4 mr-1" />
                      학력
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.education}
                        onChange={(e) => setEditedProfile({ ...editedProfile, education: e.target.value })}
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.education || '미입력'}</p>
                    )}
                  </div>
                </div>
              </Card>

              <Card className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">자기소개</h2>
                {isEditing ? (
                  <textarea
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="자신을 소개해주세요..."
                  />
                ) : (
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {profile.bio || '아직 자기소개를 작성하지 않았습니다.'}
                  </p>
                )}
              </Card>

              <Card className="p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                  <Heart className="inline w-5 h-5 mr-2 text-pink-500" />
                  관심사
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.interests?.map((interest, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                  {isEditing && (
                    <button className="px-3 py-1 border-2 border-dashed border-gray-300 text-gray-500 rounded-full text-sm hover:border-gray-400">
                      + 추가
                    </button>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}