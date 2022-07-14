import { ApiErrorResponse } from '@src/api/ApiTypes';
import { screen } from '@testing-library/react';
import { AxiosError } from 'axios';
import ErrorMessage from './ErrorMessage';
import { StatusCodes } from 'http-status-codes';
import { customRender } from '@src/testing/TestingUtils';

test('does not show when there is no error', () => {
  const { container } = customRender(<ErrorMessage error={null} />);

  expect(container).toBeEmptyDOMElement();
});

test('shows default message when error has no message', () => {
  customRender(<ErrorMessage error={new Error()} />);

  const errorMessage = screen.getByTestId('error-message');

  expect(errorMessage).toHaveTextContent('Something went wrong');
});

test('shows message of error', () => {
  customRender(<ErrorMessage error={new Error('Custom error message')} />);

  const errorMessage = screen.getByTestId('error-message');

  expect(errorMessage).toHaveTextContent('Custom error message');
});

test('shows message of api error', () => {
  customRender(
    <ErrorMessage
      error={
        new AxiosError<ApiErrorResponse>(
          'Axios error message',
          StatusCodes.NOT_FOUND.toString(),
          undefined,
          undefined,
          {
            status: StatusCodes.NOT_FOUND,
            statusText: 'Not Found',
            headers: {},
            config: {},
            data: {
              statusCode: 404,
              message: 'Error message in response',
            },
          },
        )
      }
    />,
  );

  const errorMessage = screen.getByTestId('error-message');

  expect(errorMessage).toHaveTextContent('Error message in response');
});
