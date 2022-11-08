import Price from '@src/common/Price';
import CartItemActionButtons from './CartItemActionButtons';
import List from '@src/common/List';
import ListItem from '@src/common/ListItem';
import { CartIcon } from '@src/common/Icons';
import { useAppSelector } from '@src/store/store';
import { selectCartItems } from './cartSlice';
import NextLink from '@src/routing/NextLink';
import { routes } from '@src/routing/routes';

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
        <div className="flex flex-col gap-2 justify-center items-center text-secondary-main">
          <CartIcon size={80} />
          <div className="text-xl font-semibold">Your cart is empty</div>
        </div>
      }
    >
      {cartItems.map((cartItem) => {
        return (
          <ListItem key={cartItem.info.id} className="border-b-2 py-2">
            <div className="flex gap-4">
              <NextLink
                href={routes.product({
                  params: { productId: cartItem.info.id },
                })}
                className="flex-grow font-semibold"
              >
                {cartItem.info.title}
              </NextLink>
              <div className="flex flex-col items-end">
                <Price
                  className="text-primary-dark"
                  value={cartItem.info.price * cartItem.count}
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
