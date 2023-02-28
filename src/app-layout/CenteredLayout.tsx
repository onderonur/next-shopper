import AppContent from '@/app-layout/AppContent';
import AppFooter from '@/app-layout/AppFooter';
import AppHeader from '@/app-layout/AppHeader';
import AppLayoutRoot from '@/app-layout/AppLayoutRoot';

type AppLayoutProps = React.PropsWithChildren;

export default function CenteredLayout({ children }: AppLayoutProps) {
  return (
    <AppLayoutRoot className="grid-rows-[1fr_auto]">
      <AppHeader />
      <AppContent className="grid place-items-center mb-12">
        {children}
      </AppContent>
      <AppFooter />
    </AppLayoutRoot>
  );
}
