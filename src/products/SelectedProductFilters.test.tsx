import { screen } from '@testing-library/react';
import { ProductFilterSelectedOption } from './ProductsTypes';
import { ProductFilterKey } from './ProductsUtils';
import SelectedProductFilters from './SelectedProductFilters';
import userEvent from '@testing-library/user-event';
import { customRender } from '@src/testing/TestingUtils';

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

test('is not shown when there are no selected options', () => {
  const { container } = customRender(
    <SelectedProductFilters
      selectedOptions={[]}
      onRemove={jest.fn()}
      onReset={jest.fn()}
    />,
  );

  expect(container).toBeEmptyDOMElement();
});

test('is not shown when there are no visible selected options', () => {
  const { container } = customRender(
    <SelectedProductFilters
      selectedOptions={[
        {
          filterKey: ProductFilterKey.SORTING,
          isVisible: false,
          title: 'Price (Ascending)',
          value: 'price-asc',
        },
      ]}
      onRemove={jest.fn()}
      onReset={jest.fn()}
    />,
  );

  expect(container).toBeEmptyDOMElement();
});

test('shows visible selected options and a clear button', () => {
  customRender(
    <SelectedProductFilters
      selectedOptions={selectedOptions}
      onRemove={jest.fn()}
      onReset={jest.fn()}
    />,
  );

  const listItems = screen.getAllByRole('listitem');

  const visibleOptions = selectedOptions.filter((option) => option.isVisible);

  // Because there is a clear filters button as a `listitem`, we add 1 to visibleOptions.length.
  expect(listItems).toHaveLength(visibleOptions.length + 1);

  for (let i = 0; i < visibleOptions.length; i++) {
    const option = visibleOptions[i];
    const listItem = listItems[i];

    expect(listItem).toHaveTextContent(option.title);
  }

  expect(
    screen.getByRole('button', { name: 'Clear Filters' }),
  ).toBeInTheDocument();
});

test('calls `onRemove` when option is clicked', async () => {
  const handleRemove = jest.fn();

  customRender(
    <SelectedProductFilters
      selectedOptions={selectedOptions}
      onRemove={handleRemove}
      onReset={jest.fn()}
    />,
  );

  const [optionToRemove] = selectedOptions;

  const removeButton = screen.getByRole('button', {
    name: `Remove ${optionToRemove.title} filter`,
  });

  await userEvent.click(removeButton);

  expect(handleRemove).toBeCalledWith(optionToRemove);
});

test('calls `onReset` when clear button is clicked', async () => {
  const handleReset = jest.fn();

  customRender(
    <SelectedProductFilters
      selectedOptions={selectedOptions}
      onRemove={jest.fn()}
      onReset={handleReset}
    />,
  );

  const clearButton = screen.getByRole('button', { name: 'Clear Filters' });

  await userEvent.click(clearButton);

  expect(handleReset).toBeCalled();
});
