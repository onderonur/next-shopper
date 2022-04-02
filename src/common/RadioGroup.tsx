import { createMockArray } from './CommonUtils';
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
  value,
  onChange,
  getOptionLabel,
  getOptionValue,
}: RadioGroupSelectProps<Option, Value>) {
  return (
    <List role="radiogroup">
      {isLoading
        ? createMockArray(4).map((i) => {
            return (
              <ListItem key={i}>
                <RadioButtonSkeleton />
              </ListItem>
            );
          })
        : options.map((option, i) => {
            const optionValue = getOptionValue(option);
            const isChecked = value === optionValue;
            return (
              <ListItem
                key={`${getOptionValue(option)}_${i}`}
                role="radio"
                aria-checked={isChecked}
              >
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
          })}
    </List>
  );
}

export default RadioGroup;
