import { CartDrawer } from '@/cart/cart-drawer';
import { LayoutContent, LayoutHeader } from '@/layout/layout';

type AppLayoutProps = React.PropsWithChildren;

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <LayoutHeader>
        <div className="hidden md:block">
          <CartDrawer />
        </div>
      </LayoutHeader>
      <LayoutContent>{children}</LayoutContent>
    </>
  );
}
