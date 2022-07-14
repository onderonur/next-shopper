import { customRender } from '@src/testing/TestingUtils';
import { screen, within } from '@testing-library/react';
import ImageLink from './ImageLink';

test('shows image and title in link', () => {
  customRender(
    <ImageLink
      href="/to-another-page"
      imageSrc="/images/some-image.jpg"
      title="Some title"
    />,
  );

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', '/to-another-page');

  const image = within(link).getByRole('img', { name: 'Some title' });
  expect(image).toHaveAttribute('src', '/images/some-image.jpg');

  const heading = within(link).getByRole('heading');
  expect(heading).toHaveTextContent('Some title');
});
