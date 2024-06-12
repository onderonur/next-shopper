import type { Id } from '@/common/common-types';
import type {
  ProductFilterArgs,
  ProductFilterOptions,
  ProductFilterResponse,
  ProductFilterSelectedOption,
} from '@/search/search-types';
import { ProductFilterKey, ProductSorting } from '@/search/search-utils';
import { cache } from 'react';
import { db } from '../../db/drizzle';

async function getProductFilterOptions() {
  const sortings = await db.query.sortings.findMany();
  const categories = await db.query.categories.findMany();
  const priceRanges = await db.query.priceRanges.findMany();

  const filterOptions: ProductFilterOptions = {
    sortings: {
      title: 'Sorting',
      options: sortings.map((option, i) => ({ ...option, order: `0_${i}` })),
      filterKey: ProductFilterKey.SORTING,
    },
    categories: {
      title: 'Categories',
      options: categories.map((option, i) => ({ ...option, order: `1_${i}` })),
      filterKey: ProductFilterKey.CATEGORIES,
    },
    priceRanges: {
      title: 'Price',
      options: priceRanges.map((option, i) => ({ ...option, order: `2_${i}` })),
      filterKey: ProductFilterKey.PRICE_RANGES,
    },
  };

  return filterOptions;
}

async function getManyProducts(args: ProductFilterArgs) {
  let categoryIds: Id[] = [];

  const categoryValues = args.categories;

  if (categoryValues?.length) {
    const categories = await db.query.categories.findMany({
      where: (categories, { inArray }) =>
        inArray(categories.value, categoryValues),
    });

    categoryIds = categories.map((category) => category.id);
  }

  const products = await db.query.products.findMany({
    where: (products, { inArray, and, or, gte, lte }) => {
      const conditions: Parameters<typeof or> = [];

      if (categoryIds.length) {
        conditions.push(inArray(products.categoryId, categoryIds));
      }

      if (args.priceRanges?.length) {
        const priceRangeConditions: Parameters<typeof and> = [];

        for (const priceRange of args.priceRanges) {
          const [minPriceText, maxPriceText] = priceRange.split('-');
          const minPrice = Number(minPriceText);
          const maxPrice =
            maxPriceText === 'max'
              ? Number.POSITIVE_INFINITY
              : Number(maxPriceText);

          priceRangeConditions.push(
            and(gte(products.price, minPrice), lte(products.price, maxPrice)),
          );
        }

        conditions.push(or(...priceRangeConditions));
      }

      return and(...conditions);
    },
    // TODO: Default sorting ekle json'lı version'a da.
    orderBy: (products, { asc, desc }) => {
      switch (args.sorting) {
        case ProductSorting.PRICE_ASC: {
          return [asc(products.price)];
        }
        case ProductSorting.PRICE_DESC: {
          return [desc(products.price)];
        }
        default: {
          return [];
        }
      }
    },
  });

  return products;
}

// TODO: Filter seçip refresh yapıp sonra clear filter yapınca URL değişiyor ama ekranda filter'lar seçili kalıyor.
function getProductFilterSelectedOptions({
  filterOptions,
  args,
}: {
  filterOptions: ProductFilterOptions;
  args: ProductFilterArgs;
}) {
  const { sortings, categories, priceRanges } = filterOptions;
  const selectedOptions: ProductFilterSelectedOption[] = [];

  let selectedSorting = sortings.options.find(
    (sorting) => sorting.value === args.sorting,
  );

  if (!selectedSorting) {
    selectedSorting = sortings.options.find(
      (sorting) => (sorting.value as ProductSorting) === ProductSorting.DEFAULT,
    );
  }

  if (selectedSorting) {
    selectedOptions.push({
      ...selectedSorting,
      isVisible:
        (selectedSorting.value as ProductSorting) !== ProductSorting.DEFAULT,
      filterKey: ProductFilterKey.SORTING,
    });
  }

  for (const category of categories.options) {
    if (args.categories?.includes(category.value)) {
      selectedOptions.push({
        ...category,
        isVisible: true,
        filterKey: ProductFilterKey.CATEGORIES,
      });
    }
  }

  for (const priceRange of priceRanges.options) {
    if (args.priceRanges?.includes(priceRange.value)) {
      selectedOptions.push({
        ...priceRange,
        isVisible: true,
        filterKey: ProductFilterKey.PRICE_RANGES,
      });
    }
  }

  return selectedOptions;
}

export const filterProducts = cache(
  async (args: ProductFilterArgs): Promise<ProductFilterResponse> => {
    const [filterOptions, products] = await Promise.all([
      getProductFilterOptions(),
      getManyProducts(args),
    ]);

    const selectedOptions = getProductFilterSelectedOptions({
      filterOptions,
      args,
    });

    return { filterOptions, selectedOptions, products };
  },
);
