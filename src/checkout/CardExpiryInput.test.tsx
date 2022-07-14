import { customRender } from '@src/testing/TestingUtils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CardExpiryInput from './CardExpiryInput';

test('formats 4 digit input as MM/YY', async () => {
  customRender(<CardExpiryInput />);

  const input = screen.getByRole('textbox');

  await userEvent.type(input, '0622');

  expect(input).toHaveValue('06/22');
});

test('formats 3 digit input as MM/YY', async () => {
  customRender(<CardExpiryInput />);

  const input = screen.getByRole('textbox');

  await userEvent.type(input, '922');

  expect(input).toHaveValue('09/22');
});

test('does not accept non-numeric characters', async () => {
  customRender(<CardExpiryInput />);

  const input = screen.getByRole('textbox');

  await userEvent.type(input, 'asd!?*-');

  expect(input).toHaveValue('');
});

test('ignores numbers after MM/YY value is formed', async () => {
  customRender(<CardExpiryInput />);

  const input = screen.getByRole('textbox');

  await userEvent.type(input, '6229999');

  expect(input).toHaveValue('06/22');
});
