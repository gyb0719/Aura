"use client"

import { motion } from "framer-motion"
import { Shield, Award, Globe, Lock, CheckCircle, Users } from "lucide-react"
import GlassCard from "@/components/ui/GlassCard"

const trustItems = [
  {
    icon: Shield,
    title: "Verified Profiles",
    description: "Multi-layer verification including ID, employment, and social media",
    stat: "100%",
    statLabel: "Verified"
  },
  {
    icon: Lock,
    title: "Bank-Level Security",
    description: "256-bit encryption and blockchain-based identity protection",
    stat: "Zero",
    statLabel: "Data Breaches"
  },
  {
    icon: Award,
    title: "Elite Community",
    description: "Curated membership of successful professionals and entrepreneurs",
    stat: "Top 5%",
    statLabel: "Income Bracket"
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Connect with elite singles from major cities worldwide",
    stat: "50+",
    statLabel: "Cities"
  }
]

const pressLogos = [
  "Forbes",
  "TechCrunch",
  "The Wall Street Journal",
  "Bloomberg",
  "Financial Times"
]

export default function TrustSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-primary-dark opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
      
      <div className="relative z-10 container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-neutral-pearl">Trust & </span>
            <span className="gradient-text">Excellence</span>
          </h2>
          <p className="text-xl text-neutral-silver max-w-2xl mx-auto">
            Join the most exclusive dating platform with unparalleled security and verification
          </p>
        </motion.div>

        {/* Trust cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard hoverable className="h-full">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-accent-gold to-accent-rose flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute inset-0 bg-accent-gold/20 rounded-full blur-xl animate-pulse" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-neutral-pearl mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-silver mb-4">
                    {item.description}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-white/10 w-full">
                    <div className="text-3xl font-bold gradient-text">{item.stat}</div>
                    <div className="text-xs text-neutral-silver uppercase tracking-wider">
                      {item.statLabel}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Press section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="text-sm text-neutral-silver uppercase tracking-wider mb-8">
            As Featured In
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {pressLogos.map((logo, index) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="text-2xl md:text-3xl font-display text-neutral-silver/50 hover:text-accent-gold transition-colors"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Real-time stats ticker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <GlassCard className="overflow-hidden">
            <div className="flex items-center justify-between py-4 px-6">
              <div className="flex items-center gap-4">
                <Users className="w-5 h-5 text-accent-gold" />
                <span className="text-neutral-pearl">Live Member Activity</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-neutral-silver">2,847 Online Now</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent-gold" />
                  <span className="text-sm text-neutral-silver">12 New Matches Today</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}