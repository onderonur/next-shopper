import Button from '@/common/Button';
import { CartItem } from './CartTypes';
import { DeleteIcon, MinusIcon, PlusIcon } from '@/common/Icons';
import { addProduct, removeCartItem, removeProduct } from './cartSlice';
import { useAppDispatch } from '@/store/store';

type CartItemActionButtonsProps = {
  cartItem: CartItem;
};

export default function CartItemActionButtons({
  cartItem,
}: CartItemActionButtonsProps) {
  const dispatch = useAppDispatch();
  const { product } = cartItem;

  return (
    <div className="flex justify-between items-center">
      <Button
        aria-label={`Remove "${product.title}" From Cart`}
        className="h-8 w-8 text-sm rounded-md"
        variant="secondary"
        icon={<DeleteIcon />}
        onClick={() => dispatch(removeCartItem(product))}
      />
      <div className="flex items-center">
        <Button
          aria-label={`Decrease "${product.title}" Count in Cart`}
          className="h-8 w-8 text-sm rounded-l-md rounded-r-none"
          variant="primary"
          icon={<MinusIcon />}
          onClick={() => dispatch(removeProduct(product))}
        />
        <div className="select-none cursor-default h-8 w-8 text-sm border-2 grid place-items-center">
          {cartItem.count}
        </div>
        <Button
          aria-label={`Increase "${product.title}" in cart`}
          className="h-8 w-8 text-sm rounded-r-md rounded-l-none"
          variant="primary"
          icon={<PlusIcon />}
          onClick={() => dispatch(addProduct(product))}
        />
      </div>
    </div>
  );
}
