import Button from '@src/common/Button';
import { routes } from '@src/routing/routes';
import { useAppSelector } from '@src/store/store';
import CartItemList from './CartItemList';
import { selectCartItems } from './cartSlice';
import CartTotalPrice from './CartTotalPrice';
import ClearCartButton from './ClearCartButton';

function CartDrawerContent() {
  const cartItems = useAppSelector(selectCartItems);

  return (
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
  );
}

export default CartDrawerContent;
