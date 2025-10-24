import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    // We set image as `unoptimized` to not exceed the
    // fair usage policy of vercel about image optimization.
    // https://vercel.com/docs/platform/fair-use-policy
    // https://nextjs.org/docs/app/api-reference/components/image#unoptimized
    unoptimized: true,
  },
};

export default nextConfig;
