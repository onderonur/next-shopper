import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import {
  checkIsValidAgainstCSRF,
  extendSessionCookieExpiration,
} from './features/auth/middleware';

export async function middleware(req: NextRequest) {
  const isValidAgainstCSRF = await checkIsValidAgainstCSRF();

  if (!isValidAgainstCSRF) {
    return NextResponse.json(null, { status: 403 });
  }

  await extendSessionCookieExpiration(req);

  return NextResponse.next();
}

// Routes Middleware should not run on
// https://nextjs.org/docs/app/building-your-application/authentication#optimistic-checks-with-middleware-optional
export const config = {
  matcher: [
    /* eslint-disable unicorn/prefer-string-raw */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|.*\\.(?:png|jpg)$).*)',
  ],
};
