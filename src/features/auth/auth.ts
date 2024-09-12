import { prisma } from '@/core/db/db';
import { authConfig } from '@/features/auth/auth.config';
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

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers,
  callbacks: {
    jwt({ token, user }) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});
