import AddToCartButton from '@/cart/AddToCartButton';
import BaseImage, { imageProps } from '@/common/BaseImage';
import Chip from '@/common/Chip';
import PageTitle from '@/common/PageTitle';
import Paper from '@/common/Paper';
import Price from '@/common/Price';
import { productsService } from '@/products/productsService';
import NextLink from '@/routing/NextLink';
import { routes } from '@/routing/RoutingUtils';
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
        <div className="grid md:grid-cols-2 gap-6">
          <BaseImage
            className="max-w-lg mx-auto"
            src={product.image}
            alt={product.title}
            priority
            {...imageProps.responsive({
              aspectRatio: '1',
              objectFit: 'contain',
            })}
          />
          <div className="flex flex-col items-center gap-4">
            <div className="text-center flex flex-col gap-2">
              <div className="font-bold text-2xl">{product.title}</div>
              <div className="text-3xl">
                <Price className="text-primary-dark" value={product.price} />
              </div>
            </div>
            <AddToCartButton product={product} />
            <p className="text-sm">{product.description}</p>
            <NextLink
              href={routes.search({
                query: { categories: [product.category.value] },
              })}
            >
              <Chip variant="secondary">{product.category.title}</Chip>
            </NextLink>
          </div>
        </div>
      </Paper>
    </>
  );
}
