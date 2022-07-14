import Price from '@src/common/Price';
import { useAppSelector } from '@src/store/store';
import { selectTotalPrice } from './cartSlice';

function CartTotalPrice() {
  const totalPrice = useAppSelector(selectTotalPrice);

  if (!totalPrice) {
    return null;
  }

  return (
    <div
      data-testid="cart-total-price"
      className="flex justify-space py-2 text-lg font-bold"
    >
      <span>Total</span>
      <div className="flex-grow" />
      <Price value={totalPrice} />
    </div>
  );
}

export default CartTotalPrice;
