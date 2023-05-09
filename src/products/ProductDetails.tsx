import AddToCartButton from '@/cart/AddToCartButton';
import BaseImage from '@/common/BaseImage';
import Chip from '@/common/Chip';
import Price from '@/common/Price';
import NextLink from '@/routing/NextLink';
import { routes } from '@/routing/RoutingUtils';
import { Product } from './ProductsTypes';

type ProductDetailsProps = {
  product: Product;
};

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="relative aspect-square w-full max-w-sm md:max-w-lg mx-auto">
        <BaseImage
          className="object-contain"
          src={product.image}
          alt={product.title}
          priority
          fill
        />
      </div>
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
  );
}
