import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "오라 | AI가 찾아주는 당신의 운명",
  description: "성공한 싱글들을 위한 프리미엄 AI 매칭 플랫폼. 검증된 회원들과 과학적인 매칭으로 진정한 인연을 만나보세요.",
  keywords: "프리미엄 데이팅, AI 매칭, 엘리트 소개팅, 고급 매칭 서비스, 검증된 만남",
  authors: [{ name: "AURA" }],
  openGraph: {
    title: "오라 | AI가 찾아주는 당신의 운명",
    description: "성공한 싱글들을 위한 프리미엄 AI 매칭 플랫폼",
    type: "website",
    locale: "ko_KR",
    siteName: "오라",
  },
  twitter: {
    card: "summary_large_image",
    title: "오라",
    description: "프리미엄 AI 매칭 플랫폼",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
