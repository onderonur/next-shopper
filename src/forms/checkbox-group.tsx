import { createSafeContext } from '@/common/safe-context';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { useId } from 'react';
import { Label } from './label';
import { SelectableGroupSkeleton } from './selectable-group-skeleton';
import { useSelectableItemProps } from './selectable-item-hooks';

type CheckboxGroupContextValue = {
  isDisabled?: boolean;
  value: string[];
  onChange: (value: string[]) => void;
};

const [CheckboxGroupContext, useCheckboxGroupContext] =
  createSafeContext<CheckboxGroupContextValue>({
    displayName: 'CheckboxGroupContext',
  });

type CheckboxGroupProps = CheckboxGroupContextValue &
  React.PropsWithChildren<{
    isLoading?: boolean;
  }>;

export function CheckboxGroup({
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

export function Checkbox({ value: checkboxValue, children }: CheckboxProps) {
  const id = useId();
  const { isDisabled, value, onChange } = useCheckboxGroupContext();

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
