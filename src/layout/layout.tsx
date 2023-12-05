import { BackToTopButton } from './back-to-top-button';
import { Container } from '@/common/container';
import { ButtonLink } from '@/common/button-link';
import { APP_REPOSITORY_URL, APP_TITLE } from '@/common/common-utils';
import { GithubIcon } from '@/common/icons';
import { NextLink } from '@/routing/next-link';
import { twMerge } from 'tailwind-merge';

type LayoutProps = React.PropsWithChildren;

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="grid min-h-screen grid-rows-[1fr_auto]">{children}</div>
      <BackToTopButton />
    </>
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
      as="main"
      maxWidth="xl"
      className={twMerge('mt-app-header py-2 md:p-4', className)}
    >
      {children}
    </Container>
  );
}

export function LayoutFooter() {
  return (
    <footer className="bg-background-main text-text-light">
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
    </footer>
  );
}
