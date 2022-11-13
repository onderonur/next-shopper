import Price from '@src/common/Price';
import { useAppSelector } from '@src/store/store';
import { selectTotalPrice } from './cartSlice';

export default function CartTotalPrice() {
  const totalPrice = useAppSelector(selectTotalPrice);

  if (!totalPrice) {
    return null;
  }

  return (
    <div className="flex justify-between py-2 text-lg font-bold">
      <span>Total</span>
      <Price value={totalPrice} />
    </div>
  );
}
