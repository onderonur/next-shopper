import { PageTitleSkeleton } from '@/core/ui/components/page-title';
import { ProductInfoSkeleton } from '@/features/products/components/product-info';
import { RelatedProductsSkeleton } from '@/features/products/components/related-products';
import { ProductShell } from './shell';

export default function ProductLoading() {
  return (
    <ProductShell
      title={<PageTitleSkeleton />}
      productInfo={<ProductInfoSkeleton />}
      relatedProducts={<RelatedProductsSkeleton />}
    />
  );
}
