import { NextLink } from '@/core/routing/components/next-link';
import { APP_TITLE } from '@/core/shared/shared.utils';
import { Container } from '@/core/ui/components/container';
import { twMerge } from 'tailwind-merge';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="grid min-h-screen grid-rows-[1fr_auto]">{children}</div>
  );
}

type LayoutHeaderProps = {
  children: React.ReactNode;
};

export function LayoutHeader({ children }: LayoutHeaderProps) {
  return (
    <header className="fixed z-10 h-app-header w-full border-b bg-background/75 backdrop-blur">
      <Container
        maxWidth="xl"
        className="flex h-full items-center justify-between px-4"
      >
        <NextLink href="/" className="text-2xl font-bold text-primary">
          {APP_TITLE}
        </NextLink>
        <div className="flex items-center gap-2">{children}</div>
      </Container>
    </header>
  );
}

type LayoutContentProps = {
  children: React.ReactNode;
};

export function LayoutContent({ children }: LayoutContentProps) {
  return (
    <div
      className={twMerge(
        'mt-app-header',
        // Since `<Layout>` has `grid` style, components like carousels cause horizontal scroll to appear on `<body>`.
        // To prevent this, we use `min-width: 0` here.
        // https://defensivecss.dev/tip/grid-min-content-size/
        'min-w-0',
      )}
    >
      {children}
    </div>
  );
}

type LayoutFooterProps = {
  children: React.ReactNode;
};

export function LayoutFooter({ children }: LayoutFooterProps) {
  return <footer className="pb-16 md:pb-0">{children}</footer>;
}
