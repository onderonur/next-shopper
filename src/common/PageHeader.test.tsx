import { customRender } from '@src/testing/TestingUtils';
import { screen } from '@testing-library/react';
import PageHeader from './PageHeader';

test('shows title and go back button', () => {
  customRender(<PageHeader title="This is a title" />);

  const heading = screen.getByRole('heading');
  expect(heading).toHaveTextContent('This is a title');

  const goBackButton = screen.getByRole('button', { name: 'Go Back' });
  expect(goBackButton).toBeInTheDocument();
});

test('only shows back button when title is not given', () => {
  customRender(<PageHeader title={null} />);

  const heading = screen.queryByRole('heading');
  expect(heading).not.toBeInTheDocument();

  const goBackButton = screen.getByRole('button', { name: 'Go Back' });
  expect(goBackButton).toBeInTheDocument();
});
