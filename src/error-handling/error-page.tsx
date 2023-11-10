'use client';

import AppContent from '@/app-layout/app-content';
import AppFooter from '@/app-layout/app-footer';
import AppHeader from '@/app-layout/app-header';
import AppLayoutRoot from '@/app-layout/app-layout-root';

type ErrorPageProps = React.PropsWithChildren<{
  statusCode: number;
  message: string;
}>;

export default function ErrorPage({
  statusCode,
  message,
  children,
}: ErrorPageProps) {
  return (
    <AppLayoutRoot>
      <AppHeader />
      <AppContent className="grid gap-4 place-content-center mb-12">
        <h1 className="flex items-center">
          <span className="border-r-2 p-4 text-3xl font-bold text-text-lighter">
            {statusCode}
          </span>
          <span className="p-4 font-semibold text-lg text-text-light">
            {message}
          </span>
        </h1>
        {children}
      </AppContent>
      <AppFooter />
    </AppLayoutRoot>
  );
}
