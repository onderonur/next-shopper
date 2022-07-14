import { customRender } from '@src/testing/TestingUtils';
import { screen } from '@testing-library/react';
import Price from './Price';

test('shows integer price with price format', () => {
  customRender(<Price value={5} />);

  const price = screen.getByTestId('price');
  expect(price).toHaveTextContent('$5,00');
});

test('shows float price with price format', () => {
  customRender(<Price value={5.99} />);

  const price = screen.getByTestId('price');
  expect(price).toHaveTextContent('$5,99');
});

test('shows default price when value is `null`', () => {
  customRender(<Price value={null} />);

  const price = screen.getByTestId('price');
  expect(price).toHaveTextContent('$0,00');
});

test('shows default price when value is `undefined`', () => {
  customRender(<Price value={undefined} />);

  const price = screen.getByTestId('price');
  expect(price).toHaveTextContent('$0,00');
});
