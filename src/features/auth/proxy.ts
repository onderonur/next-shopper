import { headers } from 'next/headers';

export async function checkIsValidAgainstCSRF() {
  const headersList = await headers();
  // We can also compare it against the `Origin` or `X-Forwarded-Host` header.
  // https://lucia-auth.com/sessions/cookies/
  // https://github.com/lucia-auth/example-nextjs-github-oauth/blob/main/middleware.ts#L23
  const requestHost = headersList.get('host');

  const appUrl = new URL(process.env.BETTER_AUTH_URL as string);

  return requestHost === appUrl.host;
}
