import ProductCard from '@src/products/ProductCard';
import ListItem from '@src/common/ListItem';
import { FilterProductsArgs } from '@src/products/ProductsTypes';
import { productsService } from '@src/products/productsService';

type SearchResultsProps = {
  filterArgs: FilterProductsArgs;
};

export default async function SearchResults({
  filterArgs,
}: SearchResultsProps) {
  const data = await productsService.filterProducts(filterArgs);

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
