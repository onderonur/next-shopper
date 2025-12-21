import { useFormItemContext } from '@/core/forms/components/form-item';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@/core/ui/components/icons';
import * as RadixSelect from '@radix-ui/react-select';
import React from 'react';
import { twJoin } from 'tailwind-merge';

type SelectItemProps = Pick<
  RadixSelect.SelectItemProps,
  'value' | 'disabled' | 'children'
> & { ref?: React.Ref<HTMLDivElement> };

export function SelectItem({ children, ...rest }: SelectItemProps) {
  return (
    <RadixSelect.Item
      {...rest}
      className={twJoin(
        'relative flex cursor-pointer items-center rounded-sm py-2 pr-6 pl-1 select-none',
        'data-highlighted:bg-accent data-highlighted:outline-hidden',
        'data-[state=checked]:font-semibold',
      )}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className="text-muted-foreground absolute right-2 inline-flex w-4 items-center justify-center">
        <CheckIcon />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
}

type SelectProps = Pick<
  RadixSelect.SelectProps,
  'value' | 'onValueChange' | 'defaultValue' | 'disabled' | 'name' | 'children'
> &
  Pick<RadixSelect.SelectValueProps, 'placeholder'> & {
    ref?: React.Ref<HTMLButtonElement>;
  };

export function Select({ ref, placeholder, children, ...rest }: SelectProps) {
  const { inputId, isRequired, isInvalid, errorMessageId } =
    useFormItemContext();

  return (
    <RadixSelect.Root {...rest} required={isRequired}>
      <RadixSelect.Trigger
        ref={ref}
        id={inputId}
        className="text-foreground enabled:hover:bg-accent-hover aria-invalid:border-error data-placeholder:text-muted-foreground inline-flex items-center justify-between gap-1 rounded-sm border px-2 py-1 data-disabled:opacity-50"
        aria-invalid={isInvalid}
        aria-describedby={errorMessageId}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon className="text-muted-foreground text-sm">
          <ChevronDownIcon />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          className="bg-background w-(--radix-select-trigger-width) overflow-hidden rounded-md border shadow-md"
          position="popper"
        >
          <RadixSelect.ScrollUpButton className="flex cursor-default items-center justify-center">
            <ChevronUpIcon />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport className="p-2">
            {children}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className="flex cursor-default items-center justify-center text-sm">
            <ChevronDownIcon />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
