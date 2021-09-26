import Price from '@src/common/Price';
import { useCartContext } from './CartContext';

function CartTotalPrice() {
  const { totalPrice } = useCartContext();

  if (!totalPrice) {
    return null;
  }

  return (
    <div className="flex justify-space py-2 text-lg font-bold">
      <span>Total</span>
      <div className="flex-grow" />
      <Price value={totalPrice} />
    </div>
  );
}

export default CartTotalPrice;
