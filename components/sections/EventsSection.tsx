"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Users, Clock, ChevronRight } from "lucide-react"
import GlassCard from "@/components/ui/GlassCard"
import Button from "@/components/ui/Button"

const upcomingEvents = [
  {
    title: "Elite Wine Tasting",
    date: "December 15, 2024",
    time: "7:00 PM",
    location: "The Peninsula, NYC",
    attendees: 24,
    maxAttendees: 30,
    tier: "Gold+",
    image: "/api/placeholder/400/300"
  },
  {
    title: "Yacht Party Miami",
    date: "December 22, 2024",
    time: "6:00 PM",
    location: "Miami Beach Marina",
    attendees: 18,
    maxAttendees: 40,
    tier: "Platinum+",
    image: "/api/placeholder/400/300"
  },
  {
    title: "Art Gallery Opening",
    date: "January 5, 2025",
    time: "8:00 PM",
    location: "MOMA, San Francisco",
    attendees: 32,
    maxAttendees: 50,
    tier: "All Members",
    image: "/api/placeholder/400/300"
  },
  {
    title: "Private Ski Weekend",
    date: "January 12-14, 2025",
    time: "All Day",
    location: "Aspen, Colorado",
    attendees: 12,
    maxAttendees: 20,
    tier: "Diamond Only",
    image: "/api/placeholder/400/300"
  }
]

export default function EventsSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark to-primary" />
      
      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-accent-gold/10 rounded-full blur-3xl"
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
            <span className="text-neutral-pearl">Exclusive </span>
            <span className="gradient-text">Elite Events</span>
          </h2>
          <p className="text-xl text-neutral-silver max-w-2xl mx-auto">
            Meet verified members at curated luxury experiences in your city
          </p>
        </motion.div>

        {/* Events grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard hoverable className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Event image */}
                  <div className="md:w-1/3 h-48 md:h-auto bg-gradient-to-br from-accent-gold/20 to-accent-rose/20 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Calendar className="w-12 h-12 text-accent-gold/50" />
                    </div>
                    {event.tier === "Diamond Only" && (
                      <div className="absolute top-2 right-2 px-2 py-1 bg-gradient-to-r from-cyan-400 to-blue-600 text-white text-xs font-semibold rounded">
                        VIP
                      </div>
                    )}
                  </div>

                  {/* Event details */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-neutral-pearl">
                        {event.title}
                      </h3>
                      <span className="px-2 py-1 text-xs rounded-full bg-white/10 text-accent-gold">
                        {event.tier}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-neutral-silver">
                        <Calendar className="w-4 h-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-silver">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-silver">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-silver">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees}/{event.maxAttendees} Attending</span>
                      </div>
                    </div>

                    {/* Attendee avatars */}
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {[...Array(Math.min(4, event.attendees))].map((_, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full bg-gradient-to-r from-accent-gold to-accent-rose border-2 border-primary"
                          />
                        ))}
                        {event.attendees > 4 && (
                          <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-primary flex items-center justify-center">
                            <span className="text-xs text-neutral-silver">
                              +{event.attendees - 4}
                            </span>
                          </div>
                        )}
                      </div>
                      <Button variant="primary" size="sm">
                        RSVP
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <GlassCard className="max-w-2xl mx-auto p-8">
            <h3 className="text-2xl font-display font-semibold text-neutral-pearl mb-4">
              Host Your Own Elite Event
            </h3>
            <p className="text-neutral-silver mb-6">
              Platinum and Diamond members can create private events and invite selected matches. 
              Our concierge team will help you plan the perfect experience.
            </p>
            <Button variant="luxury" size="lg" glowing>
              Learn More About Event Hosting
            </Button>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}