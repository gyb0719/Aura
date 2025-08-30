'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ChevronRight, ChevronLeft, User, Heart, Camera, CheckCircle } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const steps = [
  { id: 1, title: '기본 정보', icon: User },
  { id: 2, title: '관심사', icon: Heart },
  { id: 3, title: '사진', icon: Camera },
  { id: 4, title: '완료', icon: CheckCircle }
]

const interests = [
  '여행', '영화', '음악', '독서', '요리', '운동', '요가', '명상',
  '사진', '그림', '춤', '노래', '게임', '반려동물', '자연', '카페',
  '와인', '맥주', '커피', '차', '패션', '뷰티', '인테리어', '가드닝'
]

const lookingForOptions = [
  { value: 'RELATIONSHIP', label: '진지한 만남' },
  { value: 'MARRIAGE', label: '결혼' },
  { value: 'DATING', label: '데이팅' },
  { value: 'FRIENDSHIP', label: '친구' }
]

export default function CreateProfilePage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    bio: '',
    age: '',
    gender: 'MALE',
    location: '',
    occupation: '',
    education: '',
    height: '',
    interests: [] as string[],
    lookingFor: [] as string[]
  })

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleLookingForToggle = (value: string) => {
    setFormData(prev => ({
      ...prev,
      lookingFor: prev.lookingFor.includes(value)
        ? prev.lookingFor.filter(l => l !== value)
        : [...prev.lookingFor, value]
    }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age),
          height: formData.height ? parseInt(formData.height) : null
        })
      })

      if (response.ok) {
        router.push('/profile')
      } else {
        const error = await response.json()
        console.error('프로필 생성 실패:', error)
      }
    } catch (error) {
      console.error('프로필 생성 오류:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-8">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
              프로필 만들기
            </h1>
            <p className="text-gray-600 text-center">
              당신의 매력을 보여주세요
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= step.id
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-full h-1 mx-2 ${
                        currentStep > step.id ? 'bg-purple-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2">
              {steps.map((step) => (
                <span
                  key={step.id}
                  className={`text-xs ${
                    currentStep >= step.id ? 'text-purple-600 font-medium' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </span>
              ))}
            </div>
          </div>

          <Card className="p-8">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">기본 정보</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        나이 *
                      </label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="28"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        성별 *
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="MALE">남성</option>
                        <option value="FEMALE">여성</option>
                        <option value="OTHER">기타</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        위치 *
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="서울"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        키 (cm)
                      </label>
                      <input
                        type="number"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="175"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        직업
                      </label>
                      <input
                        type="text"
                        value={formData.occupation}
                        onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="마케팅 매니저"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        학력
                      </label>
                      <input
                        type="text"
                        value={formData.education}
                        onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="대학교 졸업"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      자기소개
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="자신을 소개해주세요..."
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">관심사 & 목적</h2>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      관심사를 선택해주세요 (최대 10개)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest) => (
                        <button
                          key={interest}
                          onClick={() => handleInterestToggle(interest)}
                          disabled={!formData.interests.includes(interest) && formData.interests.length >= 10}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            formData.interests.includes(interest)
                              ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          } ${
                            !formData.interests.includes(interest) && formData.interests.length >= 10
                              ? 'opacity-50 cursor-not-allowed'
                              : ''
                          }`}
                        >
                          {interest}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      무엇을 찾고 계신가요?
                    </label>
                    <div className="space-y-3">
                      {lookingForOptions.map((option) => (
                        <label key={option.value} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={formData.lookingFor.includes(option.value)}
                            onChange={() => handleLookingForToggle(option.value)}
                            className="rounded text-primary focus:ring-primary"
                          />
                          <span className="ml-3 text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">프로필 사진</h2>
                  
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto mb-6 rounded-xl bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                      <Camera className="w-12 h-12 text-gray-400" />
                    </div>
                    <Button variant="secondary">
                      사진 업로드
                    </Button>
                    <p className="text-sm text-gray-500 mt-4">
                      나중에 추가할 수도 있습니다
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="text-center py-8">
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    프로필 생성 준비 완료!
                  </h2>
                  <p className="text-gray-600 mb-8">
                    프로필을 생성하고 매칭을 시작하세요
                  </p>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? '생성 중...' : '프로필 생성하기'}
                  </Button>
                </div>
              )}
            </motion.div>

            {currentStep < 4 && (
              <div className="flex justify-between mt-8">
                <Button
                  variant="secondary"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  이전
                </Button>
                <Button variant="primary" onClick={handleNext}>
                  다음
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}