import { prisma } from '@/core/db/db';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  // Session expires after `maxAge`, which is 30 days by default.
  // When session is checked while `database` strategy is being used,`expires` date gets updated
  // if `maxAge` is not passed and `updateAge` (1 day by default) is passed. when `database` strategy is used.
  // https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/lib/actions/session.ts#L115
  // When session is checked while `jtw` strategy is being used, `expires` date gets updated each time.
  // https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/lib/actions/session.ts#L35
  session: {
    // `database` is the default strategy when an adapter is used.
    // If you use an adapter however, it defaults to "database" instead.
    // We force a JWT session by explicitly defining "jwt".
    // https://authjs.dev/reference/nextjs#strategy
    strategy: 'jwt',
  },
});
