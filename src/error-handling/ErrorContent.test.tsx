import { customRender } from '@src/testing/TestingUtils';
import { screen } from '@testing-library/react';
import { StatusCodes } from 'http-status-codes';
import ErrorContent from './ErrorContent';

test('shows status code, message and back to home button', () => {
  customRender(
    <ErrorContent statusCode={StatusCodes.NOT_FOUND} message="Not Found" />,
  );

  const statusCode = screen.getByTestId('error-content-status-code');
  expect(statusCode).toHaveTextContent('404');

  const message = screen.getByTestId('error-content-message');
  expect(message).toHaveTextContent('Not Found');

  const homeLink = screen.getByRole('link', { name: 'Back to Home' });
  expect(homeLink).toHaveAttribute('href', '/');
});
