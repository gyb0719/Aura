"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Brain, Sparkles, Heart, TrendingUp, Zap, Eye } from "lucide-react"
import GlassCard from "@/components/ui/GlassCard"
import Button from "@/components/ui/Button"

const aiFeatures = [
  {
    icon: Brain,
    title: "Neural Matching",
    description: "Deep learning algorithms analyze 200+ compatibility factors"
  },
  {
    icon: Eye,
    title: "Facial Analysis",
    description: "AI reads micro-expressions to gauge genuine attraction"
  },
  {
    icon: Zap,
    title: "Real-time Learning",
    description: "Algorithm improves with every interaction and feedback"
  },
  {
    icon: TrendingUp,
    title: "Predictive Success",
    description: "92% accuracy in predicting long-term compatibility"
  }
]

export default function AIShowcaseSection() {
  const [activeTab, setActiveTab] = useState(0)
  const [compatibility, setCompatibility] = useState(0)

  // Simulate compatibility calculation
  const calculateCompatibility = () => {
    let score = 0
    const interval = setInterval(() => {
      score += Math.random() * 10
      if (score >= 87) {
        score = 87
        clearInterval(interval)
      }
      setCompatibility(Math.round(score))
    }, 50)
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary-light to-primary opacity-90" />
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-accent-gold/10 via-transparent to-transparent"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Sparkles className="w-4 h-4 text-accent-gold" />
            <span className="text-sm text-neutral-pearl">Powered by Advanced AI</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            <span className="text-neutral-pearl">The Science of </span>
            <span className="gradient-text">Perfect Matches</span>
          </h2>
          <p className="text-xl text-neutral-silver max-w-2xl mx-auto">
            Our proprietary AI analyzes thousands of data points to find your ideal partner
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-2xl font-display font-semibold text-neutral-pearl mb-6">
                AI Compatibility Demo
              </h3>
              
              {/* Profile tabs */}
              <div className="flex gap-4 mb-6">
                {["Profile A", "Profile B"].map((profile, index) => (
                  <button
                    key={profile}
                    onClick={() => setActiveTab(index)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      activeTab === index
                        ? "bg-gradient-to-r from-accent-gold to-accent-rose text-primary"
                        : "bg-white/5 text-neutral-silver hover:bg-white/10"
                    }`}
                  >
                    {profile}
                  </button>
                ))}
              </div>

              {/* Compatibility Wheel */}
              <div className="relative mb-8">
                <div className="w-48 h-48 mx-auto relative">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <motion.circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: compatibility / 100 }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      style={{
                        strokeDasharray: 553,
                        strokeDashoffset: 553 * (1 - compatibility / 100),
                      }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#D4AF37" />
                        <stop offset="100%" stopColor="#E8B4B8" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Heart className="w-8 h-8 text-accent-rose mb-2" />
                    <div className="text-3xl font-bold text-neutral-pearl">
                      {compatibility}%
                    </div>
                    <div className="text-xs text-neutral-silver">Compatibility</div>
                  </div>
                </div>
              </div>

              <Button
                onClick={calculateCompatibility}
                variant="luxury"
                className="w-full"
                glowing
              >
                Calculate Match Score
              </Button>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <span className="text-sm text-neutral-silver">Personality Match</span>
                  <span className="text-sm font-semibold text-accent-gold">94%</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <span className="text-sm text-neutral-silver">Lifestyle Compatibility</span>
                  <span className="text-sm font-semibold text-accent-gold">88%</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <span className="text-sm text-neutral-silver">Long-term Potential</span>
                  <span className="text-sm font-semibold text-accent-gold">91%</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <GlassCard hoverable className="h-full">
                  <div className="flex flex-col items-center text-center p-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-gold/20 to-accent-rose/20 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-accent-gold" />
                    </div>
                    <h4 className="font-semibold text-neutral-pearl mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-neutral-silver">
                      {feature.description}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-neutral-silver uppercase tracking-wider mb-4">
            Powered By
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {["GPT-4", "TensorFlow", "PyTorch", "Azure AI"].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-neutral-silver text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}