import Navigation from "@/components/layout/Navigation"
import HeroSection from "@/components/sections/HeroSection"
import TrustSection from "@/components/sections/TrustSection"
import MembershipSection from "@/components/sections/MembershipSection"
import AIShowcaseSection from "@/components/sections/AIShowcaseSection"
import SuccessSection from "@/components/sections/SuccessSection"
import EventsSection from "@/components/sections/EventsSection"
import Footer from "@/components/layout/Footer"

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="relative">
        <div className="space-y-32">
          <HeroSection />
          <TrustSection />
          <AIShowcaseSection />
          <MembershipSection />
          <SuccessSection />
          <EventsSection />
        </div>
      </main>
      <Footer />
    </>
  )
}