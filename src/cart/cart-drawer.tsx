import Badge from '@/common/badge';
import { CartIcon } from '@/common/icons';
import Price from '@/common/price';
import { getCart } from './cart-fetchers';
import DrawerProvider from '@/common/drawer-context';
import DrawerButton from '@/common/drawer-button';
import Drawer from '@/common/drawer';
import CartTotalPrice from './cart-total-price';
import CartItemList from './cart-item-list';
import ClearCartButton from './clear-cart-button';
import CheckoutLink from '../checkout/checkout-linkt';

export default async function CartDrawer() {
  const cart = await getCart();

  return (
    <DrawerProvider>
      <Badge value={cart?.totalCount}>
        <DrawerButton aria-label="Open Cart Info" icon={<CartIcon />}>
          <Price value={cart?.totalPrice} />
        </DrawerButton>
      </Badge>
      <Drawer from="right" title="Cart">
        <div className="absolute inset-0 flex flex-col">
          <ClearCartButton cart={cart} />
          <CartItemList className="flex-grow overflow-y-auto" />
          <CartTotalPrice />
          <CheckoutLink />
        </div>
      </Drawer>
    </DrawerProvider>
  );
}
