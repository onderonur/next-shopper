import { CartDrawer } from '@/cart/cart-drawer';
import { TooltipProvider } from '@/common/tooltip';
import { Layout, LayoutFooter } from '@/layout/layout';
import '@/styles/global.css';
import type { Viewport } from 'next';
import { Inter } from 'next/font/google';
import { twJoin } from 'tailwind-merge';

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
      <body className="bg-background-dark text-foreground">
        <TooltipProvider>
          <Layout>
            {children}
            <LayoutFooter>
              <CartDrawer />
            </LayoutFooter>
          </Layout>
        </TooltipProvider>
      </body>
    </html>
  );
}
