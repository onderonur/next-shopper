import { customRender } from '@src/testing/TestingUtils';
import { screen } from '@testing-library/react';
import AppLayout from './AppLayout';

test('shows content with layout', () => {
  customRender(<AppLayout>Some content</AppLayout>);

  const main = screen.getByRole('main');
  expect(main).toHaveTextContent('Some content');

  const header = screen.getByTestId('app-header');
  expect(header).toBeInTheDocument();

  const footer = screen.getByTestId('app-footer');
  expect(footer).toBeInTheDocument();
});
