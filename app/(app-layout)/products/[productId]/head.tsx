import { productsService } from '@src/products/productsService';
import BaseSeo from '@src/seo/BaseSeo';
import { ProductPageProps } from './page';

export default async function ProductHead({ params }: ProductPageProps) {
  const product = await productsService.getOneProductById(
    Number(params.productId),
  );

  if (!product) {
    return null;
  }

  return (
    <BaseSeo
      title={product.title}
      description={product.description}
      images={[{ url: product.image, alt: product.title }]}
    />
  );
}
