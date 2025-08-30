import { Metadata } from 'next'

export const siteConfig = {
  name: 'AURA',
  title: 'AURA - AI 기반 프리미엄 매칭 플랫폼',
  description: 'AI가 분석하는 200개 이상의 호환성 요소로 당신의 완벽한 인연을 찾아드립니다. 검증된 프리미엄 회원들과 함께하세요.',
  url: 'https://aura.dating',
  ogImage: 'https://aura.dating/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/aura_dating',
    instagram: 'https://instagram.com/aura_dating'
  },
  keywords: [
    '프리미엄 데이팅',
    'AI 매칭',
    '소개팅',
    '결혼정보',
    '엘리트 데이팅',
    '매칭 앱',
    '인연 찾기',
    '진지한 만남'
  ]
}

export const defaultMetadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url
    }
  ],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@aura_dating'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
  manifest: '/site.webmanifest'
}