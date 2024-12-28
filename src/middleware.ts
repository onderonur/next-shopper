import { authConfig } from '@/features/auth/auth.config';
import NextAuth from 'next-auth';

export const { auth: middleware } = NextAuth(authConfig);

// Routes Middleware should not run on
// https://nextjs.org/docs/pages/building-your-application/authentication#optimistic-checks-with-middleware-optional
export const config = {
  // eslint-disable-next-line unicorn/prefer-string-raw
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
