import { screen } from '@testing-library/react';
import CheckoutForm from './CheckoutForm';
import userEvent from '@testing-library/user-event';
import { AxiosError } from 'axios';
import { customRender } from '@src/testing/TestingUtils';

test('shows form items', () => {
  customRender(<CheckoutForm error={null} onSubmit={jest.fn()} />);

  const errorMessage = screen.queryByTestId('error-message');
  expect(errorMessage).not.toBeInTheDocument();

  const nameSurname = screen.getByRole('textbox', { name: 'Name Surname' });
  expect(nameSurname).toBeInTheDocument();

  const cardNumber = screen.getByRole('textbox', { name: 'Card Number' });
  expect(cardNumber).toBeInTheDocument();

  const expirationDate = screen.getByRole('textbox', {
    name: 'Expiration Date',
  });
  expect(expirationDate).toBeInTheDocument();

  const cvc = screen.getByRole('textbox', { name: 'CVC' });
  expect(cvc).toBeInTheDocument();

  const submitButton = screen.getByRole('button', {
    name: 'Complete Checkout',
  });
  expect(submitButton).toBeInTheDocument();
});

test('submits entered field values', async () => {
  const handleSubmit = jest.fn();

  customRender(
    <CheckoutForm error={null} onSubmit={(values) => handleSubmit(values)} />,
  );

  const nameSurname = screen.getByRole('textbox', { name: 'Name Surname' });
  await userEvent.type(nameSurname, 'John Doe');

  const cardNumber = screen.getByRole('textbox', { name: 'Card Number' });
  await userEvent.type(cardNumber, '4355084355084358');

  const expirationDate = screen.getByRole('textbox', {
    name: 'Expiration Date',
  });
  // TODO: Instead of setting a MM/YY value in the future like this,
  // we could use `jest.useFakeTimers().setSystemTime` and be sure
  // about which year will be used for the tests.
  // But there is a timeout error when it is used with async code.
  // This usage may be improved in the future.
  await userEvent.type(expirationDate, '0640');

  const cvc = screen.getByRole('textbox', { name: 'CVC' });
  await userEvent.type(cvc, '000');

  const submitButton = screen.getByRole('button', {
    name: 'Complete Checkout',
  });
  await userEvent.click(submitButton);

  expect(handleSubmit).toBeCalledWith({
    cardNumber: '4355 0843 5508 4358',
    cvc: '000',
    expiry: '06/40',
    nameSurname: 'John Doe',
  });
});

test('does not submit field values when there are field errors', async () => {
  const handleSubmit = jest.fn();

  customRender(
    <CheckoutForm error={null} onSubmit={(values) => handleSubmit(values)} />,
  );

  const submitButton = screen.getByRole('button', {
    name: 'Complete Checkout',
  });
  await userEvent.click(submitButton);

  expect(handleSubmit).not.toBeCalled();

  const fieldErrors = await screen.findAllByRole('alert');
  expect(fieldErrors).toHaveLength(4);
});

test('shows error message when there is', () => {
  customRender(
    <CheckoutForm
      error={new AxiosError('Unable to complete checkout')}
      onSubmit={jest.fn()}
    />,
  );

  const errorMessage = screen.getByTestId('error-message');
  expect(errorMessage).toHaveTextContent('Unable to complete checkout');
});
