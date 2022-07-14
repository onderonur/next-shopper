import { customRender } from '@src/testing/TestingUtils';
import { screen } from '@testing-library/react';
import AppContent from './AppContent';

test('shows its content', () => {
  customRender(<AppContent>App content</AppContent>);

  const main = screen.getByRole('main');
  expect(main).toHaveTextContent('App content');
});
