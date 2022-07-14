import { Maybe } from '@src/common/CommonTypes';
import OptionButton from './OptionButton';
import OptionGroupSkeleton from './OptionGroupSkeleton';

export interface RadioGroupProps<Option> {
  isLoading?: boolean;
  isDisabled?: boolean;
  options: Maybe<Option[]>;
  getOptionLabel: (option: Option) => React.ReactNode;
  getOptionValue: (option: Option) => string;
  value: Maybe<string>;
  onChange: (value: string) => void;
}

function RadioGroup<Option>({
  isLoading,
  isDisabled,
  options,
  value,
  onChange,
  getOptionLabel,
  getOptionValue,
}: RadioGroupProps<Option>) {
  if (isLoading) {
    return <OptionGroupSkeleton />;
  }

  return (
    <div role="radiogroup">
      {options?.map((option) => {
        const optionValue = getOptionValue(option);
        const isChecked = value === optionValue;
        return (
          <OptionButton
            key={optionValue}
            type="radio"
            isChecked={isChecked}
            isDisabled={isDisabled}
            value={optionValue}
            label={getOptionLabel(option)}
            onChange={(newValue) => {
              onChange(newValue);
            }}
          />
        );
      })}
    </div>
  );
}

export default RadioGroup;
