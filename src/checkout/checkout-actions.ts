'use server';

import { cookies } from 'next/headers';
import {
  CompleteCheckoutArgs,
  completeCheckoutArgsSchema,
} from './checkout-utils';
import { ServerActionResult } from '@/server-actions/server-action-types';
import { redirect } from 'next/navigation';

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

  const inputResult = await completeCheckoutArgsSchema.safeParse(input);

  if (!inputResult.success) {
    return { success: false, fieldErrors: inputResult.error.format() };
  }

  const cookieStore = cookies();

  cookieStore.delete('cart');

  redirect('/checkout/success');
}
