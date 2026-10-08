import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://app.pipbud.xyz').replace(/\/$/, '');
    return [
      { source: '/login', destination: `${appUrl}/login`, permanent: false },
      { source: '/feed', destination: `${appUrl}/feed`, permanent: false },
      { source: '/forum', destination: `${appUrl}/forum`, permanent: false },
      { source: '/forum/:path*', destination: `${appUrl}/forum/:path*`, permanent: false },
      { source: '/journal', destination: `${appUrl}/journal`, permanent: false },
      { source: '/journal/:path*', destination: `${appUrl}/journal/:path*`, permanent: false },
      { source: '/profile', destination: `${appUrl}/profile`, permanent: false },
      { source: '/profile/:path*', destination: `${appUrl}/profile/:path*`, permanent: false },
      { source: '/trader/:path*', destination: `${appUrl}/trader/:path*`, permanent: false },
      { source: '/settings', destination: `${appUrl}/settings`, permanent: false },
      { source: '/settings/:path*', destination: `${appUrl}/settings/:path*`, permanent: false },
      { source: '/notifications', destination: `${appUrl}/notifications`, permanent: false },
      { source: '/community/:path*', destination: `${appUrl}/feed`, permanent: false },
      { source: '/post/:path*', destination: `${appUrl}/post/:path*`, permanent: false },
    ];
  },
};

export default nextConfig;
