import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';
import setCookie from 'set-cookie-parser';
import { httpClient } from './core/http-client/http-client';

export async function middleware() {
  const headersList = await headers();

  // TODO: We can't use `auth()` in `middleware.ts` since it is not edge compatible with database session strategy.
  // We fetch session here from a route handler to update `Expires` or `Max-Age` fields of the cookie and keep it alive,
  // or to delete it when the session ends.
  // When the database strategy is edge compatible or `middleware.ts` has Node.js Runtime,
  // we can remove this and use `auth()` probably.
  const response = await httpClient.get(
    new URL('/api/auth/session', process.env.BASE_URL),
    {
      headers: headersList,
    },
  );

  const responseCookies = setCookie(response.headers.getSetCookie());

  if (responseCookies.length) {
    const cookieStore = await cookies();
    for (const cookie of responseCookies) {
      cookieStore.set({
        name: cookie.name,
        value: cookie.value,
        path: cookie.path,
        expires: cookie.expires,
        maxAge: cookie.maxAge,
        httpOnly: cookie.httpOnly,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
        sameSite: cookie.sameSite as any,
        secure: cookie.secure,
      });
    }
  }

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
