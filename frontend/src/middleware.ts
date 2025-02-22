import { middlewareLang } from './middlewareLang';
import { NextRequest } from 'next/server';

export const middleware = (req: NextRequest) => {
  // Let middlewareLang handle the routing logic
  return middlewareLang(req);
};

export const config = {
  matcher: [
    '/((?!_next/|favicon.ico|videos/|static/|public/|.*\\.(?:jpg|jpeg|gif|png|svg|ico|mp4)).*)',
  ],
};
// 
