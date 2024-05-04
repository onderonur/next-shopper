import type { Omit } from '@/common/common-types';
import { CartIcon } from '@/common/icons';
import { getCart } from './cart-fetchers';
import {
  CartItemListContent,
  type CartItemListContentProps,
} from './cart-item-list-content';

type CartItemListProps = Omit<CartItemListContentProps, 'cartItems'> & {
  className?: string;
};

export async function CartItemList({ className, isDense }: CartItemListProps) {
  const cart = await getCart();

  if (!cart?.totalCount) {
    return (
      <div className="grid place-items-center gap-2 p-8 text-muted-foreground">
        <CartIcon size="5rem" />
        <div className="text-center text-xl font-semibold">
          Your cart is empty
        </div>
      </div>
    );
  }

  return (
    <ul className={className}>
      <CartItemListContent isDense={isDense} cartItems={cart.cartItems} />
    </ul>
  );
}
