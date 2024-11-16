'use client';

import type { Omit } from '@/core/shared/types';
import type { ButtonProps } from '@/core/ui/components/button';
import { Button } from '@/core/ui/components/button';
import { Loading } from '@/core/ui/components/loading';
import { useFormStatus } from 'react-dom';
import { twJoin, twMerge } from 'tailwind-merge';

type SubmitButtonProps = Omit<ButtonProps, 'type'>;

export function SubmitButton({
  className,
  children,
  ...rest
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      {...rest}
      className={twMerge(className, 'relative')}
      type="submit"
      disabled={pending}
    >
      <span className={twJoin(pending && 'opacity-40')}>{children}</span>
      {pending && <Loading className="absolute inset-0" />}
    </Button>
  );
}
