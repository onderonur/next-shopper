import Badge from '@src/common/Badge';
import Button from '@src/common/Button';
import { useDrawer } from '@src/common/Drawer';
import { CartIcon } from '@src/common/Icons';
import Price from '@src/common/Price';
import { useCartContext } from './CartContext';
import CartDrawer from './CartDrawer';

function CartInfo() {
  const { totalPrice, productCount } = useCartContext();
  const { isOpen, open, close } = useDrawer();

  return (
    <>
      <Badge value={productCount}>
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
