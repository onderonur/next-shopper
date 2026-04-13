import { ProductCarouselSkeleton } from '@/features/products/components/product-carousel';

export default function RelatedProductsLoading() {
  return <ProductCarouselSkeleton itemCount={6} />;
}
