import {
  APP_DESCRIPTION,
  APP_REPOSITORY_URL,
  APP_TITLE,
} from '@src/common/CommonUtils';
import { customRender } from '@src/testing/TestingUtils';
import { screen } from '@testing-library/react';
import Hero from './Hero';

test('shows app title, description, repository link and store link', () => {
  customRender(<Hero />);

  const heading = screen.getByRole('heading');
  expect(heading).toHaveTextContent(APP_TITLE);

  const description = screen.getByTestId('app-description');
  expect(description).toHaveTextContent(APP_DESCRIPTION);

  const repositoryLink = screen.getByRole('link', {
    name: 'Check the Source Code',
  });
  expect(repositoryLink).toHaveAttribute('href', APP_REPOSITORY_URL);

  const storeLink = screen.getByRole('link', { name: 'Browse Store' });
  expect(storeLink).toHaveAttribute('href', '/search');
});
