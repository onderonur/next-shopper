import { APP_TITLE } from '@src/common/CommonUtils';
import { customRender } from '@src/testing/TestingUtils';
import { screen } from '@testing-library/react';
import AppHeader from './AppHeader';

test('shows app title as home link and cart info', () => {
  customRender(<AppHeader />);

  const link = screen.getByRole('link', { name: APP_TITLE });
  expect(link).toHaveAttribute('href', '/');

  const cartInfo = screen.getByRole('button', { name: 'Open Cart Info' });
  expect(cartInfo).toBeInTheDocument();
});
