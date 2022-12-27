import { useSearchParams } from 'next/navigation';
import { ProductFilterArgs } from './ProductsTypes';
import { ProductFilterKey } from './ProductsUtils';

export function useProductFilterArgs() {
  const searchParams = useSearchParams();

  const query: ProductFilterArgs = {};
  query.sorting = searchParams.get(ProductFilterKey.SORTING) ?? undefined;
  query.categories = searchParams.getAll(ProductFilterKey.CATEGORIES);
  query.priceRanges = searchParams.getAll(ProductFilterKey.PRICE_RANGES);

  return query;
}
