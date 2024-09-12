'use client';

import type { Omit } from '@/core/shared/shared.types';
import type { ButtonProps } from '@/core/ui/components/button';
import { Button } from '@/core/ui/components/button';
import { useFormStatus } from 'react-dom';

type SubmitButtonProps = Omit<ButtonProps, 'type' | 'isLoading'>;

export function SubmitButton(props: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return <Button {...props} type="submit" isLoading={pending} />;
}
