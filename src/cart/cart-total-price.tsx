import { Price } from '@/common/price';
import { twMerge } from 'tailwind-merge';
import { getCart } from './cart-fetchers';

type CartTotalPriceProps = {
  className?: string;
};

export async function CartTotalPrice({ className }: CartTotalPriceProps) {
  const cart = await getCart();

  if (!cart) return null;

  return (
    <div
      className={twMerge('flex justify-between text-lg font-bold', className)}
    >
      <span>Total</span>
      <Price value={cart.totalPrice} />
    </div>
  );
}
