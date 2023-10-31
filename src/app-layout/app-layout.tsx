import AppContent from '@/app-layout/app-content';
import AppFooter from '@/app-layout/app-footer';
import AppHeader from '@/app-layout/app-header';
import AppLayoutRoot from '@/app-layout/app-layout-root';
import CartDrawer from '@/cart/cart-drawer';

type AppLayoutProps = React.PropsWithChildren;

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppLayoutRoot>
      <AppHeader>
        <CartDrawer />
      </AppHeader>
      <AppContent>{children}</AppContent>
      <AppFooter />
    </AppLayoutRoot>
  );
}
