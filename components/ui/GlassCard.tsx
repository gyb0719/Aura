"use client"

import { HTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  glowing?: boolean
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hoverable = false, glowing = false, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hoverable ? { y: -5, scale: 1.02 } : {}}
        transition={{ type: "spring", stiffness: 300 }}
        className={cn(
          "relative rounded-2xl p-6",
          "bg-white/5 backdrop-blur-xl",
          "border border-white/10",
          "shadow-xl",
          glowing && "glow",
          hoverable && "cursor-pointer transition-all duration-300 hover:bg-white/10",
          className
        )}
        {...props}
      >
        {children}
        {glowing && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-gold/10 to-accent-rose/10 animate-pulse pointer-events-none" />
        )}
      </motion.div>
    )
  }
)

GlassCard.displayName = "GlassCard"

export default GlassCard