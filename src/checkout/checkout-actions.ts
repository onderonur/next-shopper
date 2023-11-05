'use server';

import { cookies } from 'next/headers';
import type { CompleteCheckoutArgs } from './checkout-utils';
import { completeCheckoutArgsSchema } from './checkout-utils';
import type { ServerActionResult } from '@/server-actions/server-action-types';
import { redirect } from 'next/navigation';

// Server actions should be async functions.
// eslint-disable-next-line @typescript-eslint/require-await
export async function completeCheckout(
  currentState: ServerActionResult<CompleteCheckoutArgs, never> | null,
  formData: FormData,
): Promise<ServerActionResult<CompleteCheckoutArgs, never>> {
  const input = {
    nameSurname: formData.get('nameSurname'),
    cardNumber: formData.get('cardNumber'),
    expiry: formData.get('expiry'),
    cvc: formData.get('cvc'),
  };

  const inputResult = completeCheckoutArgsSchema.safeParse(input);

  if (!inputResult.success) {
    return { success: false, fieldErrors: inputResult.error.format() };
  }

  const cookieStore = cookies();

  cookieStore.delete('cart');

  redirect('/checkout/success');
}
