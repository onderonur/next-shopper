import AddProductToCartButton from '@/cart/add-to-cart-button';
import BaseImage from '@/common/base-image';
import Chip from '@/common/chip';
import Price from '@/common/price';
import NextLink from '@/routing/next-link';
import { routes } from '@/routing/routing-utils';
import type { Product } from './product-types';

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
        <div className="text-center space-y-2">
          <div className="font-bold text-2xl">{product.title}</div>
          <div className="text-3xl">
            <Price className="text-primary-dark" value={product.price} />
          </div>
        </div>
        <AddProductToCartButton product={product} />
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
