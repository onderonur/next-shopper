import { Label } from '@/core/forms/components/label';
import { getSelectableItemProps } from '@/core/forms/forms.utils';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { createContext, useContext, useId } from 'react';

type CheckboxGroupContextValue = {
  value: string[];
  onChange: (value: string[]) => void;
};

const CheckboxGroupContext = createContext<CheckboxGroupContextValue>(
  {} as CheckboxGroupContextValue,
);

type CheckboxGroupProps = React.AriaAttributes &
  CheckboxGroupContextValue & {
    children: React.ReactNode;
  };

export function CheckboxGroup({
  children,
  value,
  onChange,
  ...rest
}: CheckboxGroupProps) {
  return (
    <CheckboxGroupContext.Provider value={{ value, onChange }}>
      <div role="group" {...rest}>
        <Checkbox value={allSymbol}>All</Checkbox>
        {children}
      </div>
    </CheckboxGroupContext.Provider>
  );
}

const allSymbol = Symbol('all');

const {
  rootClassName,
  itemClassName,
  indicatorClassName,
  icon,
  labelClassName,
} = getSelectableItemProps();

type CheckboxProps = {
  value: string | typeof allSymbol;
  children: React.ReactNode;
};

export function Checkbox({ value: checkboxValue, children }: CheckboxProps) {
  const id = useId();
  const { value, onChange } = useContext(CheckboxGroupContext);

  const isAllOption = checkboxValue === allSymbol;

  return (
    <div className={rootClassName}>
      <RadixCheckbox.Root
        className={itemClassName}
        id={id}
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
