import { customRender } from '@src/testing/TestingUtils';
import { screen } from '@testing-library/react';
import FormItem from './FormItem';

test('shows only content without error', () => {
  customRender(
    <FormItem>
      <input />
    </FormItem>,
  );

  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();

  const errorMessage = screen.queryByRole('alert');
  expect(errorMessage).not.toBeInTheDocument();
});

test('shows content and error message', () => {
  customRender(
    <FormItem error={{ type: 'required', message: 'This field is required' }}>
      <input />
    </FormItem>,
  );

  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();

  const errorMessage = screen.getByRole('alert');
  expect(errorMessage).toHaveTextContent('This field is required');
});
