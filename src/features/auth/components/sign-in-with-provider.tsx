'use client';

import { SubmitButton } from '@/core/forms/components/submit-button';
import type { Maybe } from '@/core/shared/types';
import Form from 'next/form';
import { signInWithProvider } from '../actions';

type SignInWithProviderProps = {
  providerId: string;
  callbackUrl: Maybe<string>;
  children: React.ReactNode;
};

export function SignInWithProvider({
  providerId,
  callbackUrl,
  children,
}: SignInWithProviderProps) {
  return (
    <Form
      action={async () => {
        await signInWithProvider({
          providerId,
          callbackUrl,
        });
      }}
    >
      <SubmitButton className="w-full">{children}</SubmitButton>
    </Form>
  );
}
