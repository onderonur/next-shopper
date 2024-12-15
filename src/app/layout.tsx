import { Copyright } from '@/core/layouts/components/copyright';
import {
  Layout,
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
} from '@/core/layouts/components/layout';
import { MobileNav } from '@/core/layouts/components/mobile-nav';
import { MobileNavButton } from '@/core/layouts/components/mobile-nav-button';
import { SocialProfiles } from '@/core/layouts/components/social-profiles';
import { APP_REPOSITORY_URL } from '@/core/shared/utils';
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
        'font-sans antialiased',
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
                  <CartDrawer
                    trigger={
                      <Button size="icon" aria-label="Open Cart Info">
                        <CartIcon />
                      </Button>
                    }
                  />
                </div>
                <ButtonLink
                  size="icon"
                  href={APP_REPOSITORY_URL}
                  aria-label="Check the Source Code on GitHub"
                >
                  <GithubIcon />
                </ButtonLink>
                <ThemeToggle />
                <UserButton />
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
                      <MobileNavButton aria-label="Open Cart Info">
                        <CartIcon />
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
