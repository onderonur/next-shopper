import BaseImage from '@src/common/BaseImage';
import Chip from '@src/common/Chip';
import NextLink from '@src/routing/NextLink';
import Price from '@src/common/Price';
import AddToCartButton from '@src/cart/AddToCartButton';
import { Product } from './ProductsTypes';
import div from '@src/common/Container';
import { routes } from '@src/routing/routes';

interface ProductDetailProps {
  product: Product;
}

function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="sm:flex gap-6">
      <div className="flex-1">
        <BaseImage
          src={product.image}
          alt={`Image of ${product.title}`}
          height={10}
          width={10}
          objectFit="contain"
          layout="responsive"
        />
      </div>
      <div className="flex-1">
        <h1 className="font-bold text-2xl text-center">{product.title}</h1>
        <div className="text-5xl my-4 text-center">
          <Price className="text-primary-dark" value={product.price} />
        </div>
        <AddToCartButton product={product} />
        <p className="my-6">{product.description}</p>
        <div className="my-4 text-center mx-auto max-w-xs">
          <NextLink
            href={routes.search({ query: { category: product.category } })}
          >
            <Chip variant="secondary">{product.category}</Chip>
          </NextLink>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
