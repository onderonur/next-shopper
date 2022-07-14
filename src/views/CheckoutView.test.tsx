import { customRender } from '@src/testing/TestingUtils';
import { screen, waitFor, within } from '@testing-library/react';
import CheckoutView from './CheckoutView';
import userEvent from '@testing-library/user-event';
import nock from 'nock';
import { StatusCodes } from 'http-status-codes';

const product1 = {
  id: 1,
  title: 'Product 1',
  image: '/images/product-1',
  category: { title: 'Category', value: 'category' },
  description: 'Some description about the product',
  price: 10,
};

const product2 = {
  id: 2,
  title: 'Product 2',
  image: '/images/product-2',
  category: { title: 'Category', value: 'category' },
  description: 'Some description about the product',
  price: 12.99,
};

const preloadedState = {
  cart: {
    cartItems: [
      { info: product1, count: 2 },
      { info: product2, count: 1 },
    ],
  },
};

test('shows empty cart message when there are no products in the cart', () => {
  customRender(<CheckoutView />);

  const title = screen.getByRole('heading', { name: 'Checkout' });
  expect(title).toBeInTheDocument();

  const cartSection = screen.getByLabelText('Cart');

  const emptyText = within(cartSection).getByText('Your cart is empty');

  expect(emptyText).toBeInTheDocument();
});

test('shows success message when checkout is completed', async () => {
  customRender(<CheckoutView />, { preloadedState });

  nock('http://localhost:80').post('/api/checkout').reply(StatusCodes.CREATED);

  const paymentSection = screen.getByLabelText('Payment Method');
  expect(paymentSection).toBeInTheDocument();

  const nameSurname = within(paymentSection).getByRole('textbox', {
    name: 'Name Surname',
  });
  await userEvent.type(nameSurname, 'John Doe');

  const cardNumber = within(paymentSection).getByRole('textbox', {
    name: 'Card Number',
  });
  await userEvent.type(cardNumber, '5571135571135575');

  const expirationDate = within(paymentSection).getByRole('textbox', {
    name: 'Expiration Date',
  });
  await userEvent.type(expirationDate, '0640');

  const cvc = within(paymentSection).getByRole('textbox', { name: 'CVC' });
  await userEvent.type(cvc, '000');

  const submitButton = within(paymentSection).getByRole('button', {
    name: 'Complete Checkout',
  });
  await userEvent.click(submitButton);

  const successMessage = await screen.findByText(
    'Your order has been received',
  );

  expect(successMessage).toBeInTheDocument();

  expect(paymentSection).not.toBeInTheDocument();

  const storeLink = screen.getByRole('link', { name: 'Back to Store' });
  expect(storeLink).toHaveAttribute('href', '/search');
});

test('shows cart items and total price', () => {
  customRender(<CheckoutView />, { preloadedState });

  // TODO: cart items test

  const totalPrice = screen.getByTestId('cart-total-price');
  const price = within(totalPrice).getByTestId('price');
  expect(price).toHaveTextContent('$32,99');
});

test('clears cart', async () => {
  customRender(<CheckoutView />, { preloadedState });

  const clearButton = screen.getByRole('button', { name: 'Clear Cart' });
  await userEvent.click(clearButton);

  const confirmDialog = screen.getByRole('dialog', { name: 'Clear cart?' });
  expect(confirmDialog).toBeInTheDocument();

  const confirmButton = within(confirmDialog).getByRole('button', {
    name: 'Clear',
  });
  await userEvent.click(confirmButton);

  const emptyText = screen.getByText('Your cart is empty');
  expect(emptyText).toBeInTheDocument();

  const paymentSection = screen.queryByLabelText('Payment Method');
  expect(paymentSection).not.toBeInTheDocument();
});

test('removes item from cart', async () => {
  customRender(<CheckoutView />, { preloadedState });

  const cartItem = screen.getByRole('listitem', { name: product1.title });
  expect(cartItem).toBeInTheDocument();

  const removeButton = within(cartItem).getByRole('button', {
    name: `Remove "${product1.title}" From Cart`,
  });
  await userEvent.click(removeButton);

  // TODO: framer motion için waitFor'dan daha iyi bi yöntem olabilir. bakmak lazım.
  await waitFor(() => {
    expect(cartItem).not.toBeInTheDocument();
  });
});
