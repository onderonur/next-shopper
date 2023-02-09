import AppContent from '@src/app-layout/AppContent';
import AppFooter from '@src/app-layout/AppFooter';
import AppHeader from '@src/app-layout/AppHeader';
import AppLayoutRoot from '@src/app-layout/AppLayoutRoot';

type AppLayoutProps = React.PropsWithChildren;

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppLayoutRoot className="grid-rows-[1fr_auto]">
      <AppHeader />
      <AppContent>{children}</AppContent>
      <AppFooter />
    </AppLayoutRoot>
  );
}
