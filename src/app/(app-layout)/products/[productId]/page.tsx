import { routes } from '@/core/routing/routing.utils';
import { getMetadata } from '@/core/seo/seo.utils';
import { Card, CardContent } from '@/core/ui/components/card';
import { PageTitle } from '@/core/ui/components/page-title';
import { Section, SectionTitle } from '@/core/ui/components/section';
import { ProductCarouselSkeleton } from '@/features/products/components/product-carousel';
import { ProductInfo } from '@/features/products/components/product-info';
import { RelatedProducts } from '@/features/products/components/related-products';
import { getOneProductById } from '@/features/products/products.data';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export type ProductPageProps = {
  params: {
    productId: string;
  };
};

export async function generateMetadata({
  params: { productId },
}: ProductPageProps): Promise<Metadata> {
  const product = await getOneProductById(productId);
  if (!product) notFound();

  return getMetadata({
    title: product.title,
    description: product.description,
    pathname: routes.product({ params: { productId } }),
    images: [{ url: product.image, alt: product.title }],
  });
}

export default async function ProductPage({
  params: { productId },
}: ProductPageProps) {
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
