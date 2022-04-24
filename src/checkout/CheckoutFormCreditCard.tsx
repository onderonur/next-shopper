import 'react-credit-cards/es/styles-compiled.css';
import CreditCards, { Focused } from 'react-credit-cards';
import { Maybe } from '@src/common/CommonTypes';
import { CompleteCheckoutArgs } from './CheckoutUtils';
import { FieldPath } from 'react-hook-form';

interface CheckoutFormCreditCardProps {
  values: CompleteCheckoutArgs;
  focusedField: Maybe<FieldPath<CompleteCheckoutArgs>>;
}

const focusedFieldByFieldPath: Record<
  FieldPath<CompleteCheckoutArgs>,
  Focused
> = {
  nameSurname: 'name',
  cardNumber: 'number',
  expiry: 'expiry',
  cvc: 'cvc',
};

function CheckoutFormCreditCard({
  values,
  focusedField,
}: CheckoutFormCreditCardProps) {
  return (
    <CreditCards
      name={values.nameSurname}
      number={values.cardNumber.split(' ').join('')}
      expiry={values.expiry}
      cvc={values.cvc}
      focused={focusedField ? focusedFieldByFieldPath[focusedField] : undefined}
    />
  );
}

export default CheckoutFormCreditCard;
