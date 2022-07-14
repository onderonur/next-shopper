import { customRender } from '@src/testing/TestingUtils';
import { screen } from '@testing-library/react';
import SubmitButton from './SubmitButton';

const formState = {
  isDirty: false,
  dirtyFields: {},
  isSubmitted: false,
  isSubmitSuccessful: false,
  submitCount: 0,
  touchedFields: {},
  errors: {},
  isValid: true,
  isValidating: false,
  isSubmitting: false,
};

test('does not show loading icon while submitting', () => {
  customRender(
    <SubmitButton aria-label="Submit" formState={formState}>
      Submit
    </SubmitButton>,
  );

  const button = screen.getByRole('button', { name: 'Submit' });

  expect(button).toHaveTextContent('Submit');

  const loading = screen.queryByTestId('loading-spinner');

  expect(loading).not.toBeInTheDocument();
});

test('shows loading icon while submitting', () => {
  customRender(
    <SubmitButton
      aria-label="Submit"
      formState={{
        ...formState,
        isSubmitting: true,
      }}
    >
      Submit
    </SubmitButton>,
  );

  const button = screen.getByRole('button', { name: 'Submit' });

  expect(button).toHaveTextContent('Submit');

  const loading = screen.getByTestId('loading-spinner');

  expect(loading).toBeInTheDocument();
});
