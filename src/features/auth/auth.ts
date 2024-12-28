import { prisma } from '@/core/db/db';
import { routes } from '@/core/routing/utils';
import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import type { Provider } from 'next-auth/providers';
import GitHub from 'next-auth/providers/github';

const providers: Provider[] = [
  GitHub({
    profile: (profile) => {
      return {
        // This `id` is not stored in the DB of our app.
        // It is used by Auth.js to match the related GitHub profile
        // and check if there is already a registered user etc.
        // If we remove this, it throws "Another account already exists with the same e-mail address." error
        // for the subsequent signing ins after the first one.
        id: profile.id.toString(),
        name: profile.login,
        email: profile.email,
        image: profile.avatar_url,
      };
    },
  }),
];

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === 'function') {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    }

    return { id: provider.id, name: provider.name };
  })
  .filter((provider) => provider.id !== 'credentials');

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
  // Session expires after `maxAge`, which is 30 days by default.
  // When session is checked while `database` strategy is being used,`expires` date gets updated
  // if `maxAge` is not passed and `updateAge` (1 day by default) is passed. when `database` strategy is used.
  // https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/lib/actions/session.ts#L115
  // When session is checked while `jtw` strategy is being used, `expires` date gets updated each time.
  // https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/lib/actions/session.ts#L35
  session: {
    // `database` is the default strategy when an adapter is used.
    // Just added it here to make it more explicit.
    // From the docs:
    // If you use an adapter however, we default it to "database" instead.
    // You can still force a JWT session by explicitly defining "jwt".
    // https://authjs.dev/reference/nextjs#strategy
    strategy: 'database',
  },
  // To have access to the user’s id with calls to auth() or useSession().
  // https://authjs.dev/guides/extending-the-session#with-database
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  // https://authjs.dev/getting-started/session-management/custom-pages
  pages: {
    signIn: routes.signIn(),
  },
});
