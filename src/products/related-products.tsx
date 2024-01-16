import type { Id } from '@/common/common-types';
import { getRelatedProducts } from './product-fetchers';
import { ProductGrid } from './product-grid';

type RelatedProductsProps = {
  productId: Id;
};

export async function RelatedProducts({ productId }: RelatedProductsProps) {
  const relatedProducts = await getRelatedProducts(productId);

  return <ProductGrid products={relatedProducts} />;
}
