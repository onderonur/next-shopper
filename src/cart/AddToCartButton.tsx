import Button from '@src/common/Button';
import { Product } from '@src/products/ProductsTypes';
import { cartSelectors, useCartStore } from './cartStore';

interface AddToCartButtonProps {
  className?: string;
  product: Product;
}

function AddToCartButton({ className, product }: AddToCartButtonProps) {
  const addProduct = useCartStore(cartSelectors.addProduct);

  return (
    <Button
      variant="primary"
      isFullWidth
      className={className}
      onClick={() => addProduct(product)}
    >
      Add to Cart
    </Button>
  );
}

export default AddToCartButton;
