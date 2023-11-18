import SelectableGroupSkeleton from './selectable-group-skeleton';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { Label } from './label';
import { createContext, useContext, useId } from 'react';
import { useSelectableItemProps } from './selectable-item-hooks';

type CheckboxGroupContextValue = {
  isDisabled?: boolean;
  value: string[];
  onChange: (value: string[]) => void;
};

const CheckboxGroupContext = createContext<CheckboxGroupContextValue>(
  {} as CheckboxGroupContextValue,
);

type CheckboxGroupProps = CheckboxGroupContextValue &
  React.PropsWithChildren<{
    isLoading?: boolean;
  }>;

function CheckboxGroup({
  isLoading,
  isDisabled,
  children,
  value,
  onChange,
}: CheckboxGroupProps) {
  if (isLoading) {
    return <SelectableGroupSkeleton optionCount={5} />;
  }

  return (
    <CheckboxGroupContext.Provider value={{ isDisabled, value, onChange }}>
      <div role="group">
        <Checkbox value={allSymbol}>All</Checkbox>
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  );
}

const allSymbol = Symbol('all');

type CheckboxProps = React.PropsWithChildren<{
  value: string | typeof allSymbol;
}>;

function Checkbox({ value: checkboxValue, children }: CheckboxProps) {
  const id = useId();
  const { isDisabled, value, onChange } = useContext(CheckboxGroupContext);

  const isAllOption = checkboxValue === allSymbol;

  const {
    rootClassName,
    itemClassName,
    indicatorClassName,
    icon,
    labelClassName,
  } = useSelectableItemProps();

  return (
    <div className={rootClassName}>
      <RadixCheckbox.Root
        className={itemClassName}
        id={id}
        disabled={isDisabled}
        checked={isAllOption ? !value.length : value.includes(checkboxValue)}
        onCheckedChange={() => {
          if (isAllOption) {
            onChange([]);
          } else if (value.includes(checkboxValue)) {
            onChange(value.filter((item) => item !== checkboxValue));
          } else {
            onChange([...value, checkboxValue]);
          }
        }}
      >
        <RadixCheckbox.Indicator className={indicatorClassName}>
          {icon}
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      <Label htmlFor={id} className={labelClassName}>
        {children}
      </Label>
    </div>
  );
}

export { CheckboxGroup, Checkbox };
