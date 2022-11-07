'use client';

import Button from '@src/common/Button';
import { Product } from '@src/products/ProductsTypes';
import { useAppDispatch } from '@src/store/store';
import { addProduct } from './cartSlice';

interface AddToCartButtonProps {
  className?: string;
  product: Product;
}

function AddToCartButton({ className, product }: AddToCartButtonProps) {
  const dispatch = useAppDispatch();

  return (
    <Button
      variant="primary"
      isFullWidth
      className={className}
      onClick={() => dispatch(addProduct(product))}
    >
      Add to Cart
    </Button>
  );
}

export default AddToCartButton;
