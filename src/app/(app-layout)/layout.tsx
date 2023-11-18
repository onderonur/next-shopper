import {
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  Layout,
} from '@/layout/layout';
import { CartDrawer } from '@/cart/cart-drawer';

type AppLayoutProps = React.PropsWithChildren;

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <Layout>
      <LayoutHeader>
        <CartDrawer />
      </LayoutHeader>
      <LayoutContent>{children}</LayoutContent>
      <LayoutFooter />
    </Layout>
  );
}
