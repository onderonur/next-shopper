import { routes } from '@/core/routing/routing.utils';
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
import { getCart } from '@/features/cart/cart.data';
import { CartItemList } from '@/features/cart/components/cart-item-list';
import { ClearCartButton } from '@/features/cart/components/clear-cart-button';

type CartDrawerProps = {
  trigger: React.ReactNode;
};

export async function CartDrawer({ trigger }: CartDrawerProps) {
  const cart = await getCart();

  return (
    <Drawer
      from="right"
      closeOnPathnameChange
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
        <CartItemList className="flex-grow overflow-y-auto" />
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
