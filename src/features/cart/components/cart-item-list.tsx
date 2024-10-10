import type { Omit } from '@/core/shared/shared.types';
import { CartIcon } from '@/core/ui/components/icons';
import { getCart } from '@/features/cart/cart.data';
import {
  CartItemListContent,
  type CartItemListContentProps,
} from '@/features/cart/components/cart-item-list-content';

type CartItemListProps = Omit<CartItemListContentProps, 'cartItems'> & {
  className?: string;
};

export async function CartItemList({ className }: CartItemListProps) {
  const cart = await getCart();

  if (!cart?.totalCount) {
    return (
      <div className="grid place-items-center gap-2 p-8 text-muted-foreground">
        <CartIcon className="text-7xl" />
        <div className="text-center text-xl font-semibold">
          Your cart is empty
        </div>
      </div>
    );
  }

  return (
    <ul className={className}>
      <CartItemListContent cartItems={cart.cart} />
    </ul>
  );
}
