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
  themeColor: '#FAFAF9',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pipbud.xyz';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'PipBud — Telegram Trading Journal & 7-Level Verified Trader Forum',
    template: '%s | PipBud',
  },
  description:
    'Log trades instantly on Telegram via screenshot, voice note, or text. Build an audited track record to unlock 7 skill-gated tiers on a verified trader forum. Zero fake gurus.',
  keywords: [
    'telegram trading journal',
    'trading journal bot',
    'forex trading journal',
    '7 level trader forum',
    'verified traders',
    'prop firm evaluation pass',
    'funded trader ledger',
    'SMC ICT order block',
    'liquidity sweep journal',
    'MT4 MT5 trade sync',
    'risk of ruin drawdown audit',
    'pipbud',
    'pipbud bot',
    'meritocracy trading',
  ],
  authors: [{ name: 'PipBud Meritocracy Protocol', url: siteUrl }],
  creator: 'PipBud',
  publisher: 'PipBud',
  category: 'Finance',
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'PipBud — Telegram Trading Journal & 7-Level Verified Trader Forum',
    description:
      '100% verified trader meritocracy. Telegram bot journal, web trade analytics, and 7-tier gated trading desks. Zero fake gurus.',
    url: siteUrl,
    siteName: 'PipBud',
    images: [
      {
        url: '/og-image.PNG',
        width: 1200,
        height: 630,
        alt: 'PipBud — Telegram Trading Journal & 7-Level Meritocracy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PipBud — Telegram Trading Journal & 7-Level Verified Trader Forum',
    description:
      '100% verified trader meritocracy. Telegram bot journal, web analytics, and 7-tier gated desks.',
    images: ['/og-image.PNG'],
    creator: '@PipBud',
  },
};

const jsonLdStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'PipBud',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/icon-512.png`,
        width: 512,
        height: 512,
      },
      sameAs: [
        'https://t.me/PipBudBot',
        'https://twitter.com/PipBud',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'PipBud — Telegram Trading Journal & 7-Level Meritocracy',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${siteUrl}/#software`,
      name: 'PipBud Telegram Trading Bot & Web Journal',
      url: siteUrl,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'iOS, Android, Web, macOS, Windows',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description:
        'Frictionless Telegram bot trading journal with automated chart screenshot parsing, voice note transcription, MT4/MT5 statement syncing, and 7-tier meritocracy trader rooms.',
      featureList: [
        'Telegram trade logging via chat, photo, and voice notes',
        '7-tier verified trader meritocracy system',
        'Automated risk-of-ruin and drawdown calculation',
        'Zero-tolerance anti-shortfall demotion protocol',
        'Dual-telemetry MT4 and MT5 investor credential sync',
        'Interactive equity curve and R-Multiple analytics',
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How does the 7-level meritocracy work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'PipBud categorizes traders into 7 strictly audited tiers: Level 1 (Market Explorer), Level 2 (Discipline Apprentice), Level 3 (Consistent Operator), Level 4 (Risk Sentinel), Level 5 (Capital Allocator), Level 6 (Market Maestro), and Level 7 (Institutional Sovereign). Each tier requires a sample of verified trades, a minimum win rate and profit factor, and strict adherence to a maximum drawdown ceiling.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens if I fall short of my tier’s requirements?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We enforce the Zero-Tolerance Anti-Shortfall Rule. If your cumulative drawdown exceeds your tier tolerance, your Tier Health Score drops. If it reaches 0%, you are automatically demoted and immediately removed from that level’s forum channels. A public demotion entry is logged in #demotions-log to preserve 100% community legitimacy.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I pay money or buy access to higher tier rooms?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Never. You can never pay for ratings, badges, or tier access. Every single person in #funded-floor, #capital-allocations, or #sovereign-sanctuary has mathematically proven their execution via verified journal entries and broker statements.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does the Telegram bot make journaling frictionless?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can log trades in three natural ways: (1) upload a TradingView or MT4/5 chart screenshot; (2) speak trade details as a Telegram voice note transcribed automatically into your journal; or (3) type a quick command like "/log Long EU 1.0840 SL 1.0820 TP 1.0890 15m OB". The bot calculates the R:R, tracks confluences, and stores it in your verified ledger.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I pass evaluation to reach Level 4: Risk Sentinel?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Level 4 requires at least 100 completed trades with a win rate ≥ 50%, Sharpe ratio > 1.25, and a maximum drawdown strictly under 5.0%. Once verified via broker statement or prop firm certificate, the bot unlocks #funded-floor and verified profile badges.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is my account balance and personal data private?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Sensitive data (exact account numbers, personal notes, Telegram username) is protected by our Anti-DM Shield. When you share a trade card in the forum, only percentage metrics (e.g. +2.45R WIN, 1:2.45 R:R, 15m OB) and confluences are displayed.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdStructuredData),
          }}
        />
      </head>
      <body className={`${inter.variable} bg-[#FAFAF9] text-[#1C1917] antialiased selection:bg-[#E7E5E4] selection:text-[#1C1917] min-h-screen`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col relative bg-[#FAFAF9]">
            {children}
          </div>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}