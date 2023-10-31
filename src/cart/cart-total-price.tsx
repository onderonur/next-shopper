import Price from '@/common/price';
import { getCart } from './cart-fetchers';

export default async function CartTotalPrice() {
  const cart = await getCart();

  if (!cart) {
    return null;
  }

  return (
    <div className="flex justify-between py-2 text-lg font-bold">
      <span>Total</span>
      <Price value={cart.totalPrice} />
    </div>
  );
}
