import { LayoutContent, LayoutHeader } from '@/layout/layout';
import { CartDrawer } from '@/cart/cart-drawer';

type AppLayoutProps = React.PropsWithChildren;

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <LayoutHeader>
        <CartDrawer />
      </LayoutHeader>
      <LayoutContent>{children}</LayoutContent>
    </>
  );
}
