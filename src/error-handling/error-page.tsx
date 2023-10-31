import AppContent from '@/app-layout/app-content';
import AppFooter from '@/app-layout/app-footer';
import AppHeader from '@/app-layout/app-header';
import AppLayoutRoot from '@/app-layout/app-layout-root';
import Button from '@/common/button';

type ErrorPageProps = {
  statusCode: number;
  message: string;
};

export default function ErrorPage({ statusCode, message }: ErrorPageProps) {
  return (
    <AppLayoutRoot>
      <AppHeader />
      <AppContent className="grid place-items-center mb-12">
        <div className="grid gap-4 place-content-center">
          <h1 className="flex items-center">
            <span className="border-r-2 p-4 text-3xl font-bold text-text-lighter">
              {statusCode}
            </span>
            <span className="p-4 font-semibold text-lg text-text-light">
              {message}
            </span>
          </h1>
          <Button href="/">Back to Home</Button>
        </div>
      </AppContent>
      <AppFooter />
    </AppLayoutRoot>
  );
}
