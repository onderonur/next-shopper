import PageTitle from '@/common/page-title';
import Paper from '@/common/paper';
import ProductDetails from '@/products/product-details';
import { getOneProductById } from '@/products/product-fetchers';
import { getMetadata } from '@/seo/seo-utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export type ProductPageProps = {
  params: {
    productId: string;
  };
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getOneProductById(Number(params.productId));

  if (!product) {
    notFound();
  }

  return getMetadata({
    title: product.title,
    description: product.description,
    pathname: `/products/${params.productId}`,
    images: [{ url: product.image, alt: product.title }],
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getOneProductById(Number(params.productId));

  if (!product) {
    notFound();
  }

  return (
    <>
      <PageTitle title={product.title} />
      <Paper>
        <ProductDetails product={product} />
      </Paper>
    </>
  );
}
