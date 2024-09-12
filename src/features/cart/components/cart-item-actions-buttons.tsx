import { SubmitButton } from '@/core/forms/components/submit-button';
import { DeleteIcon, MinusIcon, PlusIcon } from '@/core/ui/components/icons';
import {
  addProductToCart,
  decreaseProductInCart,
  removeProductFromCart,
} from '@/features/cart/cart.actions';
import type { ProductsOnCartsWithProduct } from '@/features/cart/cart.types';

type CartItemActionButtonsProps = {
  cartItem: ProductsOnCartsWithProduct;
};

export function CartItemActionButtons({
  cartItem,
}: CartItemActionButtonsProps) {
  const { product, count } = cartItem;
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
          icon={<DeleteIcon />}
        />
      </form>
      <div className="flex items-center">
        <form action={decreaseProductInCartWithId}>
          <SubmitButton
            aria-label={`Decrease "${product.title}" Count in Cart`}
            className="h-8 w-8 rounded-l-md rounded-r-none text-sm"
            variant="primary"
            icon={<MinusIcon />}
          />
        </form>
        <div className="grid h-8 w-8 cursor-default select-none place-items-center border-2 text-sm">
          {count}
        </div>
        <form action={addProductToCartWithId}>
          <SubmitButton
            aria-label={`Increase "${product.title}" Count in cart`}
            className="h-8 w-8 rounded-l-none rounded-r-md text-sm"
            variant="primary"
            icon={<PlusIcon />}
          />
        </form>
      </div>
    </div>
  );
}
