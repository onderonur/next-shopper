import Price from '@/common/Price';
import CartItemActionButtons from './CartItemActionButtons';
import List from '@/common/List';
import ListItem from '@/common/ListItem';
import { CartIcon } from '@/common/Icons';
import { useAppSelector } from '@/store/store';
import { selectCartItems } from './cartSlice';
import NextLink from '@/routing/NextLink';
import { routes } from '@/routing/RoutingUtils';

type CartItemListProps = {
  className?: string;
};

export default function CartItemList({ className }: CartItemListProps) {
  const cartItems = useAppSelector(selectCartItems);

  return (
    <List
      className={className}
      isAnimated
      emptyMessage={
        <div className="grid place-items-center gap-2 text-secondary-main">
          <CartIcon size={80} />
          <div className="text-xl font-semibold">Your cart is empty</div>
        </div>
      }
    >
      {cartItems.map((cartItem) => {
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
