import { customRender } from '@src/testing/TestingUtils';
import { screen } from '@testing-library/react';
import Badge from './Badge';

test('shows content with value', () => {
  customRender(<Badge value={10}>Badge content</Badge>);

  const badge = screen.getByTestId('badge');
  expect(badge).toHaveTextContent('Badge content');

  const badgeValue = screen.getByTestId('badge-value');
  expect(badgeValue).toHaveTextContent('10');
});

test('shows only content if value is 0', () => {
  customRender(<Badge value={0}>Badge content</Badge>);

  const badge = screen.getByTestId('badge');
  expect(badge).toHaveTextContent('Badge content');

  const badgeValue = screen.queryByTestId('badge-value');
  expect(badgeValue).not.toBeInTheDocument();
});
