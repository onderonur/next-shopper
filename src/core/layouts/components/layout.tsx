import { NextLink } from '@/core/routing/components/next-link';
import { APP_TITLE } from '@/core/shared/utils';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      {children}
    </div>
  );
}

type LayoutHeaderProps = {
  children: React.ReactNode;
};

export function LayoutHeader({ children }: LayoutHeaderProps) {
  return (
    <header className="sticky top-0 z-10 min-h-16 w-full border-b bg-background/75 backdrop-blur">
      <div className="mx-auto flex h-full max-w-screen-xl items-center justify-between px-4">
        <NextLink href="/" className="text-2xl font-bold text-primary">
          {APP_TITLE}
        </NextLink>
        <div className="flex items-center gap-2">{children}</div>
      </div>
    </header>
  );
}

type LayoutContentProps = {
  children: React.ReactNode;
};

export function LayoutContent({ children }: LayoutContentProps) {
  return (
    <div
      className={
        // Since `<Layout>` has `grid` style, components like carousels cause horizontal scroll to appear on `<body>`.
        // To prevent this, we use `min-width: 0` here.
        // https://defensivecss.dev/tip/grid-min-content-size/
        'min-w-0'
      }
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
