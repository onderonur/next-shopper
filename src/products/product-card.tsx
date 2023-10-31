import NextLink from '@/routing/next-link';
import BaseImage from '@/common/base-image';
import Price from '@/common/price';
import { Product } from './product-types';
import { routes } from '@/routing/routing-utils';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <NextLink href={routes.product({ params: { productId: product.id } })}>
      <article className="space-y-2 group border-2 p-2 md:p-4 rounded-md">
        <div className="p-2">
          <div className="relative aspect-[12/10] transition duration-500 ease-out bg-transparent transform group-hover:scale-110">
            <BaseImage
              className="object-contain"
              src={product.image}
              alt={product.title}
              fill
            />
          </div>
        </div>
        <div className="text-center">
          <div>
            <Price className="text-primary-dark" value={product.price} />
          </div>
          <h3 className="font-bold text-sm break-words">{product.title}</h3>
        </div>
      </article>
    </NextLink>
  );
}
