import { CartDrawer } from '@/cart/cart-drawer';
import { TooltipProvider } from '@/common/tooltip';
import { Layout, LayoutFooter, LayoutHeader } from '@/layout/layout';
import '@/styles/global.css';
import type { Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
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
      // Required for `next-themes`.
      // https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
      suppressHydrationWarning
    >
      <head />
      <body className="bg-background text-foreground">
        <ThemeProvider>
          <TooltipProvider>
            <Layout>
              <LayoutHeader>
                <div className="hidden md:block">
                  <CartDrawer />
                </div>
              </LayoutHeader>
              <div className="mt-app-header">{children}</div>
              <LayoutFooter>
                <CartDrawer />
              </LayoutFooter>
            </Layout>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
