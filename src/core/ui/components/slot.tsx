import { Children, cloneElement, isValidElement } from 'react';
import { twMerge } from 'tailwind-merge';

export type AsChildProps<P = unknown> = SlotProps<P> & {
  asChild?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProps = Record<string, any>;

function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
  // Override all slot props by child props.
  const mergedProps = { ...slotProps, ...childProps };

  for (const propName of Object.keys(slotProps)) {
    if (propName === 'style') {
      // `style` prop of the slot is overriden.
      // Merge it by child's `style` prop instead of overriding it.
      if (childProps.style) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        mergedProps.style = { ...slotProps.style, ...childProps.style };
      }
      continue;
    }

    if (propName === 'className') {
      // `className` prop of the slot is overriden.
      // Merge it by child's `className` prop instead of overriding it.
      if (childProps.className) {
        mergedProps.className = twMerge(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          slotProps.className,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          childProps.className,
        );
      }
      continue;
    }

    // An event handler of the slot is overriden.
    // Merge it by child's event handler instead of overriding it.
    if (/^on[A-Z]/.test(propName) && childProps[propName]) {
      mergedProps[propName] = (...args: unknown[]) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        slotProps[propName](...args);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        childProps[propName](...args);
      };
    }
  }

  return mergedProps;
}

type SlotProps<P = unknown> = {
  children: React.ReactNode;
} & P;

export function Slot<P = unknown>({ children, ...rest }: SlotProps<P>) {
  if (Children.count(children) !== 1) {
    throw new Error('Slot should have only one child');
  }

  if (!isValidElement(children)) {
    throw new Error('Slot child is not a valid element');
  }

  return cloneElement(children, mergeProps(rest, children.props as AnyProps));
}
