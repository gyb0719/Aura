"use client"

import { HTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  noPadding?: boolean
  variant?: "default" | "glass" | "gradient" | "outlined"
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, noPadding = false, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: cn(
        "bg-white border border-gray-100 shadow-sm",
        "backdrop-blur-sm"
      ),
      glass: cn(
        "bg-white/80 backdrop-blur-md",
        "border border-white/20 shadow-xl"
      ),
      gradient: cn(
        "bg-gradient-to-br from-white via-pink-50/10 to-purple-50/10",
        "border border-white/40 shadow-xl"
      ),
      outlined: cn(
        "bg-transparent border-2 border-gray-200",
        "hover:border-gray-300"
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl transition-all duration-300",
          !noPadding && "p-6 sm:p-8",
          variants[variant],
          hoverable && "hover:shadow-2xl hover:-translate-y-1 cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = "Card"

export default Card