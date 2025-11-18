'use server';

import { prisma } from '@/core/db/db';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { redirectToSignIn } from '../auth/actions';
import { auth } from '../auth/auth';
import { getUser } from '../auth/data';

export async function deleteAccount() {
  const user = await getUser();
  if (!user?.id) return await redirectToSignIn();

  await auth.api.signOut({
    headers: await headers(),
  });

  await prisma.user.delete({
    where: {
      id: user.id,
    },
  });

  redirect('/');
}
