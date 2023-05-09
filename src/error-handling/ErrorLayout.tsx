import AppContent from '@/app-layout/AppContent';
import AppFooter from '@/app-layout/AppFooter';
import AppHeader from '@/app-layout/AppHeader';
import AppLayoutRoot from '@/app-layout/AppLayoutRoot';

type ErrorLayoutProps = React.PropsWithChildren;

export default function ErrorLayout({ children }: ErrorLayoutProps) {
  return (
    <AppLayoutRoot>
      <AppHeader />
      <AppContent className="grid place-items-center mb-12">
        {children}
      </AppContent>
      <AppFooter />
    </AppLayoutRoot>
  );
}
