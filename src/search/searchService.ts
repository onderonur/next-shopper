import 'server-only';

import {
  getValuesOfSelectedOptions,
  ProductFilterKey,
  ProductSorting,
} from '@/search/SearchUtils';
import {
  ProductFilterArgs,
  ProductFilterOptions,
  ProductFilterResponse,
  ProductFilterSelectedOption,
} from '@/search/SearchTypes';
import { getDb } from '@/db/DbUtils';
import { cache } from 'react';
import { Product } from '@/products/ProductsTypes';

async function getProductFilterOptions() {
  const db = await getDb();
  const { sortings, categories, priceRanges } = db;
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

async function getProductFilterSelectedOptions(args: ProductFilterArgs) {
  const db = await getDb();
  const { sortings, categories, priceRanges } = db;
  const selectedOptions: ProductFilterSelectedOption[] = [];

  const defaultSorting = sortings.find((sorting) => sorting.isDefault);
  let isDefaultSortingApplied = false;
  let selectedSorting = sortings.find(
    (sorting) => sorting.value === args.sorting,
  );

  if (!selectedSorting && defaultSorting) {
    isDefaultSortingApplied = true;
    selectedSorting = defaultSorting;
  }

  if (selectedSorting) {
    selectedOptions.push({
      value: selectedSorting.value,
      title: selectedSorting.title,
      isVisible: !isDefaultSortingApplied,
      filterKey: ProductFilterKey.SORTING,
    });
  }

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

async function getManyProducts(args: ProductFilterArgs) {
  const db = await getDb();
  let response: Product[] = [...db.products];

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

export const searchService = {
  filterProducts: cache(
    async (args: ProductFilterArgs): Promise<ProductFilterResponse> => {
      const filterOptions = await getProductFilterOptions();
      const selectedOptions = await getProductFilterSelectedOptions(args);
      const products = await getManyProducts(
        getValuesOfSelectedOptions(selectedOptions),
      );
      return { filterOptions, selectedOptions, products };
    },
  ),
};
