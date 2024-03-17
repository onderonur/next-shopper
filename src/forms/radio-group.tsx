import type { Maybe } from '@/common/common-types';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { useId } from 'react';
import { twMerge } from 'tailwind-merge';
import { Label } from './label';
import { useSelectableItemProps } from './selectable-item-hooks';

type RadioGroupProps = React.PropsWithChildren<{
  value: Maybe<string>;
  onChange: (value: string) => void;
}>;

export function RadioGroup({ value, children, onChange }: RadioGroupProps) {
  return (
    <RadixRadioGroup.Root
      className="flex flex-col gap-1"
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
