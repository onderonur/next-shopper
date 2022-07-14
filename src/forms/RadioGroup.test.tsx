import { screen } from '@testing-library/react';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { Maybe } from '@src/common/CommonTypes';
import RadioGroup, { RadioGroupProps } from './RadioGroup';
import { customRender } from '@src/testing/TestingUtils';

type UncontrolledRadioGroupProps = Pick<
  RadioGroupProps<{
    id: string;
    title: string;
  }>,
  'isDisabled' | 'isLoading'
>;

function UncontrolledRadioGroup(props: UncontrolledRadioGroupProps) {
  const [value, setValue] = useState<Maybe<string>>(null);

  return (
    <RadioGroup
      options={[
        { id: '1', title: 'Option 1' },
        { id: '2', title: 'Option 2' },
      ]}
      getOptionValue={(option) => option.id}
      getOptionLabel={(option) => option.title}
      value={value}
      onChange={setValue}
      {...props}
    />
  );
}

test('shows options', () => {
  customRender(<UncontrolledRadioGroup />);

  const radioGroup = screen.getByRole('radiogroup');
  expect(radioGroup).toBeInTheDocument();

  const option1 = screen.getByRole('radio', { name: 'Option 1' });
  expect(option1).not.toBeChecked();

  const option2 = screen.getByRole('radio', { name: 'Option 2' });
  expect(option2).not.toBeChecked();
});

test('checks clicked option', async () => {
  customRender(<UncontrolledRadioGroup />);

  const option1 = screen.getByRole('radio', { name: 'Option 1' });
  const option2 = screen.getByRole('radio', { name: 'Option 2' });

  expect(option1).not.toBeChecked();
  expect(option2).not.toBeChecked();

  await userEvent.click(option1);

  expect(option1).toBeChecked();
  expect(option2).not.toBeChecked();

  await userEvent.click(option2);

  expect(option1).not.toBeChecked();
  expect(option2).toBeChecked();
});

test('disables all options', () => {
  customRender(<UncontrolledRadioGroup isDisabled />);

  const radios = screen.getAllByRole('radio');

  for (let i = 0; i < radios.length; i++) {
    const radio = radios[i];
    expect(radio).toBeDisabled();
  }
});

test('shows skeleton when loading', () => {
  customRender(<UncontrolledRadioGroup isLoading />);

  const radios = screen.queryByRole('radio');

  expect(radios).not.toBeInTheDocument();

  const skeleton = screen.getByTestId('option-group-skeleton');

  expect(skeleton).toBeInTheDocument();
});
