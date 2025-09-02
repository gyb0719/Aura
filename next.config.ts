import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // 개발 중에는 비활성화 (API 라우트 사용 위해)
  // basePath: '/aura-premium-dating-platform', // 로컬 개발 시 비활성화
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
