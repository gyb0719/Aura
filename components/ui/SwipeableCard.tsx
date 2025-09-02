'use client'

import { useRef } from 'react'
import { useDrag } from '@use-gesture/react'
import { useSpring, animated } from 'react-spring'

interface SwipeableCardProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  className?: string
}

export default function SwipeableCard({ 
  children, 
  onSwipeLeft, 
  onSwipeRight, 
  className = '' 
}: SwipeableCardProps) {
  const [{ x, rotate, scale }, api] = useSpring(() => ({
    x: 0,
    rotate: 0,
    scale: 1,
    config: { mass: 1, tension: 500, friction: 50 }
  }))

  const bind = useDrag(
    ({ 
      active, 
      movement: [mx], 
      direction: [xDir], 
      velocity: [vx],
      cancel 
    }) => {
      const trigger = vx > 0.2 || Math.abs(mx) > 150

      if (!active && trigger) {
        const dir = xDir < 0 ? -1 : 1
        if (dir < 0 && onSwipeLeft) {
          onSwipeLeft()
        } else if (dir > 0 && onSwipeRight) {
          onSwipeRight()
        }
        
        api.start({
          x: dir * 1000,
          rotate: dir * 45,
          scale: 0.8,
          config: { mass: 1, tension: 200, friction: 30 }
        })
      } else {
        api.start({
          x: active ? mx : 0,
          rotate: active ? mx / 10 : 0,
          scale: active ? 1.05 : 1
        })
      }
    },
    {
      axis: 'x',
      bounds: { left: -300, right: 300 },
      rubberband: true
    }
  )

  return (
    <animated.div
      {...bind()}
      style={{
        x,
        rotate: rotate.to(r => `${r}deg`),
        scale,
        touchAction: 'none'
      }}
      className={`cursor-grab active:cursor-grabbing select-none ${className}`}
    >
      {children}
      
      {/* 스와이프 힌트 오버레이 */}
      <animated.div
        style={{
          opacity: x.to(x => Math.abs(x) > 50 ? 0.8 : 0)
        }}
        className="absolute inset-0 pointer-events-none"
      >
        <animated.div
          style={{
            opacity: x.to(x => x > 50 ? 1 : 0)
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg"
        >
          LIKE ❤️
        </animated.div>
        
        <animated.div
          style={{
            opacity: x.to(x => x < -50 ? 1 : 0)
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg"
        >
          PASS ❌
        </animated.div>
      </animated.div>
    </animated.div>
  )
}