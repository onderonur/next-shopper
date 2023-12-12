import { ProductGrid } from './product-grid';
import { getRelatedProducts } from './product-fetchers';
import type { Id } from '@/common/common-types';

type RelatedProductsProps = {
  productId: Id;
};

export async function RelatedProducts({ productId }: RelatedProductsProps) {
  const relatedProducts = await getRelatedProducts(productId);

  return <ProductGrid products={relatedProducts} />;
}
