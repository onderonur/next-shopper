import { Copyright } from '@/core/layout/components/copyright';
import {
  Layout,
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
} from '@/core/layout/components/layout';
import {
  MobileNav,
  MobileNavButton,
} from '@/core/layout/components/mobile-nav';
import { SocialProfiles } from '@/core/layout/components/social-profiles';
import { APP_REPOSITORY_URL } from '@/core/shared/shared.utils';
import { ThemeToggle } from '@/core/styles/components/theme-toggle';
import '@/core/styles/globals.css';
import { Button } from '@/core/ui/components/button';
import { ButtonLink } from '@/core/ui/components/button-link';
import { Container } from '@/core/ui/components/container';
import { CartIcon, GithubIcon } from '@/core/ui/components/icons';
import { TooltipProvider } from '@/core/ui/components/tooltip';
import { UserButton } from '@/features/auth/components/user-button';
import { CartDrawer } from '@/features/cart/components/cart-drawer';
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

type RootLayoutProps = {
  children: React.ReactNode;
};

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
                <UserButton />
                <ButtonLink
                  aria-label="Check the Source Code on GitHub"
                  icon={<GithubIcon />}
                  href={APP_REPOSITORY_URL}
                />
                <ThemeToggle />
                <div className="hidden md:block">
                  <CartDrawer
                    trigger={
                      <Button icon={<CartIcon />} aria-label="Open Cart Info" />
                    }
                  />
                </div>
              </LayoutHeader>
              <LayoutContent>{children}</LayoutContent>
              <LayoutFooter>
                <Container
                  maxWidth="xl"
                  className="flex flex-col items-center justify-between gap-3 px-4 py-6"
                >
                  <SocialProfiles />
                  <Copyright />
                </Container>
                <MobileNav>
                  <CartDrawer
                    trigger={
                      <MobileNavButton
                        icon={<CartIcon />}
                        aria-label="Open Cart Info"
                      >
                        Cart
                      </MobileNavButton>
                    }
                  />
                </MobileNav>
              </LayoutFooter>
            </Layout>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
