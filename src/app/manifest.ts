import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PipBud — Telegram Trading Journal & 7-Level Meritocracy',
    short_name: 'PipBud',
    description: 'Log trades instantly on Telegram. Build your audited track record to unlock 7 gated skill tiers on a modern trader forum. 100% verified meritocracy.',
    start_url: '/',
    id: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#FAFAF9',
    theme_color: '#FAFAF9',
    orientation: 'portrait-primary',
    categories: ['finance', 'business', 'productivity'],
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  };
}
