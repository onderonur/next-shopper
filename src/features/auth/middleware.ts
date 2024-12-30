import { cookies, headers } from 'next/headers';
import type { NextRequest } from 'next/server';
import { getSessionCookieName } from './utils';

export async function checkIsValidAgainstCSRF() {
  const headersList = await headers();
  // We can also compare it against the `Origin` or `X-Forwarded-Host` header.
  // https://lucia-auth.com/sessions/cookies/
  // https://github.com/lucia-auth/example-nextjs-github-oauth/blob/main/middleware.ts#L23
  const host = headersList.get('host');
  return host === process.env.APP_HOST;
}

// When a user has a `sessionToken` cookie, we optimistically assume they are authenticated.
// Database checks for sessions in middleware can end up having performance issues.
// https://nextjs.org/docs/app/building-your-application/authentication#optimistic-checks-with-middleware-optional
export async function extendSessionCookieExpiration(req: NextRequest) {
  // Only extend cookie expiration on GET requests since we can be sure
  // a new session wasn't set when handling the request.
  // https://github.com/lucia-auth/example-nextjs-github-oauth/blob/main/middleware.ts#L10
  if (req.method !== 'GET') return;

  const cookieName = getSessionCookieName();

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(cookieName)?.value;

  if (!sessionToken) return;

  cookieStore.set({
    name: cookieName,
    value: sessionToken,
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
}
