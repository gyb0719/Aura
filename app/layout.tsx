import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURA Elite - Where Elite Singles Connect",
  description: "Premium AI-powered matchmaking platform for successful singles. Experience exclusive dating with verified elite members, AI compatibility matching, and luxury experiences.",
  keywords: "elite dating, premium matchmaking, AI dating, exclusive singles, luxury dating app",
  authors: [{ name: "AURA Elite" }],
  openGraph: {
    title: "AURA Elite - Where Elite Singles Connect",
    description: "Premium AI-powered matchmaking platform for successful singles",
    type: "website",
    locale: "en_US",
    siteName: "AURA Elite",
  },
  twitter: {
    card: "summary_large_image",
    title: "AURA Elite",
    description: "Premium AI-powered matchmaking platform",
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
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
