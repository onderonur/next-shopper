import Button from '@src/common/Button';
import { useCartContext } from './CartContext';
import classNames from 'classnames';
import { Product } from '@src/products/ProductsTypes';

interface AddToCartButtonProps {
  className?: string;
  product: Product;
}

function AddToCartButton({ className, product }: AddToCartButtonProps) {
  const { addProduct } = useCartContext();

  return (
    <Button
      aria-label="Add to Cart"
      variant="primary"
      className={classNames('w-full', className)}
      onClick={() => addProduct(product)}
    >
      Add to Cart
    </Button>
  );
}

export default AddToCartButton;
