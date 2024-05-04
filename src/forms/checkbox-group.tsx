import { createSafeContext } from '@/common/safe-context';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { useId } from 'react';
import { Label } from './label';
import { getSelectableItemProps } from './selectable-item-utils';

type CheckboxGroupContextValue = {
  value: string[];
  onChange: (value: string[]) => void;
};

const [CheckboxGroupContext, useCheckboxGroupContext] =
  createSafeContext<CheckboxGroupContextValue>({
    displayName: 'CheckboxGroupContext',
  });

type CheckboxGroupProps = CheckboxGroupContextValue & React.PropsWithChildren;

export function CheckboxGroup({
  children,
  value,
  onChange,
}: CheckboxGroupProps) {
  return (
    <CheckboxGroupContext.Provider value={{ value, onChange }}>
      <div role="group">
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

type CheckboxProps = React.PropsWithChildren<{
  value: string | typeof allSymbol;
}>;

export function Checkbox({ value: checkboxValue, children }: CheckboxProps) {
  const id = useId();
  const { value, onChange } = useCheckboxGroupContext();

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
