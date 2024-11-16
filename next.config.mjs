/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // We set image as `unoptimized` to not exceed the
    // fair usage policy of vercel about image optimization.
    // https://vercel.com/docs/limits/fair-use-guidelines
    // https://nextjs.org/docs/app/api-reference/components/image#unoptimized
    unoptimized: true,
  },
  eslint: {
    // To make `next lint` check files and folders besides the default folders (`src`, `app` etc.):
    // https://nextjs.org/docs/app/building-your-application/configuring/eslint#linting-custom-directories-and-files
    dirs: [
      'src',
      'lint-staged.config.mjs',
      'postcss.config.js',
      'prettier.config.mjs',
      'tailwind.config.ts',
    ],
  },
};

export default nextConfig;
