import { productsService } from '@src/products/productsService';
import Title from '@src/seo/Title';
import { ProductPageProps } from './page';

export default async function ProductHead({ params }: ProductPageProps) {
  // TODO: Buna caching lazım
  const product = await productsService.getOneProductById(
    Number(params.productId),
  );

  if (!product) {
    return null;
  }

  return (
    <>
      <Title>{product.title}</Title>
      {/* TODO: Fix */}
      {/* <BaseSeo
        title={product?.title}
        description={product?.description}
        images={
          product?.image
            ? [
                {
                  url: product.image,
                  alt: product.title,
                },
              ]
            : undefined
        }
      /> */}
    </>
  );
}
