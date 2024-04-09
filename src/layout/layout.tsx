import { ButtonLink } from '@/common/button-link';
import { APP_REPOSITORY_URL, APP_TITLE } from '@/common/common-utils';
import { Container } from '@/common/container';
import { CheckoutIcon, GithubIcon, HomeIcon, SearchIcon } from '@/common/icons';
import { NextLink } from '@/routing/next-link';
import { twMerge } from 'tailwind-merge';

type LayoutProps = React.PropsWithChildren;

export function Layout({ children }: LayoutProps) {
  return (
    <div className="grid min-h-screen grid-rows-[1fr_auto]">{children}</div>
  );
}

type LayoutHeaderProps = React.PropsWithChildren;

export function LayoutHeader({ children }: LayoutHeaderProps) {
  return (
    <header className="fixed z-10 h-app-header w-full bg-background-main shadow-sm">
      <Container
        maxWidth="xl"
        className="flex h-full items-center justify-between px-4"
      >
        <NextLink href="/" className="text-2xl font-bold text-primary-main">
          {APP_TITLE}
        </NextLink>
        {children}
      </Container>
    </header>
  );
}

type LayoutContentProps = React.PropsWithChildren<{
  className?: string;
}>;

export function LayoutContent({ className, children }: LayoutContentProps) {
  return (
    <Container
      maxWidth="xl"
      className={twMerge('mt-app-header py-2 md:p-4', className)}
    >
      {children}
    </Container>
  );
}

const mobileNavLinks = [
  { href: '/', title: 'Home', icon: HomeIcon },
  { href: '/search', title: 'Search', icon: SearchIcon },
  { href: '/checkout', title: 'Checkout', icon: CheckoutIcon },
];

function MobileNav() {
  return (
    <nav className="fixed bottom-0 z-10 w-full border-t bg-background-main p-0.5 md:hidden">
      <ul className="flex justify-center gap-1">
        {mobileNavLinks.map((link) => {
          return (
            <li key={link.href} className="w-1/4">
              <ButtonLink
                href={link.href}
                variant="transparent"
                className="w-full py-1 text-xs"
                icon={<link.icon size="1.65rem" />}
                iconAlignment="top"
              >
                {link.title}
              </ButtonLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function LayoutFooter() {
  return (
    <footer className="bg-background-main pb-16 text-text-light md:pb-0">
      <Container
        maxWidth="xl"
        className="flex items-center justify-between px-4 py-6"
      >
        <p>
          {new Date().getFullYear()} © {APP_TITLE}
        </p>
        <ButtonLink
          aria-label="Check the Source Code on GitHub"
          icon={<GithubIcon />}
          href={APP_REPOSITORY_URL}
          isExternalUrl
        />
      </Container>
      <MobileNav />
    </footer>
  );
}
