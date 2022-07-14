import { customRender } from '@src/testing/TestingUtils';
import { screen, within } from '@testing-library/react';
import CartItemList from './CartItemList';

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

test('shows empty message when there are no cart items', () => {
  customRender(<CartItemList />);

  const emptyMessage = screen.getByText('Your cart is empty');

  expect(emptyMessage).toBeInTheDocument();

  const itemList = screen.queryByRole('list');

  expect(itemList).not.toBeInTheDocument();
});

test('shows cart items', () => {
  customRender(<CartItemList />, { preloadedState });

  const list = screen.getByRole('list');
  expect(list).toBeInTheDocument();

  const listItems = screen.getAllByRole('listitem');
  expect(listItems).toHaveLength(2);

  for (let i = 0; i < listItems.length; i++) {
    const listItem = listItems[i];
    const cartItem = preloadedState.cart?.cartItems[i];

    expect(listItem).toHaveAccessibleName(cartItem.info.title);

    const title = within(listItem).getByText(cartItem.info.title);
    expect(title).toBeInTheDocument();

    const price = within(listItem).getByTestId('price');
    expect(price).toHaveTextContent(
      `$${(cartItem.info.price * cartItem.count).toFixed(2).replace('.', ',')}`,
    );

    const cartItemCount = within(listItem).getByTestId('cart-item-count');
    expect(cartItemCount).toHaveTextContent(cartItem.count.toString());
  }
});
