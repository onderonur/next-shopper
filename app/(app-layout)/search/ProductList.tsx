import ProductCard from '@src/products/ProductCard';
import ListItem from '@src/common/ListItem';
import { ProductFilterResponse } from '@src/products/ProductsTypes';

type ProductListProps = {
  _data: Promise<ProductFilterResponse>;
};

export default async function ProductList({ _data }: ProductListProps) {
  // TODO: Birden çok yerde kullanılıyor bu call. Ondan bunu cache'lemeye (dedup vs) bak.
  const data = await _data;

  return (
    <>
      {data.products.map((product) => {
        return (
          <ListItem key={product.id}>
            <ProductCard product={product} />
          </ListItem>
        );
      })}
    </>
  );
}
