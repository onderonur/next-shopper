import { Maybe } from '@/common/CommonTypes';
import OptionButton from './OptionButton';
import OptionGroupSkeleton from './OptionGroupSkeleton';

type CheckboxGroupProps<Option> = {
  isLoading?: boolean;
  isDisabled?: boolean;
  options: Maybe<Option[]>;
  getOptionLabel: (option: Option) => React.ReactNode;
  getOptionValue: (option: Option) => string;
  value: Maybe<string[]>;
  onChange: (value: string[]) => void;
};

export default function CheckboxGroup<Option>({
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
    <div role="group">
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
      {options?.map((option) => {
        const optionValue = getOptionValue(option);
        const isChecked = !!value?.includes(optionValue);
        return (
          <OptionButton
            key={optionValue}
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
        );
      })}
    </div>
  );
}
