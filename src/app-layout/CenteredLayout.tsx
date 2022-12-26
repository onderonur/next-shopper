import AppContent from '@src/app-layout/AppContent';
import AppFooter from '@src/app-layout/AppFooter';
import AppHeader from '@src/app-layout/AppHeader';
import AppLayoutRoot from '@src/app-layout/AppLayoutRoot';

type AppLayoutProps = React.PropsWithChildren;

export default function CenteredLayout({ children }: AppLayoutProps) {
  return (
    <AppLayoutRoot>
      <AppHeader />
      <AppContent className="justify-center align-center mb-12">
        {children}
      </AppContent>
      <AppFooter />
    </AppLayoutRoot>
  );
}
