"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Crown, Star, Shield, Diamond } from "lucide-react"
import GlassCard from "@/components/ui/GlassCard"
import Button from "@/components/ui/Button"

const membershipTiers = [
  {
    name: "Silver",
    icon: Shield,
    price: "$99",
    period: "per month",
    color: "from-gray-400 to-gray-600",
    features: [
      "Basic profile verification",
      "5 daily matches",
      "Standard messaging",
      "Profile visibility boost",
      "Basic search filters"
    ],
    popular: false
  },
  {
    name: "Gold",
    icon: Star,
    price: "$199",
    period: "per month",
    color: "from-yellow-400 to-yellow-600",
    features: [
      "Enhanced verification badge",
      "15 daily matches",
      "Priority messaging",
      "See who likes you",
      "Advanced AI matching",
      "Video call features",
      "Monthly elite events access"
    ],
    popular: true
  },
  {
    name: "Platinum",
    icon: Crown,
    price: "$399",
    period: "per month",
    color: "from-purple-400 to-purple-600",
    features: [
      "Premium verification seal",
      "Unlimited daily matches",
      "VIP messaging priority",
      "Personal matchmaker consultation",
      "Executive search filters",
      "Exclusive event invitations",
      "Profile psychology analysis",
      "Travel match feature"
    ],
    popular: false
  },
  {
    name: "Diamond",
    icon: Diamond,
    price: "Invite Only",
    period: "",
    color: "from-cyan-400 to-blue-600",
    features: [
      "Celebrity-level verification",
      "Unlimited everything",
      "Dedicated relationship coach",
      "Curated introductions",
      "Global VIP events",
      "Concierge dating service",
      "Complete privacy control",
      "Custom AI algorithm",
      "Lifetime membership benefits"
    ],
    popular: false
  }
]

export default function MembershipSection() {
  const [selectedTier, setSelectedTier] = useState(1) // Default to Gold

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary to-primary-dark" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-rose/10 rounded-full blur-3xl" />

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
            <span className="text-neutral-pearl">Choose Your </span>
            <span className="gradient-text">Elite Status</span>
          </h2>
          <p className="text-xl text-neutral-silver max-w-2xl mx-auto">
            Unlock exclusive features and join a community of verified elite singles
          </p>
        </motion.div>

        {/* Membership cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {membershipTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedTier(index)}
              className="cursor-pointer"
            >
              <GlassCard
                hoverable
                className={`h-full relative ${
                  selectedTier === index ? "ring-2 ring-accent-gold" : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-3 py-1 bg-gradient-to-r from-accent-gold to-accent-rose text-primary text-xs font-semibold rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="p-6">
                  {/* Tier icon and name */}
                  <div className="flex items-center justify-center mb-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center`}>
                      <tier.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-center text-neutral-pearl mb-2">
                    {tier.name}
                  </h3>

                  {/* Pricing */}
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold gradient-text">
                      {tier.price}
                    </div>
                    {tier.period && (
                      <div className="text-sm text-neutral-silver">{tier.period}</div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-accent-gold mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-neutral-silver">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    variant={selectedTier === index ? "luxury" : "secondary"}
                    size="md"
                    className="w-full"
                    glowing={selectedTier === index}
                  >
                    {tier.name === "Diamond" ? "Request Invitation" : "Select Plan"}
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Additional benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <GlassCard className="max-w-3xl mx-auto p-8">
            <h3 className="text-2xl font-display font-semibold text-neutral-pearl mb-4">
              All Memberships Include
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <Shield className="w-8 h-8 text-accent-gold mx-auto mb-2" />
                <h4 className="font-semibold text-neutral-pearl mb-1">Identity Protection</h4>
                <p className="text-sm text-neutral-silver">
                  Bank-level encryption and privacy controls
                </p>
              </div>
              <div>
                <Star className="w-8 h-8 text-accent-gold mx-auto mb-2" />
                <h4 className="font-semibold text-neutral-pearl mb-1">Quality Guarantee</h4>
                <p className="text-sm text-neutral-silver">
                  100% verified members or your money back
                </p>
              </div>
              <div>
                <Crown className="w-8 h-8 text-accent-gold mx-auto mb-2" />
                <h4 className="font-semibold text-neutral-pearl mb-1">Success Coaching</h4>
                <p className="text-sm text-neutral-silver">
                  Expert dating advice and profile optimization
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}