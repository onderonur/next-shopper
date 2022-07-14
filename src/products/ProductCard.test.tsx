import { customRender } from '@src/testing/TestingUtils';
import { screen } from '@testing-library/react';
import ProductCard from './ProductCard';

const product = {
  id: 1,
  title: 'Test product',
  description: 'This is a test product',
  price: 10.99,
  image: '/images/test-product.jpg',
  category: { value: 'category-1', title: 'Test category' },
};

function setup() {
  customRender(<ProductCard product={product} />);
}

test('shows product info', () => {
  setup();

  const heading = screen.getByRole('heading');
  expect(heading).toHaveTextContent(product.title);

  // TODO: src de check edilebilir.
  const image = screen.getByRole('img', { name: product.title });
  expect(image).toBeInTheDocument();

  const categoryLink = screen.getByRole('link', {
    name: product.category.title,
  });
  expect(categoryLink).toHaveAttribute(
    'href',
    `/search?categories=${product.category.value}`,
  );

  const addToCartButton = screen.getByRole('button', { name: 'Add to Cart' });
  expect(addToCartButton).toBeInTheDocument();
});
