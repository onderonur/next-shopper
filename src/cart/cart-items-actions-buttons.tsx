import type { CartItem } from './cart-types';
import { DeleteIcon, MinusIcon, PlusIcon } from '@/common/icons';
import {
  addProductToCart,
  removeProductFromCart,
  decreaseProductInCart,
} from './cart-actions';
import SubmitButton from '@/forms/submit-button';

type CartItemActionButtonsProps = {
  cartItem: CartItem;
};

export default function CartItemActionButtons({
  cartItem,
}: CartItemActionButtonsProps) {
  const { product } = cartItem;
  const addProductToCartWithId = addProductToCart.bind(null, product.id);
  const decreaseProductInCartWithId = decreaseProductInCart.bind(
    null,
    product.id,
  );
  const removeProductFromCartWithId = removeProductFromCart.bind(
    null,
    product.id,
  );

  return (
    <div className="flex justify-between items-center">
      <form action={removeProductFromCartWithId}>
        <SubmitButton
          aria-label={`Remove "${product.title}" From Cart`}
          className="h-8 w-8 text-sm rounded-md"
          variant="secondary"
          icon={<DeleteIcon />}
        />
      </form>
      <div className="flex items-center">
        <form action={decreaseProductInCartWithId}>
          <SubmitButton
            aria-label={`Decrease "${product.title}" Count in Cart`}
            className="h-8 w-8 text-sm rounded-l-md rounded-r-none"
            variant="primary"
            icon={<MinusIcon />}
          />
        </form>
        <div className="select-none cursor-default h-8 w-8 text-sm border-2 grid place-items-center">
          {cartItem.count}
        </div>
        <form action={addProductToCartWithId}>
          <SubmitButton
            aria-label={`Increase "${product.title}" Count in cart`}
            className="h-8 w-8 text-sm rounded-r-md rounded-l-none"
            variant="primary"
            icon={<PlusIcon />}
          />
        </form>
      </div>
    </div>
  );
}
