'use server';

import { signOut as authSignOut, signIn } from '@/features/auth/auth';

export async function redirectToSignIn() {
  return await signIn();
}

export async function signOut() {
  await authSignOut();
}
