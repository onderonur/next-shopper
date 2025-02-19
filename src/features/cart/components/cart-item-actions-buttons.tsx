import { SubmitButton } from '@/core/forms/components/submit-button';
import { AnimatedNumber } from '@/core/ui/components/animated-number';
import { DeleteIcon, MinusIcon, PlusIcon } from '@/core/ui/components/icons';
import {
  addProductToCart,
  decreaseProductInCart,
  removeProductFromCart,
} from '@/features/cart/actions';
import type { ProductsOnCartsWithProduct } from '@/features/cart/types';
import Form from 'next/form';

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
      <Form action={removeProductFromCartWithId}>
        <SubmitButton
          size="icon"
          aria-label={`Remove "${product.title}" From Cart`}
          className="size-8 rounded-md text-sm"
        >
          <DeleteIcon />
        </SubmitButton>
      </Form>
      <div className="flex items-center">
        <Form action={decreaseProductInCartWithId}>
          <SubmitButton
            size="icon"
            aria-label={`Decrease "${product.title}" Count in Cart`}
            className="size-8 rounded-l-md rounded-r-none text-sm"
            variant="primary"
          >
            <MinusIcon />
          </SubmitButton>
        </Form>
        <div className="grid h-8 min-w-8 cursor-default place-items-center border-2 px-1 text-sm select-none">
          <AnimatedNumber value={count} />
        </div>
        <Form action={addProductToCartWithId}>
          <SubmitButton
            size="icon"
            aria-label={`Increase "${product.title}" Count in cart`}
            className="size-8 rounded-l-none rounded-r-md text-sm"
            variant="primary"
          >
            <PlusIcon />
          </SubmitButton>
        </Form>
      </div>
    </div>
  );
}
