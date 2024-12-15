import { SubmitButton } from '@/core/forms/components/submit-button';
import type { Id } from '@/core/shared/types';
import { addProductToCart } from '@/features/cart/actions';
import Form from 'next/form';

type AddProductToCartButtonProps = {
  className?: string;
  productId: Id;
};

export function AddProductToCartButton({
  productId,
}: AddProductToCartButtonProps) {
  const addProductToCartWithId = addProductToCart.bind(null, productId);

  return (
    <Form action={addProductToCartWithId} className="w-full max-w-xs">
      <SubmitButton variant="primary" className="w-full">
        Add to Cart
      </SubmitButton>
    </Form>
  );
}
