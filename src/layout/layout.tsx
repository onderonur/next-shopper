import type { ButtonLinkProps } from '@/common/button-link';
import { ButtonLink } from '@/common/button-link';
import { APP_REPOSITORY_URL, APP_TITLE } from '@/common/common-utils';
import { Container } from '@/common/container';
import { GithubIcon, HomeIcon, SearchIcon } from '@/common/icons';
import { NextLink } from '@/routing/next-link';
import { ThemeToggle } from '@/styles/theme-toggle';
import type { LucideIcon } from 'lucide-react';
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
    <header className="fixed z-10 h-app-header w-full border-b bg-background/75 backdrop-blur-md">
      <Container
        maxWidth="xl"
        className="flex h-full items-center justify-between px-4"
      >
        <NextLink href="/" className="text-2xl font-bold text-primary">
          {APP_TITLE}
        </NextLink>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {children}
        </div>
      </Container>
    </header>
  );
}

type LayoutContentProps = React.PropsWithChildren<{
  className?: string;
}>;

export function LayoutContent({ className, children }: LayoutContentProps) {
  return (
    <Container maxWidth="xl" className={twMerge('py-2 md:p-4', className)}>
      {children}
    </Container>
  );
}

type MobileNavButtonBaseProps = Pick<
  ButtonLinkProps,
  'variant' | 'className' | 'iconAlignment' | 'icon'
>;

export function getMobileNavButtonBaseProps({
  icon,
}: {
  icon: LucideIcon;
}): MobileNavButtonBaseProps {
  const Icon = icon;

  return {
    variant: 'transparent',
    className: 'w-full py-1 text-xs',
    iconAlignment: 'top',
    icon: <Icon size="1.65rem" />,
  };
}

const mobileNavLinks = [
  { href: '/', title: 'Home', icon: HomeIcon },
  { href: '/search', title: 'Search', icon: SearchIcon },
];

type LayoutFooterProps = React.PropsWithChildren;

export function LayoutFooter({ children }: LayoutFooterProps) {
  return (
    <footer className="pb-16 md:pb-0">
      <Container
        maxWidth="xl"
        className="flex items-center justify-between px-4 py-6"
      >
        <p className="text-muted-foreground">
          {new Date().getFullYear()} © {APP_TITLE}
        </p>
        <ButtonLink
          aria-label="Check the Source Code on GitHub"
          // TODO: GitHub icon is deprecated.
          // eslint-disable-next-line deprecation/deprecation
          icon={<GithubIcon />}
          href={APP_REPOSITORY_URL}
          isExternalUrl
        />
      </Container>
      <nav className="fixed bottom-0 z-10 w-full border-t bg-background p-1 md:hidden">
        <ul className="flex justify-center gap-1">
          {mobileNavLinks.map((link) => {
            return (
              <li key={link.href} className="w-1/4">
                <ButtonLink
                  href={link.href}
                  {...getMobileNavButtonBaseProps({ icon: link.icon })}
                >
                  {link.title}
                </ButtonLink>
              </li>
            );
          })}
          <li className="w-1/4">
            <div>{children}</div>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
