import { routes } from '@/core/routing/utils';
import { getMetadata } from '@/core/seo/utils';
import { ProductDetails } from '@/features/products/components/product-details';
import { preloadRelatedProducts } from '@/features/products/components/related-products';
import { getOneProductById } from '@/features/products/data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata(
  props: PageProps<'/products/[productId]'>,
): Promise<Metadata> {
  const { productId } = await props.params;

  const product = await getOneProductById(productId);
  if (!product) notFound();

  return getMetadata({
    title: product.title,
    description: product.description,
    pathname: routes.product({ productId }),
    images: [{ url: product.image, alt: product.title }],
  });
}

export default async function ProductPage(
  props: PageProps<'/products/[productId]'>,
) {
  const { productId } = await props.params;

  preloadRelatedProducts(productId);

  const product = await getOneProductById(productId);
  if (!product) notFound();

  return <ProductDetails product={product} />;
}
