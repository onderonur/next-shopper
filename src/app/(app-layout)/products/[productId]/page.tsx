import PageTitle from '@/common/PageTitle';
import Paper from '@/common/Paper';
import ProductDetails from '@/products/ProductDetails';
import { productsService } from '@/products/productsService';
import { getMetadata } from '@/seo/SeoUtils';
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
  const product = await productsService.getOneProductById(
    Number(params.productId),
  );

  if (!product) {
    return getMetadata();
  }

  return getMetadata({
    title: product.title,
    description: product.description,
    images: [{ url: product.image, alt: product.title }],
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await productsService.getOneProductById(
    Number(params.productId),
  );

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
