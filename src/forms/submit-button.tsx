'use client';

import type { ButtonProps } from '@/common/button';
import { Button } from '@/common/button';
import type { Omit } from '@/common/common-types';
import { useFormStatus } from 'react-dom';

type SubmitButtonProps = Omit<ButtonProps, 'type' | 'isLoading'>;

export function SubmitButton(props: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return <Button {...props} type="submit" isLoading={pending} />;
}
