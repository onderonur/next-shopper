import AddToCartButton from '@src/cart/AddToCartButton';
import BaseImage from '@src/common/BaseImage';
import Chip from '@src/common/Chip';
import { Id } from '@src/common/CommonTypes';
import PageHeader from '@src/common/PageHeader';
import Paper from '@src/common/Paper';
import Price from '@src/common/Price';
import { productsService } from '@src/products/productsService';
import NextLink from '@src/routing/NextLink';
import { routes } from '@src/routing/routes';
import { notFound } from 'next/navigation';

export type ProductPageProps = {
  params: {
    productId: Id;
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await productsService.getOneProductById(
    Number(params.productId),
  );

  if (!product) {
    notFound();
  }

  return (
    <>
      <PageHeader title={product.title} />
      <Paper>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1 relative aspect-square">
            <BaseImage
              src={product.image}
              alt={product.title}
              className="object-contain"
              fill
              priority
            />
          </div>
          <div className="flex-1 flex flex-col items-center gap-4">
            <div className="text-center flex flex-col gap-2">
              <div className="font-bold text-2xl">{product.title}</div>
              <div className="text-4xl">
                <Price className="text-primary-dark" value={product.price} />
              </div>
            </div>
            <AddToCartButton className="max-w-xs" product={product} />
            <p>{product.description}</p>
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
