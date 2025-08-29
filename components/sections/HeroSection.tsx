"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Button from "@/components/ui/Button"
import GlassCard from "@/components/ui/GlassCard"
import { Sparkles, Heart, Shield, Star } from "lucide-react"

export default function HeroSection() {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Waitlist submission:", { email, phone })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-luxury opacity-90" />
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-accent-gold rounded-full"
            initial={{
              x: Math.random() * 1920,
              y: Math.random() * 1080,
            }}
            animate={{
              x: Math.random() * 1920,
              y: Math.random() * 1080,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* 3D Floating Diamond */}
      <motion.div
        className="absolute top-20 right-20 text-accent-gold"
        animate={{
          y: [0, -20, 0],
          rotateZ: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles size={60} className="opacity-60" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-20 text-accent-rose"
        animate={{
          y: [0, 20, 0],
          rotateZ: [0, -10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Heart size={50} className="opacity-60" />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <Shield className="w-4 h-4 text-accent-gold" />
            <span className="text-sm text-neutral-pearl">Verified Elite Members Only</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6"
          >
            <span className="text-neutral-pearl">Where </span>
            <span className="gradient-text">Elite Singles</span>
            <span className="text-neutral-pearl"> Connect</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-neutral-silver mb-12 max-w-3xl mx-auto"
          >
            Experience AI-powered matchmaking designed exclusively for successful professionals. 
            Join the most selective dating platform where quality matters.
          </motion.p>

          {/* Waitlist form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <GlassCard className="max-w-lg mx-auto p-8">
              <h3 className="text-2xl font-display mb-6 text-neutral-pearl">Join the Waitlist</h3>
              <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-neutral-pearl placeholder-neutral-silver/50 focus:outline-none focus:border-accent-gold transition-colors"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone number (optional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-neutral-pearl placeholder-neutral-silver/50 focus:outline-none focus:border-accent-gold transition-colors"
                />
                <Button type="submit" variant="luxury" size="lg" className="w-full" glowing>
                  Request Exclusive Access
                </Button>
              </form>
              <p className="text-xs text-neutral-silver/70 mt-4">
                By joining, you agree to our verification process and privacy policy
              </p>
            </GlassCard>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 mt-16"
          >
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-accent-gold" />
              <span className="text-neutral-silver">10,000+ Verified Members</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-accent-gold" />
              <span className="text-neutral-silver">Bank-Level Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-accent-gold" />
              <span className="text-neutral-silver">87% Match Success Rate</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-accent-gold/50 flex justify-center">
          <div className="w-1 h-3 bg-accent-gold rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
}