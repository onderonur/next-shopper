import type { Maybe } from '@/common/common-types';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { Label } from './label';
import { SelectableGroupSkeleton } from './selectable-group-skeleton';
import { useSelectableItemProps } from './selectable-item-hooks';

type RadioGroupProps = React.PropsWithChildren<{
  isLoading?: boolean;
  isDisabled?: boolean;
  value: Maybe<string>;
  onChange: (value: string) => void;
}>;

export function RadioGroup({
  isLoading,
  isDisabled,
  value,
  children,
  onChange,
}: RadioGroupProps) {
  if (isLoading) {
    return <SelectableGroupSkeleton optionCount={2} />;
  }

  return (
    <RadixRadioGroup.Root
      className="flex flex-col gap-1"
      disabled={isDisabled}
      value={value ?? ''}
      onValueChange={onChange}
    >
      {children}
    </RadixRadioGroup.Root>
  );
}

type RadioGroupItemProps = React.PropsWithChildren<{
  value: string;
}>;

export function RadioGroupItem({ value, children }: RadioGroupItemProps) {
  const id = useId();

  const {
    rootClassName,
    itemClassName,
    indicatorClassName,
    icon,
    labelClassName,
  } = useSelectableItemProps();

  return (
    <div className={rootClassName}>
      <RadixRadioGroup.Item
        className={twMerge(itemClassName, 'rounded-full')}
        id={id}
        value={value}
      >
        <RadixRadioGroup.Indicator className={indicatorClassName}>
          {icon}
        </RadixRadioGroup.Indicator>
      </RadixRadioGroup.Item>
      <Label htmlFor={id} className={labelClassName}>
        {children}
      </Label>
    </div>
  );
}
