import { Maybe } from '@src/common/CommonTypes';
import List from '@src/common/List';
import ListItem from '@src/common/ListItem';
import OptionButton from './OptionButton';
import OptionGroupSkeleton from './OptionGroupSkeleton';

interface CheckboxGroupProps<Option> {
  isLoading?: boolean;
  isDisabled?: boolean;
  options: Maybe<Option[]>;
  getOptionLabel: (option: Option) => React.ReactNode;
  getOptionValue: (option: Option) => string;
  value: Maybe<string[]>;
  onChange: (value: string[]) => void;
}

function CheckboxGroup<Option>({
  isLoading,
  isDisabled,
  options,
  value,
  onChange,
  getOptionLabel,
  getOptionValue,
}: CheckboxGroupProps<Option>) {
  if (isLoading) {
    return <OptionGroupSkeleton />;
  }

  return (
    <List role="group">
      <ListItem>
        <OptionButton
          type="checkbox"
          isDisabled={isDisabled}
          isChecked={!value?.length}
          value={''}
          label={'All'}
          onChange={() => {
            onChange([]);
          }}
        />
      </ListItem>
      {options?.map((option) => {
        const optionValue = getOptionValue(option);
        const isChecked = !!value?.includes(optionValue);
        return (
          <ListItem key={optionValue}>
            <OptionButton
              type="checkbox"
              isDisabled={isDisabled}
              isChecked={isChecked}
              value={optionValue}
              label={getOptionLabel(option)}
              onChange={() => {
                if (value?.includes(optionValue)) {
                  onChange(value.filter((item) => item !== optionValue));
                } else {
                  onChange(value ? [...value, optionValue] : [optionValue]);
                }
              }}
            />
          </ListItem>
        );
      })}
    </List>
  );
}

export default CheckboxGroup;
