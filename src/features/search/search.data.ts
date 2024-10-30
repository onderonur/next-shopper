import { prisma } from '@/core/db/db';
import type { Id } from '@/core/shared/shared.types';
import { getUser } from '@/features/auth/auth.data';
import type {
  ProductFilterArgs,
  ProductFilterOptions,
  ProductFilterResponse,
  ProductFilterSelectedOption,
} from '@/features/search/search.types';
import {
  ProductFilterKey,
  ProductSorting,
} from '@/features/search/search.utils';
import { cache } from 'react';
import 'server-only';

async function getProductFilterOptions() {
  const [sortings, categories, priceRanges] = await Promise.all([
    prisma.sorting.findMany(),
    prisma.category.findMany(),
    prisma.priceRange.findMany(),
  ]);

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
    const categories = await prisma.category.findMany({
      where: {
        value: {
          in: categoryValues,
        },
      },
    });

    categoryIds = categories.map((category) => category.id);
  }

  const orderByPrice = {
    [ProductSorting.DEFAULT]: undefined,
    [ProductSorting.PRICE_ASC]: 'asc',
    [ProductSorting.PRICE_DESC]: 'desc',
  } as const;

  const priceRanges: Array<{ minPrice: number; maxPrice: number }> = [];

  if (args.priceRanges?.length) {
    for (const priceRange of args.priceRanges) {
      const [minPriceText, maxPriceText] = priceRange.split('-');
      const minPrice = Number(minPriceText);
      const maxPrice =
        maxPriceText === 'max'
          ? Number.POSITIVE_INFINITY
          : Number(maxPriceText);

      priceRanges.push({ minPrice, maxPrice });
    }
  }

  const user = await getUser();

  const products = await prisma.product.findMany({
    where: {
      categoryId: categoryIds.length ? { in: categoryIds } : undefined,
      OR: priceRanges.length
        ? priceRanges.map((priceRange) => ({
            price: {
              lte: priceRange.maxPrice,
              gte: priceRange.minPrice,
            },
          }))
        : undefined,
    },
    orderBy: {
      price: args.sorting
        ? orderByPrice[args.sorting as ProductSorting]
        : undefined,
    },
    include: {
      favorites: user?.id
        ? {
            where: {
              userId: user.id,
            },
          }
        : false,
    },
  });

  return products.map((product) => {
    const { favorites, ...rest } = product;

    return {
      ...rest,
      // Prisma can not infer conditional `include` cases.
      // So, we disable the ESLint rule here to check if `favorites` is `undefined` or not.
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      isInFavorites: !!favorites?.length,
    };
  });
}

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

// TODO: When calling a memoized function, React will look up the input arguments to see if a result is already cached.
// React will use `Object.is` on the arguments to determine if there is a cache hit.
// Since `args` is an object here, there can be cache miss for different objects (different object references)
// with same property values. This `args` usage can be improved.
// But since we don't call this function in multiple components at the same time etc. currently,
// this can be neglected for now.
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
