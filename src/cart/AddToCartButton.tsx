'use client';

import Button from '@/common/Button';
import { Product } from '@/products/ProductsTypes';
import { useAppDispatch } from '@/store/store';
import { addProduct } from './cartSlice';

type AddToCartButtonProps = {
  className?: string;
  product: Product;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const dispatch = useAppDispatch();

  return (
    <Button
      variant="primary"
      className="w-full max-w-xs"
      onClick={() => dispatch(addProduct(product))}
    >
      Add to Cart
    </Button>
  );
}
