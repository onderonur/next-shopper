import { SubmitButton } from '@/forms/submit-button';
import type { Product } from '@/products/product-types';
import { addProductToCart } from './cart-actions';

type AddProductToCartButtonProps = {
  className?: string;
  product: Product;
};

export function AddProductToCartButton({
  product,
}: AddProductToCartButtonProps) {
  const addProductToCartWithId = addProductToCart.bind(null, product.id);

  if (!product.id) return <h1>Aman breee</h1>;

  return (
    <form action={addProductToCartWithId} className="w-full max-w-xs">
      <SubmitButton variant="primary" className="w-full">
        Add to Cart
      </SubmitButton>
    </form>
  );
}
