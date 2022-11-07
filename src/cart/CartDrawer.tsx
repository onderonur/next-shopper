import Button from '@src/common/Button';
import Drawer, { DrawerProps } from '@src/common/Drawer';
import { routes } from '@src/routing/routes';
import { useOnPathnameChange } from '@src/routing/useOnPathnameChange';
import { useAppSelector } from '@src/store/store';
import CartItemList from './CartItemList';
import { selectCartItems } from './cartSlice';
import CartTotalPrice from './CartTotalPrice';
import ClearCartButton from './ClearCartButton';

type CartDrawerProps = Pick<DrawerProps, 'isOpen' | 'onClose'>;

function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const cartItems = useAppSelector(selectCartItems);

  useOnPathnameChange(() => {
    onClose();
  });

  return (
    <Drawer from="right" isOpen={isOpen} title="Cart" onClose={onClose}>
      <div className="absolute inset-0 flex flex-col">
        <ClearCartButton />
        <CartItemList className="flex-grow overflow-y-auto" />
        <CartTotalPrice />
        {cartItems.length > 0 && (
          <Button href={routes.checkout()} variant="primary" className="my-2">
            Proceed to Checkout
          </Button>
        )}
      </div>
    </Drawer>
  );
}

export default CartDrawer;
