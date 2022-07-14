import { customRender } from '@src/testing/TestingUtils';
import { screen } from '@testing-library/react';
import Chip from './Chip';

test('shows content', () => {
  customRender(<Chip>Chip content</Chip>);

  const chip = screen.getByTestId('chip');
  expect(chip).toHaveTextContent('Chip content');
});

test('does not show close button when not closable', () => {
  customRender(<Chip>Chip content</Chip>);

  const closeButton = screen.queryByRole('button');
  expect(closeButton).not.toBeInTheDocument();
});

test('shows close button when closable', () => {
  customRender(
    <Chip closeButtonProps={{ 'aria-label': 'Close', onClick: jest.fn }}>
      Chip content
    </Chip>,
  );

  const closeButton = screen.getByRole('button', { name: 'Close' });
  expect(closeButton).toBeInTheDocument();
});
