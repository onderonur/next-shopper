import type { Id } from '@/core/shared/types';
import { getRelatedProducts } from '@/features/products/data';
import { ProductCarousel } from './product-carousel';

type RelatedProductsProps = {
  productId: Id;
};

export async function RelatedProducts({ productId }: RelatedProductsProps) {
  const relatedProducts = await getRelatedProducts(productId);

  return <ProductCarousel products={relatedProducts} />;
}
