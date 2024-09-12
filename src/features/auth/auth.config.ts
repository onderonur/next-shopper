import type { NextAuthConfig } from 'next-auth';

// Notice this is only an object, not a full Auth.js instance.
// https://authjs.dev/guides/edge-compatibility#split-config
export const authConfig = {
  providers: [],
  session: { strategy: 'jwt' },
} satisfies NextAuthConfig;
