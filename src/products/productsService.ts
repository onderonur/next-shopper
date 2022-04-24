import dbJson from '@src/db/db.json';
import createHttpError from 'http-errors';
import {
  getValuesOfSelectedOptions,
  ProductFilterKey,
  ProductSorting,
} from '@src/products/ProductsUtils';
import {
  FilterProductsArgs,
  GetOneProductByIdArgs,
  Product,
  ProductFilterOptions,
  ProductFilterResponse,
  ProductFilterSelectedOption,
} from './ProductsTypes';

function getProductFilterOptions() {
  const { sortings, categories, priceRanges } = dbJson;
  const filterOptions: ProductFilterOptions = {
    sortings: {
      title: 'Sorting',
      options: sortings,
      filterKey: ProductFilterKey.SORTING,
    },
    categories: {
      title: 'Categories',
      options: categories,
      filterKey: ProductFilterKey.CATEGORIES,
    },
    priceRanges: {
      title: 'Price',
      options: priceRanges,
      filterKey: ProductFilterKey.PRICE_RANGES,
    },
  };
  return filterOptions;
}

function getProductFilterSelectedOptions(args: FilterProductsArgs) {
  const { sortings, categories, priceRanges } = dbJson;
  const selectedOptions: ProductFilterSelectedOption[] = [];

  let isDefaultSortingApplied = false;
  let selectedSorting = sortings.find(
    (sorting) => sorting.value === args.sorting,
  );

  if (!selectedSorting) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    selectedSorting = sortings.find((sorting) => sorting.isDefault)!;
    isDefaultSortingApplied = true;
  }

  selectedOptions.push({
    value: selectedSorting.value,
    title: selectedSorting.title,
    isVisible: !isDefaultSortingApplied,
    filterKey: ProductFilterKey.SORTING,
  });

  selectedOptions.push(
    ...categories
      .filter((category) => args.categories?.includes(category.value))
      .map((category) => ({
        value: category.value,
        title: category.title,
        isVisible: true,
        filterKey: ProductFilterKey.CATEGORIES,
      })),
  );

  selectedOptions.push(
    ...priceRanges
      .filter((priceRange) => args.priceRanges?.includes(priceRange.value))
      .map((priceRange) => ({
        value: priceRange.value,
        title: priceRange.title,
        isVisible: true,
        filterKey: ProductFilterKey.PRICE_RANGES,
      })),
  );

  return selectedOptions;
}

function getManyProducts(args: FilterProductsArgs) {
  let response: Product[] = [...dbJson.products];

  if (args.categories?.length) {
    response = response.filter((product) =>
      args.categories?.includes(product.category.value),
    );
  }

  if (args.priceRanges?.length) {
    const productsInPriceRanges: Product[] = [];

    args.priceRanges.forEach((priceRange) => {
      const [minPriceText, maxPriceText] = priceRange.split('-');
      const minPrice = Number(minPriceText);
      const maxPrice = maxPriceText === 'max' ? Infinity : Number(maxPriceText);
      productsInPriceRanges.push(
        ...response.filter(
          (product) => product.price >= minPrice && product.price <= maxPrice,
        ),
      );
    });

    response = productsInPriceRanges;
  }

  if (args.sorting) {
    switch (args.sorting) {
      case ProductSorting.PRICE_ASC:
        response.sort((a, b) => a.price - b.price);
        break;
      case ProductSorting.PRICE_DESC:
        response.sort((a, b) => b.price - a.price);
        break;
    }
  }

  return response;
}

export const productsService = {
  filterProducts: (args: FilterProductsArgs): ProductFilterResponse => {
    const filterOptions = getProductFilterOptions();
    const selectedOptions = getProductFilterSelectedOptions(args);
    const products = getManyProducts(
      getValuesOfSelectedOptions(selectedOptions),
    );
    return { filterOptions, selectedOptions, products };
  },
  getOneProductById: (args: GetOneProductByIdArgs) => {
    const found = dbJson.products.find(
      (product) => product.id === args.productId,
    );

    if (!found) {
      throw new createHttpError.NotFound('Product not found');
    }

    return found;
  },
};
