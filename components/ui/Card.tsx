"use client"

import { HTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-white/30 shadow-xl",
          "bg-gradient-to-br from-white to-gray-50/30",
          hoverable && "transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02] cursor-pointer hover:bg-white",
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