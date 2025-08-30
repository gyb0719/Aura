'use client'

import { useState } from 'react'
import { User } from 'lucide-react'

interface OptimizedImageProps {
  src?: string
  alt: string
  className?: string
  fallback?: React.ReactNode
  aspectRatio?: '1/1' | '3/4' | '4/3' | '16/9'
  priority?: boolean
  onLoad?: () => void
  onError?: () => void
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  fallback,
  aspectRatio = '3/4',
  priority = false,
  onLoad,
  onError
}: OptimizedImageProps) {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading')
  const [imageSrc, setImageSrc] = useState(src)

  const handleLoad = () => {
    setImageState('loaded')
    onLoad?.()
  }

  const handleError = () => {
    setImageState('error')
    onError?.()
    
    // 대체 이미지 시도
    if (src && src !== '/placeholder-avatar.png') {
      setImageSrc('/placeholder-avatar.png')
    }
  }

  const aspectClasses = {
    '1/1': 'aspect-square',
    '3/4': 'aspect-[3/4]',
    '4/3': 'aspect-[4/3]',
    '16/9': 'aspect-video'
  }

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 ${aspectClasses[aspectRatio]} ${className}`}>
      {/* 로딩 스켈레톤 */}
      {imageState === 'loading' && (
        <div className="absolute inset-0 animate-pulse">
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      )}

      {/* 이미지 */}
      {imageSrc && imageState !== 'error' && (
        <img
          src={imageSrc}
          alt={alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageState === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      {/* 에러 또는 대체 콘텐츠 */}
      {(imageState === 'error' || !src) && (
        fallback || (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center mx-auto mb-3">
                <User className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
              </div>
              <p className="text-sm text-gray-600 font-medium">프로필 사진 준비중</p>
            </div>
          </div>
        )
      )}
    </div>
  )
}