import React from 'react';
import nock from 'nock';
import { screen, within } from '@testing-library/react';
import ProductListView from './ProductListView';
import { Product } from '@src/products/ProductsTypes';
import { StatusCodes } from 'http-status-codes';
import { customRender } from '@src/testing/TestingUtils';

test('TODO: rename', async () => {
  const response: { products: Product[] } = {
    products: [
      {
        id: 1,
        title: 'Test product 1',
        description: 'This is the test product 1',
        image: '/images/test-product-1',
        category: { value: 'category-1', title: 'Category 1' },
        price: 9.99,
      },
    ],
  };

  nock('http://localhost:80')
    .get('/api/products')
    .reply(StatusCodes.OK, response);

  customRender(<ProductListView />);

  const productListWrapper = screen.getByTestId('products-list-wrapper');

  const skeletons = within(productListWrapper).getAllByTestId(
    'product-list-item-skeleton',
  );

  expect(skeletons).toHaveLength(8);

  const listItems = await within(productListWrapper).findAllByTestId(
    'product-list-item',
  );

  expect(listItems).toHaveLength(response.products.length);

  for (let i = 0; i < response.products.length; i++) {
    const listItem = listItems[i];
    const product = response.products[i];

    expect(listItem).toHaveTextContent(product.title);
  }
});
