import * as Yup from 'yup';
import cardValidator from 'card-validator';
import { ERROR_MESSAGES } from '@src/error-handling/ErrorHandlingUtils';

export const completeCheckoutArgsSchema = Yup.object({
  nameSurname: Yup.string()
    .required()
    .test(
      'nameSurnameText',
      ({ label }) => ERROR_MESSAGES.invalid(label),
      (value) => cardValidator.cardholderName(value).isValid,
    )
    .label('Name Surname')
    .default(''),
  cardNumber: Yup.string()
    .required()
    .test(
      'cardNumberTest',
      ({ label }) => ERROR_MESSAGES.invalid(label),
      (value) => cardValidator.number(value).isValid,
    )
    .label('Card Number')
    .default(''),
  expiry: Yup.string()
    .required()
    .test(
      'expiryTest',
      ({ label }) => ERROR_MESSAGES.invalid(label),
      (value) => cardValidator.expirationDate(value).isValid,
    )
    .label('Expiration Date')
    .default(''),
  cvc: Yup.string()
    .required()
    .test(
      'cvcTest',
      ({ label }) => ERROR_MESSAGES.invalid(label),
      (value) => cardValidator.cvv(value).isValid,
    )
    .label('CVC')
    .default(''),
});

export type CompleteCheckoutArgs = Yup.TypeOf<
  typeof completeCheckoutArgsSchema
>;
