'use server';

import { routes } from '@/core/routing/utils';
import type { Maybe } from '@/core/shared/types';
import { signOut as authSignOut, signIn } from '@/features/auth/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function redirectToSignIn() {
  const headersList = await headers();
  const callbackUrl = headersList.get('referer');
  // Normally, using `signIn` from `@/features/auth/auth` redirects user to the sign in page too.
  // But, it redirects to default sign in page (`/api/auth/signin`), instead of the custom page (`/auth/sign-in`).
  // It still shows the custom page. But it does not work and throws `MissingCSRF` error when "Sign in with ..."
  // button is clicked.
  // The redirect with the "Sign In" button on the header works correctly.
  // But it redirects to the wrong page when "Add to Cart" button is clicked while not signed in for example.
  // In summary, this custom redirect is added to fix this redirect issue instead of
  // using `signIn` function from `@/features/auth/auth`.
  return redirect(routes.signIn({ callbackUrl }));
}

export async function signInWithProvider({
  providerId,
  callbackUrl,
}: {
  providerId: string;
  callbackUrl: Maybe<string>;
}) {
  await signIn(providerId, {
    redirectTo: callbackUrl ?? '',
  });
}

export async function signOut() {
  await authSignOut();
}
