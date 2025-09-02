"use client"

import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger"
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
  children?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", fullWidth = false, disabled, children, ...props }, ref) => {
    const baseStyles = cn(
      "inline-flex items-center justify-center font-medium transition-all duration-200",
      "rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "transform active:scale-[0.98]",
      fullWidth && "w-full"
    )
    
    const variants = {
      primary: cn(
        "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg",
        "hover:from-pink-600 hover:to-purple-700 hover:shadow-xl hover:-translate-y-0.5",
        "focus:ring-purple-500"
      ),
      secondary: cn(
        "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 shadow-sm",
        "hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md hover:-translate-y-0.5",
        "focus:ring-gray-400"
      ),
      outline: cn(
        "border-2 border-pink-500 text-pink-600 dark:text-pink-400 bg-transparent",
        "hover:bg-pink-50 dark:hover:bg-pink-900/10 hover:border-pink-600 dark:hover:border-pink-400",
        "focus:ring-pink-500"
      ),
      ghost: cn(
        "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
        "focus:ring-gray-400"
      ),
      danger: cn(
        "bg-red-500 text-white shadow-lg",
        "hover:bg-red-600 hover:shadow-xl hover:-translate-y-0.5",
        "focus:ring-red-500"
      )
    }
    
    const sizes = {
      sm: "px-3 py-1.5 text-sm gap-1.5",
      md: "px-5 py-2.5 text-base gap-2",
      lg: "px-6 py-3 text-lg gap-2.5"
    }
    
    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export default Button