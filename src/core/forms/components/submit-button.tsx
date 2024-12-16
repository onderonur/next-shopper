'use client';

import type { Omit } from '@/core/shared/types';
import type { ButtonProps } from '@/core/ui/components/button';
import { Button } from '@/core/ui/components/button';
import { Loading } from '@/core/ui/components/loading';
import { useFormStatus } from 'react-dom';
import { twJoin, twMerge } from 'tailwind-merge';

type SubmitButtonProps = Omit<ButtonProps, 'type'> & {
  isOptimistic?: boolean;
};

export function SubmitButton({
  className,
  isOptimistic,
  children,
  ...rest
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  // To not show loading spinner when a form submission has optimistic state.
  const isLoading = isOptimistic ? false : pending;

  return (
    <Button
      {...rest}
      className={twMerge(className, 'relative')}
      type="submit"
      disabled={isLoading}
    >
      <span
        className={twJoin(
          'inline-flex items-center gap-2',
          isLoading && 'opacity-40',
        )}
      >
        {children}
      </span>
      {isLoading && <Loading className="absolute inset-0" />}
    </Button>
  );
}
