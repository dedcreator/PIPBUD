import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Skip static assets, Next internal files, favicon, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Detect app subdomain (e.g. app.pipbuds.com, app.localhost:3000, app.127.0.0.1:3000)
  const isAppSubdomain = host.startsWith('app.') || host.startsWith('app-');

  if (isAppSubdomain) {
    // On the app subdomain, root path '/' directly renders the app trading terminal / feed
    if (pathname === '/') {
      url.pathname = '/feed';
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
