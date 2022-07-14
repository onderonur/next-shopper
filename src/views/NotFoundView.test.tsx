import { customRender } from '@src/testing/TestingUtils';
import { screen } from '@testing-library/react';
import NotFoundView from './NotFoundView';

test('shows not found status code and message', () => {
  customRender(<NotFoundView />);

  const statusCode = screen.getByTestId('error-content-status-code');
  expect(statusCode).toHaveTextContent('404');

  const message = screen.getByTestId('error-content-message');
  expect(message).toHaveTextContent('This page could not be found');
});
