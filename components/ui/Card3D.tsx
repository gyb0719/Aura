'use client'

import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Box, Plane } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

interface Card3DProps {
  children: React.ReactNode
  className?: string
  intensity?: number
}

function AnimatedCard({ intensity = 0.1 }: { intensity: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x, 
        hovered ? Math.sin(state.clock.elapsedTime) * intensity : 0, 
        0.1
      )
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y, 
        hovered ? Math.cos(state.clock.elapsedTime) * intensity : 0, 
        0.1
      )
    }
  })

  return (
    <Box
      ref={meshRef}
      args={[2, 3, 0.1]}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <meshStandardMaterial 
        color="#f3f4f6" 
        transparent 
        opacity={0.8}
        roughness={0.1}
        metalness={0.2}
      />
    </Box>
  )
}

export default function Card3D({ children, className = '', intensity = 0.1 }: Card3DProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* 3D 배경 */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff69b4" />
          <AnimatedCard intensity={isHovered ? intensity : 0} />
        </Canvas>
      </div>
      
      {/* 실제 콘텐츠 */}
      <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl">
        {children}
      </div>
    </motion.div>
  )
}