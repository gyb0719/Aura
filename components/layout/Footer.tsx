"use client"

import Link from "next/link"
import { Sparkles, Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Membership", href: "#membership" },
    { label: "Success Stories", href: "#success" },
    { label: "Events", href: "#events" }
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "#careers" },
    { label: "Press", href: "#press" },
    { label: "Investors", href: "#investors" }
  ],
  support: [
    { label: "Help Center", href: "#help" },
    { label: "Safety", href: "#safety" },
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" }
  ],
  social: [
    { label: "Instagram", href: "#instagram" },
    { label: "LinkedIn", href: "#linkedin" },
    { label: "Twitter", href: "#twitter" },
    { label: "YouTube", href: "#youtube" }
  ]
}

export default function Footer() {
  return (
    <footer className="relative py-16 bg-primary-dark border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-accent-gold" />
              <span className="text-2xl font-display font-bold text-neutral-pearl">
                AURA<span className="text-accent-gold">Elite</span>
              </span>
            </Link>
            <p className="text-sm text-neutral-silver mb-4">
              Where Elite Singles Connect
            </p>
            <div className="space-y-2">
              <a href="mailto:hello@auraelite.com" className="flex items-center gap-2 text-sm text-neutral-silver hover:text-accent-gold transition-colors">
                <Mail className="w-4 h-4" />
                hello@auraelite.com
              </a>
              <a href="tel:1-800-AURA" className="flex items-center gap-2 text-sm text-neutral-silver hover:text-accent-gold transition-colors">
                <Phone className="w-4 h-4" />
                1-800-AURA
              </a>
              <div className="flex items-center gap-2 text-sm text-neutral-silver">
                <MapPin className="w-4 h-4" />
                NYC | SF | LA | Miami
              </div>
            </div>
          </div>

          {/* Links columns */}
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-neutral-pearl mb-4">Product</h4>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-neutral-silver hover:text-accent-gold transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-neutral-pearl mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-neutral-silver hover:text-accent-gold transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-neutral-pearl mb-4">Support</h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-neutral-silver hover:text-accent-gold transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-neutral-pearl mb-4">Social</h4>
              <ul className="space-y-2">
                {footerLinks.social.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-neutral-silver hover:text-accent-gold transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-silver">
              © 2024 AURA Elite. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#privacy" className="text-sm text-neutral-silver hover:text-accent-gold transition-colors">
                Privacy
              </Link>
              <Link href="#terms" className="text-sm text-neutral-silver hover:text-accent-gold transition-colors">
                Terms
              </Link>
              <Link href="#cookies" className="text-sm text-neutral-silver hover:text-accent-gold transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}