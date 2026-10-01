import type { Metadata, Viewport } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from '@/context/AuthContext';
import MobileNavDock from '@/components/MobileNavDock';
import InstallAppBanner from '@/components/InstallAppBanner';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#C2410C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'PipBud — Telegram Trading Journal & 7-Level Verified Trader Forum',
  description: 'Log trades instantly on Telegram. Audit your stats on the Web Journal. Unlock 7 exclusive skill tiers on a state-of-the-art messaging platform. Fall short of your tier’s performance? You get automatically removed. 100% verified meritocracy.',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'PipBud',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  keywords: 'trading journal, telegram trading bot, forex journal, 7 skill levels, trader forum, verified traders, prop firm trading, SMC ICT order block, trade analytics, PWA trading app',
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
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} ${inter.variable} bg-[#FAFAF9] text-[#1C1917] antialiased selection:bg-[#FED7AA] selection:text-[#9A3412]`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            {children}
            <InstallAppBanner />
            <MobileNavDock />
          </div>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}