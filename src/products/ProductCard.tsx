import NextLink from '@/routing/NextLink';
import BaseImage from '@/common/BaseImage';
import Price from '@/common/Price';
import { Product } from './ProductsTypes';
import { routes } from '@/routing/RoutingUtils';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <NextLink href={routes.product({ params: { productId: product.id } })}>
      <article className="flex flex-col gap-2 group border-2 p-2 md:p-4 rounded-md">
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
