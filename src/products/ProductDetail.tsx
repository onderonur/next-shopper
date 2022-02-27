import BaseImage from '@src/common/BaseImage';
import Chip from '@src/common/Chip';
import NextLink from '@src/routing/NextLink';
import Price from '@src/common/Price';
import AddToCartButton from '@src/cart/AddToCartButton';
import { Product } from './ProductsTypes';
import { routes } from '@src/routing/routes';

interface ProductDetailProps {
  product: Product;
}

function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-6">
      <div className="flex-1">
        <BaseImage
          src={product.image}
          alt={`Image of ${product.title}`}
          height={10}
          width={10}
          objectFit="contain"
          layout="responsive"
          priority
        />
      </div>
      <div className="flex-1 flex flex-col items-center gap-4">
        <div className="text-center">
          <h1 className="font-bold text-2xl mb-1">{product.title}</h1>
          <div className="text-4xl">
            <Price className="text-primary-dark" value={product.price} />
          </div>
        </div>
        <AddToCartButton className="max-w-xs" product={product} />
        <p>{product.description}</p>
        <NextLink
          href={routes.search({ query: { category: product.category } })}
        >
          <Chip variant="secondary">{product.category}</Chip>
        </NextLink>
      </div>
    </div>
  );
}

export default ProductDetail;
