import { screen } from '@testing-library/react';
import GoBackButton from './GoBackButton';
import userEvent from '@testing-library/user-event';
import { customRender } from '@src/testing/TestingUtils';

test('navigates to previous route when clicked', async () => {
  const { mockRouter } = customRender(<GoBackButton />);

  const goBackButton = screen.getByRole('button', { name: 'Go Back' });

  await userEvent.click(goBackButton);

  expect(mockRouter.back).toBeCalled();
});
