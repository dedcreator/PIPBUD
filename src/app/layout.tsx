import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'PipBud — Telegram Trading Journal & 7-Level Verified Trader Forum',
  description: 'Log trades instantly on Telegram. Build your audited track record to unlock 7 gated skill tiers on a modern trader forum. 100% verified meritocracy.',
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  keywords: 'trading journal, telegram trading bot, forex journal, 7 skill levels, trader forum, verified traders, prop firm trading, SMC ICT order block, trade analytics',
  openGraph: {
    title: 'PipBud — Telegram Trading Journal & 7-Level Verified Trader Forum',
    description: '100% verified trader meritocracy. Telegram bot journal, web analytics, and 7-tier gated messaging platform.',
    url: 'https://pipbud.xyz',
    siteName: 'PipBud',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PipBud — Telegram Trading Journal & 7-Level Verified Trader Forum',
    description: '100% verified trader meritocracy. Zero fake gurus.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} bg-[#000000] text-[#E7E9EA] antialiased selection:bg-[#8B5CF6]/40 selection:text-white min-h-screen`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col relative bg-[#000000]">
            {children}
          </div>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}