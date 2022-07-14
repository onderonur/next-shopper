import { customRender } from '@src/testing/TestingUtils';
import { screen } from '@testing-library/react';
import ProductDetail from './ProductDetail';

const product = {
  id: 1,
  title: 'Product 1',
  image: '/images/product-1',
  description: 'Some description about the product',
  price: 10,
  category: { title: 'Category', value: 'category' },
};

test('shows product info with add to cart button', () => {
  customRender(<ProductDetail product={product} />);

  const image = screen.getByRole('img', { name: product.title });
  expect(image).toHaveAttribute('src', product.image);

  const title = screen.getByText(product.title);
  expect(title).toBeInTheDocument();

  const price = screen.getByTestId('price');
  expect(price).toHaveTextContent('$10,00');

  const description = screen.getByText(product.description);
  expect(description).toBeInTheDocument();

  const addToCartButton = screen.getByRole('button', { name: 'Add to Cart' });
  expect(addToCartButton).toBeInTheDocument();

  const categoryLink = screen.getByRole('link', {
    name: product.category.title,
  });
  expect(categoryLink).toHaveAttribute(
    'href',
    `/search?categories=${product.category.value}`,
  );
});
