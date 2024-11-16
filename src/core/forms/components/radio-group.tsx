import { Label } from '@/core/forms/components/label';
import { getSelectableItemProps } from '@/core/forms/utils';
import type { Maybe } from '@/core/shared/types';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { useId } from 'react';
import { twMerge } from 'tailwind-merge';

type RadioGroupProps = React.AriaAttributes & {
  value: Maybe<string>;
  children: React.ReactNode;
  onChange: (value: string) => void;
};

export function RadioGroup({
  value,
  children,
  onChange,
  ...rest
}: RadioGroupProps) {
  return (
    <RadixRadioGroup.Root
      className="flex flex-col gap-1"
      value={value ?? ''}
      onValueChange={onChange}
      {...rest}
    >
      {children}
    </RadixRadioGroup.Root>
  );
}

const {
  rootClassName,
  itemClassName,
  indicatorClassName,
  icon,
  labelClassName,
} = getSelectableItemProps();

type RadioGroupItemProps = {
  value: string;
  children: React.ReactNode;
};

export function RadioGroupItem({ value, children }: RadioGroupItemProps) {
  const id = useId();

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
