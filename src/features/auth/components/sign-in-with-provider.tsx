'use client';

import { SubmitButton } from '@/core/forms/components/submit-button';
import Form from 'next/form';
import { useSearchParams } from 'next/navigation';
import { signInWithProvider } from '../actions';

type SignInWithProviderProps = {
  providerId: string;
  children: React.ReactNode;
};

export function SignInWithProvider({
  providerId,
  children,
}: SignInWithProviderProps) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  return (
    <Form
      className="w-full max-w-sm"
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
