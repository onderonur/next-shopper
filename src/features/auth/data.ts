import { auth } from '@/features/auth/auth';
import { headers } from 'next/headers';
import { cache } from 'react';
import 'server-only';

export const getUser = cache(async () => {
  const headersList = await headers();
  const isInAction = headersList.get('Next-Action');

  const response = await auth.api.getSession({
    headers: headersList,
    query: {
      // https://github.com/better-auth/better-auth/issues/2115#issuecomment-3487926970
      disableRefresh: !isInAction,
    },
  });

  return response?.user;
});
