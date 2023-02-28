import cardValidator from 'card-validator';
import { ERROR_MESSAGES } from '@/error-handling/ErrorHandlingUtils';
import { z } from 'zod';

export const completeCheckoutArgsSchema = z.object({
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

export type CompleteCheckoutArgs = z.infer<typeof completeCheckoutArgsSchema>;

export const defaultCompleteCheckoutArgs: CompleteCheckoutArgs = {
  nameSurname: '',
  cardNumber: '',
  expiry: '',
  cvc: '',
};
