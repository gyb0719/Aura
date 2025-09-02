import "./globals.css";
import { defaultMetadata } from "./metadata";
import { ThemeProvider } from '@/lib/contexts/ThemeContext';

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
