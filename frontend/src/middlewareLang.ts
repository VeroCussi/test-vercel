import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middlewareLang(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (
    url.pathname.startsWith('/_next') || // Internal Next.js files
    url.pathname.startsWith('/favicon.ico') || // Favicon
    url.pathname.startsWith('/videos') || // Video files
    /\.(png|jpg|jpeg|svg|webp|ico|css|js|mp4)$/.test(url.pathname) // Match static file extensions
  ) {
    // Skip middleware for static assets
    return NextResponse.next();
  }

  // Language detection logic
  const langCookie = req.cookies.get('NEXT_LOCALE')?.value;
  const browserLang = req.headers.get('accept-language')?.slice(0, 2).toLowerCase();
  const supportedLanguages = ['en', 'fr'];
  const defaultLang = supportedLanguages.includes(browserLang || '') ? browserLang : 'en';

  const lang = langCookie || defaultLang || 'en';

  // Redirect to ensure language prefix
  if (!url.pathname.startsWith('/fr') && !url.pathname.startsWith('/en')) {
    url.pathname = `/${lang}${url.pathname}`;
    return NextResponse.redirect(url);
  }

  // Set language cookie for future requests
  const response = NextResponse.next();
  response.cookies.set('NEXT_LOCALE', lang);
  return response;
}

export const config = {
  matcher: '/:path*',
};
