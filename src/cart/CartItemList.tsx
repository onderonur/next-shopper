import Price from '@src/common/Price';
import { useCartContext } from './CartContext';
import CartItemActionButtons from './CartItemActionButtons';
import { CartIcon } from '@src/common/Icons';
import List from '@src/common/List';

interface CartItemListProps {
  className?: string;
}

function CartItemList({ className }: CartItemListProps) {
  const { cartItems } = useCartContext();

  return (
    <List
      className={className}
      getItemKey={(cartItem) => cartItem.info.id.toString()}
      emptyMessage={
        <div className="flex flex-col justify-center items-center text-secondary-main">
          <CartIcon size={80} />
          <div className="text-xl font-semibold mt-2">You cart is empty</div>
        </div>
      }
      items={cartItems}
      renderItem={(cartItem) => {
        return (
          <div key={cartItem.info.id} className="border-b-2 py-2">
            <div className="flex gap-4">
              <div className="flex-grow font-semibold">
                {cartItem.info.title}
              </div>
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
          </div>
        );
      }}
    />
  );
}

export default CartItemList;
