import { DeleteIcon, MinusIcon, PlusIcon } from '@/common/icons';
import { SubmitButton } from '@/forms/submit-button';
import {
  addProductToCart,
  decreaseProductInCart,
  removeProductFromCart,
} from './cart-actions';
import type { CartItem } from './cart-types';

type CartItemActionButtonsProps = {
  cartItem: CartItem;
};

export function CartItemActionButtons({
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
    <div className="flex items-center justify-between">
      <form action={removeProductFromCartWithId}>
        <SubmitButton
          aria-label={`Remove "${product.title}" From Cart`}
          className="h-8 w-8 rounded-md text-sm"
          icon={<DeleteIcon size="1.2rem" />}
        />
      </form>
      <div className="flex items-center">
        <form action={decreaseProductInCartWithId}>
          <SubmitButton
            aria-label={`Decrease "${product.title}" Count in Cart`}
            className="h-8 w-8 rounded-l-md rounded-r-none text-sm"
            variant="primary"
            icon={<MinusIcon size="1.2rem" />}
          />
        </form>
        <div className="grid h-8 w-8 cursor-default select-none place-items-center border-2 text-sm">
          {cartItem.count}
        </div>
        <form action={addProductToCartWithId}>
          <SubmitButton
            aria-label={`Increase "${product.title}" Count in cart`}
            className="h-8 w-8 rounded-l-none rounded-r-md text-sm"
            variant="primary"
            icon={<PlusIcon size="1.2rem" />}
          />
        </form>
      </div>
    </div>
  );
}
