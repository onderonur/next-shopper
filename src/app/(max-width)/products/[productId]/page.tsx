import { routes } from '@/core/routing/utils';
import { getMetadata } from '@/core/seo/utils';
import { PageTitle } from '@/core/ui/components/page-title';
import { ProductInfo } from '@/features/products/components/product-info';
import {
  preloadRelatedProducts,
  RelatedProducts,
  RelatedProductsSkeleton,
} from '@/features/products/components/related-products';
import { getOneProductById } from '@/features/products/data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ProductShell } from './shell';

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

  return (
    <ProductShell
      title={<PageTitle title={product.title} />}
      productInfo={<ProductInfo product={product} />}
      relatedProducts={
        <Suspense fallback={<RelatedProductsSkeleton />}>
          <RelatedProducts productId={product.id} />
        </Suspense>
      }
    />
  );
}
