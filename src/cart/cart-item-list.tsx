import { Price } from '@/common/price';
import { List, ListItem } from '@/common/list';
import { CartIcon } from '@/common/icons';
import { NextLink } from '@/routing/next-link';
import { routes } from '@/routing/routing-utils';
import { CartItemActionButtons } from './cart-items-actions-buttons';
import { getCart } from './cart-fetchers';
import { twJoin } from 'tailwind-merge';

type CartItemListProps = {
  className?: string;
  isDense?: boolean;
};

export async function CartItemList({ className, isDense }: CartItemListProps) {
  const cart = await getCart();

  return (
    <List
      className={className}
      layout
      emptyMessage={
        <div className="grid place-items-center gap-2 p-8 text-secondary-main">
          <CartIcon size={80} />
          <div className="text-center text-xl font-semibold">
            Your cart is empty
          </div>
        </div>
      }
    >
      {cart?.cartItems.map((cartItem) => {
        const { product } = cartItem;

        return (
          <ListItem
            key={product.id}
            layout
            className={twJoin('border-b-2 p-6', isDense && 'px-4 py-3')}
          >
            <div className="flex gap-4">
              <NextLink
                href={routes.product({
                  params: { productId: product.id },
                })}
                className="line-clamp-3 flex-grow font-semibold"
              >
                {product.title}
              </NextLink>
              <div className="flex flex-col items-end">
                <Price
                  className="text-primary-dark"
                  value={product.price * cartItem.count}
                />
              </div>
            </div>
            <div className="mt-2">
              <CartItemActionButtons cartItem={cartItem} />
            </div>
          </ListItem>
        );
      })}
    </List>
  );
}
