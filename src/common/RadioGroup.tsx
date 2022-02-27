import List from './List';
import ListItem from './ListItem';
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
    <List<Option>
      role="radiogroup"
      isLoading={isLoading}
      skeletonCount={4}
      itemSkeleton={<RadioButtonSkeleton />}
      items={options}
      getItemKey={(option, i) => `${getOptionValue(option)}_${i}`}
      renderItem={(option) => {
        const optionValue = getOptionValue(option);
        const isChecked = value === optionValue;
        return (
          <ListItem role="radio" aria-checked={isChecked}>
            <RadioButton
              isChecked={isChecked}
              value={optionValue}
              label={getOptionLabel(option)}
              onChange={(newValue) => {
                onChange(newValue);
              }}
            />
          </ListItem>
        );
      }}
    />
  );
}

export default RadioGroup;
