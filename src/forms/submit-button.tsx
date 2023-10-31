'use client';

import Button, { ButtonProps } from '@/common/button';
import { Omit } from '@/common/common-types';
import { useFormStatus } from 'react-dom';

type SubmitButtonProps = Omit<ButtonProps, 'type' | 'isLoading'>;

export default function SubmitButton(props: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return <Button type="submit" isLoading={pending} {...props} />;
}
