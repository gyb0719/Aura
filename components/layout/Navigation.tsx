"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import ThemeToggle from '@/components/ui/ThemeToggle'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "#features", label: "기능" },
    { href: "#membership", label: "멤버십" },
    { href: "#technology", label: "AI 매칭" },
    { href: "#success", label: "성공 사례" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              AURA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm lg:text-base text-gray-700 hover:text-pink-600 transition-colors duration-200 font-medium"
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.querySelector(link.href)
                  element?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <ThemeToggle />
            <Link
              href="/auth/signin"
              className="px-4 py-2 text-sm lg:text-base text-gray-700 hover:text-pink-600 transition-colors font-medium"
            >
              로그인
            </Link>
            <Link
              href="/auth/signup"
              className="px-5 lg:px-6 py-2 lg:py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-sm lg:text-base font-medium rounded-xl transition-all hover:shadow-lg transform hover:-translate-y-0.5"
            >
              시작하기
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-gray-200 bg-white"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    setIsMobileMenuOpen(false)
                    const element = document.querySelector(link.href)
                    element?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="text-gray-700 hover:text-primary transition-colors font-medium py-2"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    alert("로그인 기능 준비중")
                  }}
                  className="w-full py-2 text-gray-700 hover:text-primary transition-colors"
                >
                  로그인
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    alert("회원가입 기능 준비중")
                  }}
                  className="w-full py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-all"
                >
                  시작하기
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}