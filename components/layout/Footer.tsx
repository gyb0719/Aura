"use client"

import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  product: [
    { label: "기능", href: "#features" },
    { label: "멤버십", href: "#membership" },
    { label: "성공 스토리", href: "#success" },
    { label: "이벤트", href: "#events" }
  ],
  company: [
    { label: "회사 소개", href: "#about" },
    { label: "채용", href: "#careers" },
    { label: "언론", href: "#press" },
    { label: "투자자", href: "#investors" }
  ],
  support: [
    { label: "고객센터", href: "#help" },
    { label: "안전", href: "#safety" },
    { label: "개인정보처리방침", href: "#privacy" },
    { label: "이용약관", href: "#terms" }
  ],
  social: [
    { label: "인스타그램", href: "#instagram" },
    { label: "링크드인", href: "#linkedin" },
    { label: "트위터", href: "#twitter" },
    { label: "유튜브", href: "#youtube" }
  ]
}

export default function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    if (href.startsWith("#")) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      } else {
        alert(`${href.slice(1)} 페이지 준비중`)
      }
    }
  }

  return (
    <footer className="py-24 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-primary">
                오라
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              AI가 찾아주는 당신의 운명
            </p>
            <div className="space-y-2">
              <a 
                href="mailto:hello@aura.co.kr" 
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  alert("이메일: hello@aura.co.kr")
                }}
              >
                <Mail className="w-4 h-4" />
                hello@aura.co.kr
              </a>
              <a 
                href="tel:02-1234-5678" 
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  alert("전화: 02-1234-5678")
                }}
              >
                <Phone className="w-4 h-4" />
                02-1234-5678
              </a>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <MapPin className="w-4 h-4" />
                서울 | 부산 | 제주
              </div>
            </div>
          </div>

          {/* Links columns */}
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">서비스</h4>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">회사</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">지원</h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">소셜</h4>
              <ul className="space-y-2">
                {footerLinks.social.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              © 2024 오라. 모든 권리 보유.
            </p>
            <div className="flex items-center gap-6">
              <a 
                href="#privacy" 
                onClick={(e) => handleLinkClick(e, "#privacy")}
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
              >
                개인정보처리방침
              </a>
              <a 
                href="#terms" 
                onClick={(e) => handleLinkClick(e, "#terms")}
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
              >
                이용약관
              </a>
              <a 
                href="#cookies" 
                onClick={(e) => handleLinkClick(e, "#cookies")}
                className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
              >
                쿠키
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}