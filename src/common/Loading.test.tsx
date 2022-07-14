import { customRender } from '@src/testing/TestingUtils';
import { screen } from '@testing-library/react';
import Loading from './Loading';

test('shows content when not loading', () => {
  customRender(<Loading isLoading={false}>Some content</Loading>);

  const loadingSpinner = screen.queryByTestId('loading-spinner');
  expect(loadingSpinner).not.toBeInTheDocument();

  const content = screen.getByText('Some content');
  expect(content).toBeInTheDocument();
});

test('shows spinner when loading', () => {
  customRender(<Loading isLoading>Some content</Loading>);

  const loadingSpinner = screen.getByTestId('loading-spinner');
  expect(loadingSpinner).toBeInTheDocument();

  const content = screen.queryByText('Loading content');
  expect(content).not.toBeInTheDocument();
});
