import AppContent from '@/app-layout/AppContent';
import AppFooter from '@/app-layout/AppFooter';
import AppHeader from '@/app-layout/AppHeader';
import AppLayoutRoot from '@/app-layout/AppLayoutRoot';

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
