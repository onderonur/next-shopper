import { routes } from '@/core/routing/utils';
import { Badge } from '@/core/ui/components/badge';
import { ButtonLink } from '@/core/ui/components/button-link';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerTrigger,
} from '@/core/ui/components/drawer';
import { Separator } from '@/core/ui/components/separator';
import { TotalPrice } from '@/core/ui/components/total-price';
import { CartItemList } from '@/features/cart/components/cart-item-list';
import { ClearCartButton } from '@/features/cart/components/clear-cart-button';
import { getCart } from '@/features/cart/data';

type CartDrawerProps = {
  trigger: React.ReactNode;
};

export async function CartDrawer({ trigger }: CartDrawerProps) {
  const cart = await getCart();

  return (
    <Drawer
      from="right"
      closeOnRouteChange
      trigger={
        <Badge value={cart?.totalCount}>
          <DrawerTrigger asChild>{trigger}</DrawerTrigger>
        </Badge>
      }
    >
      <DrawerHeader>
        <h2>Cart</h2>
      </DrawerHeader>
      <DrawerBody className="flex flex-col overflow-auto p-0">
        <div className="p-2">
          <ClearCartButton cart={cart} />
        </div>
        <CartItemList className="grow overflow-y-auto" cart={cart} />
        <Separator />
        {cart && (
          <div className="flex flex-col gap-3 p-4">
            <TotalPrice value={cart.totalPrice} />
            <ButtonLink
              href={routes.checkout()}
              variant="primary"
              className="w-full"
            >
              Proceed to Checkout
            </ButtonLink>
          </div>
        )}
      </DrawerBody>
    </Drawer>
  );
}
