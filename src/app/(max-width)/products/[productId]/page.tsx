import { routes } from '@/core/routing/utils';
import { getMetadata } from '@/core/seo/utils';
import { Card, CardContent } from '@/core/ui/components/card';
import { PageTitle } from '@/core/ui/components/page-title';
import { Section, SectionTitle } from '@/core/ui/components/section';
import { ProductCarouselSkeleton } from '@/features/products/components/product-carousel';
import { ProductInfo } from '@/features/products/components/product-info';
import {
  preloadRelatedProducts,
  RelatedProducts,
} from '@/features/products/components/related-products';
import { getOneProductById } from '@/features/products/data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

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
    <div className="flex flex-col gap-4">
      <main>
        <PageTitle title={product.title} />
        <Card>
          <CardContent>
            <ProductInfo product={product} />
          </CardContent>
        </Card>
      </main>
      <Section asChild>
        <aside>
          <SectionTitle asChild>
            <h2>Related Products</h2>
          </SectionTitle>
          <Suspense fallback={<ProductCarouselSkeleton itemCount={6} />}>
            <RelatedProducts productId={productId} />
          </Suspense>
        </aside>
      </Section>
    </div>
  );
}
