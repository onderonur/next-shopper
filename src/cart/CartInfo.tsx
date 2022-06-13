import Badge from '@src/common/Badge';
import Button from '@src/common/Button';
import { useDrawer } from '@src/common/Drawer';
import { CartIcon } from '@src/common/Icons';
import Price from '@src/common/Price';
import CartDrawer from './CartDrawer';
import { cartSelectors, useCartStore } from './cartStore';

function CartInfo() {
  const totalPrice = useCartStore(cartSelectors.totalPrice);
  const productsCount = useCartStore(cartSelectors.productsCount);
  const { isOpen, open, close } = useDrawer();

  return (
    <>
      <Badge value={productsCount}>
        <Button
          aria-label="Open Cart Info"
          className="text-lg"
          icon={<CartIcon />}
          onClick={open}
        >
          <Price value={totalPrice} />
        </Button>
      </Badge>
      <CartDrawer isOpen={isOpen} onClose={close} />
    </>
  );
}

export default CartInfo;
