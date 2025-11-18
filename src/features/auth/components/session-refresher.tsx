'use client';

import { authClient } from '../auth-client';

export function SessionRefresher() {
  authClient.useSession();

  return null;
}
