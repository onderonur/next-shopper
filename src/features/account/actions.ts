'use server';

import { prisma } from '@/core/db/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { redirectToSignIn } from '../auth/actions';
import { getUser } from '../auth/data';
import { getSessionCookieName } from '../auth/utils';

export async function deleteAccount() {
  const user = await getUser();
  if (!user?.id) return await redirectToSignIn();

  await prisma.user.delete({
    where: {
      id: user.id,
    },
  });

  const cookieStore = await cookies();
  const cookieName = getSessionCookieName();
  cookieStore.delete(cookieName);

  redirect('/');
}
