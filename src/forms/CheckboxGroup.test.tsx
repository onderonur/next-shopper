import { screen } from '@testing-library/react';
import { useState } from 'react';
import CheckboxGroup, { CheckboxGroupProps } from './CheckboxGroup';
import userEvent from '@testing-library/user-event';
import { Maybe } from '@src/common/CommonTypes';
import { customRender } from '@src/testing/TestingUtils';

type UncontrolledCheckboxGroupProps = Pick<
  CheckboxGroupProps<{
    id: string;
    title: string;
  }>,
  'isDisabled' | 'isLoading'
>;

function UncontrolledCheckboxGroup(props: UncontrolledCheckboxGroupProps) {
  const [value, setValue] = useState<Maybe<string[]>>(null);

  return (
    <CheckboxGroup
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
  customRender(<UncontrolledCheckboxGroup />);

  const checkboxes = screen.getAllByRole('checkbox');
  expect(checkboxes).toHaveLength(3);

  const allOption = screen.getByRole('checkbox', { name: 'All' });
  expect(allOption).toBeChecked();

  const option1 = screen.getByRole('checkbox', { name: 'Option 1' });
  expect(option1).not.toBeChecked();

  const option2 = screen.getByRole('checkbox', { name: 'Option 2' });
  expect(option2).not.toBeChecked();
});

test('checks multiple options', async () => {
  customRender(<UncontrolledCheckboxGroup />);

  const allOption = screen.getByRole('checkbox', { name: 'All' });
  const option1 = screen.getByRole('checkbox', { name: 'Option 1' });
  const option2 = screen.getByRole('checkbox', { name: 'Option 2' });

  expect(allOption).toBeChecked();
  expect(option1).not.toBeChecked();
  expect(option2).not.toBeChecked();

  await userEvent.click(option1);

  expect(allOption).not.toBeChecked();
  expect(option1).toBeChecked();
  expect(option2).not.toBeChecked();

  await userEvent.click(option2);

  expect(allOption).not.toBeChecked();
  expect(option1).toBeChecked();
  expect(option2).toBeChecked();
});

test('unchecks other options when "All" is clicked', async () => {
  customRender(<UncontrolledCheckboxGroup />);

  const allOption = screen.getByRole('checkbox', { name: 'All' });
  const option1 = screen.getByRole('checkbox', { name: 'Option 1' });
  const option2 = screen.getByRole('checkbox', { name: 'Option 2' });

  await userEvent.click(option1);
  await userEvent.click(option2);

  expect(allOption).not.toBeChecked();
  expect(option1).toBeChecked();
  expect(option2).toBeChecked();

  await userEvent.click(allOption);

  expect(allOption).toBeChecked();
  expect(option1).not.toBeChecked();
  expect(option2).not.toBeChecked();
});

test('unchecks checked option when it is clicked except "All"', async () => {
  customRender(<UncontrolledCheckboxGroup />);

  const option1 = screen.getByRole('checkbox', { name: 'Option 1' });

  await userEvent.click(option1);

  expect(option1).toBeChecked();

  await userEvent.click(option1);

  expect(option1).not.toBeChecked();

  const allOption = screen.getByRole('checkbox', { name: 'All' });

  expect(allOption).toBeChecked();

  await userEvent.click(allOption);

  expect(allOption).toBeChecked();
});

test('disables all options', () => {
  customRender(<UncontrolledCheckboxGroup isDisabled />);

  const checkboxes = screen.getAllByRole('checkbox');

  for (let i = 0; i < checkboxes.length; i++) {
    const checkbox = checkboxes[i];
    expect(checkbox).toBeDisabled();
  }
});

test('shows skeleton when loading', () => {
  customRender(<UncontrolledCheckboxGroup isLoading />);

  const checkboxes = screen.queryByRole('checkbox');

  expect(checkboxes).not.toBeInTheDocument();

  const skeleton = screen.getByTestId('option-group-skeleton');

  expect(skeleton).toBeInTheDocument();
});
