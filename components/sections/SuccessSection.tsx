"use client"

import { motion } from "framer-motion"
import { Heart, TrendingUp, Calendar, Users } from "lucide-react"
import GlassCard from "@/components/ui/GlassCard"

const stats = [
  { number: "10,847", label: "Active Members", icon: Users },
  { number: "3,291", label: "Successful Matches", icon: Heart },
  { number: "87%", label: "Success Rate", icon: TrendingUp },
  { number: "428", label: "Engagements This Year", icon: Calendar }
]

const testimonials = [
  {
    name: "Sarah K.",
    age: 32,
    role: "Investment Banker",
    story: "I was skeptical about online dating, but AURA's verification process and quality of members completely changed my perspective. Met my fiancé within 3 months!",
    rating: 5,
    matched: "David L., Private Equity Partner"
  },
  {
    name: "Michael R.",
    age: 38,
    role: "Tech Entrepreneur",
    story: "The AI matching is incredibly accurate. It understood what I was looking for better than I did myself. Now happily married for 2 years.",
    rating: 5,
    matched: "Emma S., Creative Director"
  },
  {
    name: "Jennifer M.",
    age: 35,
    role: "Medical Director",
    story: "Quality over quantity - that's what sets AURA apart. Every match was meaningful and aligned with my values and lifestyle.",
    rating: 5,
    matched: "Robert T., Surgeon"
  }
]

export default function SuccessSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-light to-primary" />
      
      {/* Animated hearts background */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-accent-rose"
            initial={{
              x: Math.random() * 1920,
              y: 1080,
            }}
            animate={{
              y: -100,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear",
            }}
          >
            <Heart size={Math.random() * 20 + 10} fill="currentColor" />
          </motion.div>
        ))}
      </div>

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
            <span className="text-neutral-pearl">Real </span>
            <span className="gradient-text">Success Stories</span>
          </h2>
          <p className="text-xl text-neutral-silver max-w-2xl mx-auto">
            Join thousands of elite singles who found their perfect match
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="text-center py-8">
                <stat.icon className="w-8 h-8 text-accent-gold mx-auto mb-4" />
                <div className="text-3xl font-bold gradient-text mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-neutral-silver">
                  {stat.label}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard hoverable className="h-full p-6">
                {/* Rating stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-accent-gold"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Story */}
                <p className="text-neutral-silver mb-4 italic">
                  "{testimonial.story}"
                </p>

                {/* Profile info */}
                <div className="border-t border-white/10 pt-4">
                  <div className="font-semibold text-neutral-pearl">
                    {testimonial.name}, {testimonial.age}
                  </div>
                  <div className="text-sm text-neutral-silver mb-2">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-accent-gold">
                    Matched with {testimonial.matched}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Success guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <GlassCard className="max-w-2xl mx-auto p-8">
            <Heart className="w-12 h-12 text-accent-rose mx-auto mb-4" />
            <h3 className="text-2xl font-display font-semibold text-neutral-pearl mb-4">
              Our Success Guarantee
            </h3>
            <p className="text-neutral-silver mb-6">
              If you don't find a meaningful connection within 6 months, 
              we'll extend your membership for free. That's how confident we are in our platform.
            </p>
            <div className="flex justify-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">6 Months</div>
                <div className="text-sm text-neutral-silver">Average Time to Match</div>
              </div>
              <div className="w-px bg-white/20" />
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">100%</div>
                <div className="text-sm text-neutral-silver">Satisfaction Rate</div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}