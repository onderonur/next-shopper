import AppContent from './AppContent';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import AppLayoutRoot from './AppLayoutRoot';

type AppLayoutProps = React.PropsWithChildren<{}>;

function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppLayoutRoot>
      <AppHeader />
      <AppContent>{children}</AppContent>
      <AppFooter />
    </AppLayoutRoot>
  );
}

export default AppLayout;
