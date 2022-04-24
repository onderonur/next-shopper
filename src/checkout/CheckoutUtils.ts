import * as Yup from 'yup';
import cardValidator from 'card-validator';

export const completeCheckoutArgsSchema = Yup.object({
  nameSurname: Yup.string()
    .required()
    .test(
      'nameSurnameText',
      ({ label }) => `${label} is invalid`,
      (value) => cardValidator.cardholderName(value).isValid,
    )
    .label('Name Surname')
    .default(''),
  cardNumber: Yup.string()
    .required()
    .test(
      'cardNumberTest',
      ({ label }) => `${label} is invalid`,
      (value) => cardValidator.number(value).isValid,
    )
    .label('Card Number')
    .default(''),
  expiry: Yup.string()
    .required()
    .test(
      'expiryTest',
      ({ label }) => `${label} is invalid`,
      (value) => cardValidator.expirationDate(value).isValid,
    )
    .label('Expiration Date')
    .default(''),
  cvc: Yup.string()
    .required()
    .test(
      'cvcTest',
      ({ label }) => `${label} is invalid`,
      (value) => cardValidator.cvv(value).isValid,
    )
    .label('CVC')
    .default(''),
});

export type CompleteCheckoutArgs = Yup.TypeOf<
  typeof completeCheckoutArgsSchema
>;
