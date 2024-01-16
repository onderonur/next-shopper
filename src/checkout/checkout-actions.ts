'use server';

import { ERROR_MESSAGES } from '@/error-handling/error-handling-utils';
import type { ServerActionResult } from '@/server-actions/server-action-types';
import cardValidator from 'card-validator';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const completeCheckoutArgsSchema = z.object({
  nameSurname: z
    .string()
    .min(1, ERROR_MESSAGES.required('Name Surname'))
    .refine(
      (value) => cardValidator.cardholderName(value).isValid,
      ERROR_MESSAGES.invalid('Name Surname'),
    ),
  cardNumber: z
    .string()
    .min(1, ERROR_MESSAGES.required('Card Number'))
    .refine(
      (value) => cardValidator.number(value).isValid,
      ERROR_MESSAGES.invalid('Card Number'),
    ),
  expiry: z
    .string()
    .min(1, ERROR_MESSAGES.required('Expiration Date'))
    .refine(
      (value) => cardValidator.expirationDate(value).isValid,
      ERROR_MESSAGES.invalid('Expiration Date'),
    ),
  cvc: z
    .string()
    .min(1, ERROR_MESSAGES.required('CVC'))
    .refine(
      (value) => cardValidator.cvv(value).isValid,
      ERROR_MESSAGES.invalid('CVC'),
    ),
});

type CompleteCheckoutArgs = z.infer<typeof completeCheckoutArgsSchema>;

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
