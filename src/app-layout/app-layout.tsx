import { CartDrawer } from '@/cart/cart-drawer';
import { BackToTopButton } from './back-to-top-button';
import { Container } from '@/common/container';
import classNames from 'classnames';
import { ButtonLink } from '@/common/button-link';
import { APP_REPOSITORY_URL, APP_TITLE } from '@/common/common-utils';
import { GithubIcon } from '@/common/icons';
import { NextLink } from '@/routing/next-link';

type AppLayoutProps = React.PropsWithChildren;

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppLayoutRoot>
      <AppHeader>
        <CartDrawer />
      </AppHeader>
      <AppContent>{children}</AppContent>
      <AppFooter />
    </AppLayoutRoot>
  );
}

type AppLayoutRootProps = React.PropsWithChildren;

export function AppLayoutRoot({ children }: AppLayoutRootProps) {
  return (
    <>
      <div className="grid min-h-screen grid-rows-[1fr_auto]">{children}</div>
      <BackToTopButton />
    </>
  );
}

type AppHeaderProps = React.PropsWithChildren;

export function AppHeader({ children }: AppHeaderProps) {
  return (
    <header className="fixed z-10 h-app-header w-full bg-background-main px-6 shadow-sm">
      <Container
        maxWidth="xl"
        className="flex h-full items-center justify-between"
      >
        <NextLink href="/" className="text-2xl font-bold text-primary-main">
          {APP_TITLE}
        </NextLink>
        {children}
      </Container>
    </header>
  );
}

type AppContentProps = React.PropsWithChildren<{
  className?: string;
}>;

export function AppContent({ className, children }: AppContentProps) {
  return (
    <Container
      as="main"
      maxWidth="xl"
      className={classNames('mt-app-header py-2 md:p-4', className)}
    >
      {children}
    </Container>
  );
}

export function AppFooter() {
  return (
    <footer className="flex h-16 items-center justify-between bg-background-main px-6 text-text-light">
      <p>
        {new Date().getFullYear()} © {APP_TITLE}
      </p>
      <ButtonLink
        aria-label="Check the Source Code on GitHub"
        icon={<GithubIcon />}
        href={APP_REPOSITORY_URL}
        isExternalUrl
      />
    </footer>
  );
}
