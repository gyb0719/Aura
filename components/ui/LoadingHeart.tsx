'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

interface LoadingHeartProps {
  size?: 'sm' | 'md' | 'lg'
  message?: string
}

export default function LoadingHeart({ size = 'md', message }: LoadingHeartProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-20 h-20'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        {/* 배경 하트들 */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={`absolute inset-0 ${sizeClasses[size]}`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
          >
            <Heart className={`${sizeClasses[size]} text-pink-300`} fill="currentColor" />
          </motion.div>
        ))}
        
        {/* 메인 하트 */}
        <motion.div
          className={sizeClasses[size]}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Heart className={`${sizeClasses[size]} text-pink-500`} fill="currentColor" />
        </motion.div>
      </div>
      
      {message && (
        <motion.p
          className={`mt-4 text-gray-600 ${textSizes[size]} text-center`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {message}
        </motion.p>
      )}
    </div>
  )
}