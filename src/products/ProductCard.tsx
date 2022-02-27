import AddToCartButton from '@src/cart/AddToCartButton';
import NextLink from '@src/routing/NextLink';
import BaseImage from '@src/common/BaseImage';
import Chip from '@src/common/Chip';
import Price from '@src/common/Price';
import { Product } from './ProductsTypes';
import { routes } from '@src/routing/routes';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="flex flex-col h-full group border-2 p-2 rounded-md">
      <div className="relative cursor-pointer">
        <NextLink href={routes.product({ params: { productId: product.id } })}>
          <div className="p-2 ">
            <div className="transition duration-500 ease-out bg-transparent p-2 transform group-hover:scale-110">
              <BaseImage
                src={product.image}
                alt={`Image of ${product.title}`}
                layout="responsive"
                height={12}
                width={10}
                objectFit="contain"
              />
            </div>
          </div>
        </NextLink>
      </div>
      <div className="mt-2 flex flex-col items-center">
        <div className="text-md">
          <Price className="text-primary-dark" value={product.price} />
        </div>
        <h2 className="font-bold text-sm flex-grow text-center">
          {product.title}
        </h2>
        <NextLink
          href={routes.search({ query: { category: product.category } })}
          className="mt-2"
        >
          <Chip variant="secondary">{product.category}</Chip>
        </NextLink>
      </div>
      <div className="flex-grow" />
      <div className="mt-4">
        <AddToCartButton product={product} />
      </div>
    </article>
  );
}

export default ProductCard;
