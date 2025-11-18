'use server';

import type { SignInPageSearchParams } from '@/core/routing/schemas';
import { routes } from '@/core/routing/utils';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function redirectToSignIn() {
  const headersList = await headers();
  const callbackUrl = headersList.get('referer');

  const searchParams: SignInPageSearchParams = {};

  if (callbackUrl) {
    searchParams.callbackUrl = callbackUrl;
  }

  return redirect(routes.signIn(searchParams));
}
