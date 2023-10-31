import Price from '@/common/price';
import List from '@/common/list';
import ListItem from '@/common/list-item';
import { CartIcon } from '@/common/icons';
import NextLink from '@/routing/next-link';
import { routes } from '@/routing/routing-utils';
import CartItemActionButtons from './cart-items-actions-buttons';
import { getCart } from './cart-fetchers';
import classNames from 'classnames';

type CartItemListProps = {
  className?: string;
};

export default async function CartItemList({ className }: CartItemListProps) {
  const cart = await getCart();

  return (
    <List
      className={classNames(className, 'px-1')}
      isAnimated
      emptyMessage={
        <div className="grid place-items-center gap-2 text-secondary-main">
          <CartIcon size={80} />
          <div className="text-xl font-semibold">Your cart is empty</div>
        </div>
      }
    >
      {cart?.cartItems.map((cartItem) => {
        const { product } = cartItem;

        return (
          <ListItem key={product.id} className="border-b-2 py-2">
            <div className="flex gap-4">
              <NextLink
                href={routes.product({
                  params: { productId: product.id },
                })}
                className="flex-grow font-semibold"
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
