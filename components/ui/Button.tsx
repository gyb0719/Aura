"use client"

import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onDrag" | "onDragEnd" | "onDragStart"> {
  variant?: "primary" | "secondary" | "luxury" | "ghost"
  size?: "sm" | "md" | "lg"
  glowing?: boolean
  children?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", glowing = false, children, ...props }, ref) => {
    const baseStyles = "relative inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-full overflow-hidden group"
    
    const variants = {
      primary: "bg-gradient-to-r from-accent-gold to-accent-rose text-primary hover:shadow-xl",
      secondary: "bg-primary-light text-neutral-pearl hover:bg-primary border border-accent-gold/20",
      luxury: "bg-gradient-gold text-primary hover:shadow-2xl",
      ghost: "bg-transparent text-neutral-pearl hover:bg-white/10 border border-white/20"
    }
    
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg"
    }
    
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          glowing && "glow",
          className
        )}
        {...props}
      >
        {glowing && (
          <span className="absolute inset-0 bg-gradient-to-r from-accent-gold/20 to-accent-rose/20 animate-pulse" />
        )}
        <span className="relative z-10">{children}</span>
        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
      </motion.button>
    )
  }
)

Button.displayName = "Button"

export default Button