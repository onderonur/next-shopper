import { preload } from '@/core/data/utils';
import type { Id } from '@/core/shared/types';
import { getRelatedProducts } from '@/features/products/data';
import { ProductCarousel } from './product-carousel';

export const preloadRelatedProducts = preload(getRelatedProducts);

type RelatedProductsProps = {
  productId: Id;
};

export async function RelatedProducts({ productId }: RelatedProductsProps) {
  const relatedProducts = await getRelatedProducts(productId);

  return <ProductCarousel products={relatedProducts} />;
}
