import { screen } from '@testing-library/react';
import ProductView from './ProductView';
import nock from 'nock';
import { Product } from '@src/products/ProductsTypes';
import { StatusCodes } from 'http-status-codes';
import { customRender } from '@src/testing/TestingUtils';

test('shows fetched product details', async () => {
  const response: Product = {
    id: 1,
    title: 'Test product 1',
    description: 'This is the test product 1',
    image: '/images/test-product-1',
    category: { value: 'category-1', title: 'Category 1' },
    price: 9.99,
  };

  nock('http://localhost:80')
    .get('/api/products/1')
    .reply(StatusCodes.OK, response);

  customRender(<ProductView />, { router: { query: { productId: '1' } } });

  const loadingSpinner = screen.getByTestId('loading-spinner');
  expect(loadingSpinner).toBeInTheDocument();

  const title = await screen.findByRole('heading');
  expect(title).toHaveTextContent(response.title);

  const description = screen.getByText(response.description);
  expect(description).toBeInTheDocument();

  const image = screen.getByRole('img', { name: response.title });
  expect(image).toHaveAttribute('src', response.image);

  const price = screen.getByTestId('price');
  expect(price).toHaveTextContent('$9,99');

  const addToCartButton = screen.getByRole('button', { name: 'Add to Cart' });
  expect(addToCartButton).toBeInTheDocument();

  const categoryLink = screen.getByRole('link', {
    name: response.category.title,
  });
  expect(categoryLink).toHaveAttribute(
    'href',
    `/search?categories=${response.category.value}`,
  );
});

test('shows error message on failure', async () => {
  const response = {
    statusCode: StatusCodes.NOT_FOUND,
    message: 'Product not found',
  };

  nock('http://localhost:80')
    .get('/api/products/999')
    .reply(response.statusCode, response);

  customRender(<ProductView />, { router: { query: { productId: '999' } } });

  const errorMessage = await screen.findByTestId('error-message');
  expect(errorMessage).toHaveTextContent(response.message);
});
