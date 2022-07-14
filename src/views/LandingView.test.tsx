import { Category } from '@src/categories/CategoriesTypes';
import { customRender } from '@src/testing/TestingUtils';
import { screen, within } from '@testing-library/react';
import { StatusCodes } from 'http-status-codes';
import nock from 'nock';
import LandingView from './LandingView';

test('shows categories as image links', async () => {
  const response: Category[] = [
    { image: '/images/category-1', title: 'Category 1', value: 'category-1' },
    { image: '/images/category-2', title: 'Category 2', value: 'category-2' },
  ];

  nock('http://localhost:80')
    .get('/api/categories')
    .reply(StatusCodes.OK, response);

  customRender(<LandingView />);

  const list = screen.getByRole('list');

  const imageLinkSkeletons = within(list).getAllByTestId('image-link-skeleton');
  expect(imageLinkSkeletons).toHaveLength(4);

  const imageLinks = await within(list).findAllByRole('link');
  expect(imageLinks).toHaveLength(response.length);

  for (let i = 0; i < imageLinks.length; i++) {
    const category = response[i];
    const imageLink = imageLinks[i];

    expect(imageLink).toHaveTextContent(category.title);
    expect(imageLink).toHaveAttribute(
      'href',
      `/search?categories=${category.value}`,
    );

    const image = within(imageLink).getByRole('img', { name: category.title });
    expect(image).toHaveAttribute('src', category.image);
  }
});

test('shows error message when there is', async () => {
  const response = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'Internal server error',
  };

  nock('http://localhost:80')
    .get('/api/categories')
    .reply(response.statusCode, response);

  customRender(<LandingView />);

  const imageLinkSkeletons = screen.getAllByTestId('image-link-skeleton');
  expect(imageLinkSkeletons).toHaveLength(4);

  const errorMessage = await screen.findByTestId('error-message');
  expect(errorMessage).toHaveTextContent(response.message);

  const list = screen.queryByRole('list');
  expect(list).not.toBeInTheDocument();
});
