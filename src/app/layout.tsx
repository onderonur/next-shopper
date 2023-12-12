import '@/styles/global.css';
import { Inter } from 'next/font/google';
import { BaseSWRConfig } from '@/http-client/base-swr-config';
import type { Viewport } from 'next';
import { twJoin } from 'tailwind-merge';
import { Layout, LayoutFooter } from '@/layout/layout';

const inter = Inter({
  variable: '--font-inter',
  display: 'swap',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  themeColor: '#fff',
};

type RootLayoutProps = React.PropsWithChildren;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={twJoin(
        inter.variable,
        'font-sans',
        // fluid font-size:
        // 14px - 16px for 640px - 1024px viewport
        'text-[clamp(0.875rem,0.667rem+0.52vw,1rem)]',
      )}
    >
      <head />
      <body className="bg-background-dark text-text-main">
        <BaseSWRConfig>
          <Layout>
            {children}
            <LayoutFooter />
          </Layout>
        </BaseSWRConfig>
      </body>
    </html>
  );
}
