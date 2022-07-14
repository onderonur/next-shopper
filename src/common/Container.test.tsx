import { customRender } from '@src/testing/TestingUtils';
import { screen } from '@testing-library/react';
import Container from './Container';

test('shows its content', () => {
  customRender(<Container maxWidth="md">Container content</Container>);

  const container = screen.getByText('Container content');
  expect(container).toBeInTheDocument();
});
