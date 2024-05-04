import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@/common/icons';
import * as RadixSelect from '@radix-ui/react-select';
import React, { forwardRef } from 'react';
import { twJoin } from 'tailwind-merge';
import { useFormItemContext } from './form-item';

type SelectItemProps = Pick<
  RadixSelect.SelectItemProps,
  'value' | 'disabled' | 'children'
>;

export const SelectItem = forwardRef<
  React.ElementRef<typeof RadixSelect.Item>,
  SelectItemProps
>(function SelectItem({ children, ...rest }, ref) {
  return (
    <RadixSelect.Item
      {...rest}
      ref={ref}
      className={twJoin(
        'relative flex cursor-pointer select-none items-center rounded py-2 pl-1 pr-6',
        'data-[highlighted]:bg-accent data-[highlighted]:outline-none',
        'data-[state=checked]:font-semibold',
      )}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className="absolute right-2 inline-flex w-4 items-center justify-center text-muted-foreground">
        <CheckIcon />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
});

type SelectProps = Pick<
  RadixSelect.SelectProps,
  'children' | 'value' | 'onValueChange' | 'defaultValue' | 'disabled' | 'name'
> &
  Pick<RadixSelect.SelectValueProps, 'placeholder'>;

export const Select = forwardRef<
  React.ElementRef<typeof RadixSelect.Trigger>,
  SelectProps
>(function Select({ placeholder, children, ...rest }, ref) {
  const { inputId, isRequired, isInvalid, errorMessageId } =
    useFormItemContext();

  return (
    <RadixSelect.Root {...rest} required={isRequired}>
      <RadixSelect.Trigger
        ref={ref}
        id={inputId}
        className="inline-flex items-center justify-between gap-1 rounded border px-2 py-1 text-foreground enabled:hover:bg-accent-hover aria-invalid:border-error data-[placeholder]:text-muted-foreground data-[disabled]:opacity-50"
        aria-invalid={isInvalid}
        aria-describedby={errorMessageId}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon className="text-muted-foreground">
          <ChevronDownIcon />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          className="w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border bg-background shadow-md"
          position="popper"
        >
          <RadixSelect.ScrollUpButton className="flex cursor-default items-center justify-center">
            <ChevronUpIcon />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport className="p-2">
            {children}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className="flex cursor-default items-center justify-center">
            <ChevronDownIcon />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
});
