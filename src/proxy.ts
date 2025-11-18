import { NextResponse } from 'next/server';
import { checkIsValidAgainstCSRF } from './features/auth/proxy';

export async function proxy() {
  const isValidAgainstCSRF = await checkIsValidAgainstCSRF();

  if (!isValidAgainstCSRF) {
    return NextResponse.json(null, { status: 403 });
  }

  return NextResponse.next();
}

// Routes Proxy should not run on
// https://nextjs.org/docs/app/guides/authentication#optimistic-checks-with-proxy-optional
export const config = {
  // eslint-disable-next-line unicorn/prefer-string-raw
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
