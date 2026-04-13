import { ProductCarousel } from '@/features/products/components/product-carousel';
import { getRelatedProducts } from '@/features/products/data';

export default async function RelatedProductsPage(
  props: PageProps<'/products/[productId]'>,
) {
  const { productId } = await props.params;
  const relatedProducts = await getRelatedProducts(productId);
  return <ProductCarousel products={relatedProducts} />;
}
