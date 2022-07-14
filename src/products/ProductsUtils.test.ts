import { ProductFilterSelectedOption } from './ProductsTypes';
import {
  getManySelectedOptionValues,
  getOneSelectedOptionValue,
  getValuesOfSelectedOptions,
  ProductFilterKey,
} from './ProductsUtils';

const selectedOptions: ProductFilterSelectedOption[] = [
  {
    filterKey: ProductFilterKey.CATEGORIES,
    isVisible: true,
    title: 'Test category 1',
    value: 'test-category-1',
  },
  {
    filterKey: ProductFilterKey.CATEGORIES,
    isVisible: true,
    title: 'Test category 2',
    value: 'test-category-2',
  },
  {
    filterKey: ProductFilterKey.SORTING,
    isVisible: false,
    title: 'Price (Ascending)',
    value: 'price-asc',
  },
];

test('gets one selected option value', () => {
  expect(
    getOneSelectedOptionValue(ProductFilterKey.CATEGORIES, selectedOptions),
  ).toBe(selectedOptions[0].value);

  expect(
    getOneSelectedOptionValue(ProductFilterKey.SORTING, selectedOptions),
  ).toBe(selectedOptions[2].value);

  expect(
    getOneSelectedOptionValue(ProductFilterKey.PRICE_RANGES, selectedOptions),
  ).toBe(undefined);

  expect(getOneSelectedOptionValue(ProductFilterKey.CATEGORIES, [])).toBe(
    undefined,
  );
});

test('gets many selected option values', () => {
  expect(
    getManySelectedOptionValues(ProductFilterKey.CATEGORIES, selectedOptions),
  ).toEqual([selectedOptions[0].value, selectedOptions[1].value]);

  expect(
    getManySelectedOptionValues(ProductFilterKey.SORTING, selectedOptions),
  ).toEqual([selectedOptions[2].value]);

  expect(
    getManySelectedOptionValues(ProductFilterKey.PRICE_RANGES, selectedOptions),
  ).toEqual([]);

  expect(getManySelectedOptionValues(ProductFilterKey.CATEGORIES, [])).toEqual(
    [],
  );
});

test('gets values of selected options', () => {
  const allSelectedOptions = [
    ...selectedOptions,
    {
      filterKey: ProductFilterKey.PRICE_RANGES,
      isVisible: true,
      title: '$10 - $100',
      value: 'price-range-01',
    },
  ];

  expect(getValuesOfSelectedOptions(allSelectedOptions)).toEqual({
    [ProductFilterKey.CATEGORIES]: [
      allSelectedOptions[0].value,
      selectedOptions[1].value,
    ],
    [ProductFilterKey.SORTING]: allSelectedOptions[2].value,
    [ProductFilterKey.PRICE_RANGES]: [allSelectedOptions[3].value],
  });
});
