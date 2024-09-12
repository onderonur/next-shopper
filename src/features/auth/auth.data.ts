import { auth } from '@/features/auth/auth';
import { cache } from 'react';
import 'server-only';

export const getUser = cache(async () => {
  const session = await auth();
  return session?.user;
});
