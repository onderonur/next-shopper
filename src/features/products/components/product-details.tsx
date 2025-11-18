import { Card, CardContent } from '@/core/ui/components/card';
import { PageTitle, PageTitleSkeleton } from '@/core/ui/components/page-title';
import { Section, SectionTitle } from '@/core/ui/components/section';
import { Suspense } from 'react';
import type { ProductDetailsData } from '../types';
import { ProductInfo, ProductInfoSkeleton } from './product-info';
import { RelatedProducts, RelatedProductsSkeleton } from './related-products';

type ProductDetailsShellProps = {
  title: React.ReactNode;
  productInfo: React.ReactNode;
  relatedProducts: React.ReactNode;
};

export function ProductDetailsShell({
  title,
  productInfo,
  relatedProducts,
}: ProductDetailsShellProps) {
  return (
    <div className="flex flex-col gap-4">
      <main>
        {title}
        <Card>
          <CardContent>{productInfo}</CardContent>
        </Card>
      </main>
      <Section asChild>
        <aside>
          <SectionTitle asChild>
            <h2>Related Products</h2>
          </SectionTitle>
          {relatedProducts}
        </aside>
      </Section>
    </div>
  );
}

type ProductDetailsProps = {
  product: ProductDetailsData;
};

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <ProductDetailsShell
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

export function ProductDetailsSkeleton() {
  return (
    <ProductDetailsShell
      title={<PageTitleSkeleton />}
      productInfo={<ProductInfoSkeleton />}
      relatedProducts={<RelatedProductsSkeleton />}
    />
  );
}
