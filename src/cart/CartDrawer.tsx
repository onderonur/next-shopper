import Button from '@/common/Button';
import Drawer, { DrawerProps } from '@/common/Drawer';
import { routes } from '@/routing/RoutingUtils';
import { useAppSelector } from '@/store/store';
import CartItemList from './CartItemList';
import { selectCartItems } from './cartSlice';
import CartTotalPrice from './CartTotalPrice';
import ClearCartButton from './ClearCartButton';

type CartDrawerProps = Pick<DrawerProps, 'isOpen' | 'onClose'>;

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const cartItems = useAppSelector(selectCartItems);

  return (
    <Drawer from="right" isOpen={isOpen} title="Cart" onClose={onClose}>
      <div className="absolute inset-0 flex flex-col">
        <ClearCartButton />
        <CartItemList className="flex-grow overflow-y-auto" />
        <CartTotalPrice />
        {!!cartItems.length && (
          <Button href={routes.checkout()} variant="primary" className="my-2">
            Proceed to Checkout
          </Button>
        )}
      </div>
    </Drawer>
  );
}
