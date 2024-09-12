// https://authjs.dev/guides/edge-compatibility#split-config
import { authConfig } from '@/features/auth/auth.config';
import NextAuth from 'next-auth';
import { type MiddlewareConfig } from 'next/server';

export const config: MiddlewareConfig = {
  // The following example avoids running the middleware on paths such as the favicon or static images.
  // https://nextjs.org/docs/app/building-your-application/authentication#handling-unauthorized-access
  // eslint-disable-next-line unicorn/prefer-string-raw
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

export const { auth: middleware } = NextAuth(authConfig);
