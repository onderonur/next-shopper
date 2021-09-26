import List from './List';
import RadioButton from './RadioButton';
import RadioButtonSkeleton from './RadioButtonSkeleton';

interface RadioGroupSelectProps<Option, Value> {
  isLoading?: boolean;
  options: Option[];
  getOptionLabel: (option: Option) => React.ReactNode;
  getOptionValue: (option: Option) => Value;
  value: Value;
  onChange: (value: Value) => void;
}

function RadioGroup<Option, Value>({
  isLoading,
  options,
  getOptionLabel,
  getOptionValue,
  value,
  onChange,
}: RadioGroupSelectProps<Option, Value>) {
  return (
    <List
      role="radiogroup"
      items={options}
      getItemKey={(option, i) => i.toString()}
      isLoading={isLoading}
      skeletonCount={4}
      itemSkeleton={<RadioButtonSkeleton />}
      renderItem={(option) => {
        const optionValue = getOptionValue(option);
        const isChecked = value === optionValue;
        return (
          <RadioButton
            isChecked={isChecked}
            value={optionValue}
            label={getOptionLabel(option)}
            onChange={(newValue) => {
              onChange(newValue);
            }}
          />
        );
      }}
    />
  );
}

export default RadioGroup;
