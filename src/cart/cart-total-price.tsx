import Price from '@/common/price';
import { getCart } from './cart-fetchers';
import classNames from 'classnames';

type CartTotalPriceProps = {
  className?: string;
};

export default async function CartTotalPrice({
  className,
}: CartTotalPriceProps) {
  const cart = await getCart();

  if (!cart) {
    return null;
  }

  return (
    <div
      className={classNames(
        'flex justify-between text-lg font-bold',
        className,
      )}
    >
      <span>Total</span>
      <Price value={cart.totalPrice} />
    </div>
  );
}
