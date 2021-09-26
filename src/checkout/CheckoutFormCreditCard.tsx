import 'react-credit-cards/es/styles-compiled.css';
import { Control, useWatch } from 'react-hook-form';
import CreditCards, { Focused } from 'react-credit-cards';
import { DoCheckoutArgs } from '@src/api/checkout/checkoutService';
import { Maybe } from '@src/common/CommonTypes';

export interface CheckoutFormCreditCardProps {
  control: Control<DoCheckoutArgs>;
  focusedField: Maybe<Focused>;
}

function CheckoutFormCreditCard({
  control,
  focusedField,
}: CheckoutFormCreditCardProps) {
  const nameSurname = useWatch({ control, name: 'nameSurname' });
  const cardNumber = useWatch({ control, name: 'cardNumber' });
  const expiry = useWatch({ control, name: 'expiry' });
  const cvc = useWatch({ control, name: 'cvc' });

  return (
    <CreditCards
      name={nameSurname}
      number={cardNumber.split(' ').join('')}
      expiry={expiry}
      cvc={cvc}
      focused={focusedField ?? undefined}
    />
  );
}

export default CheckoutFormCreditCard;
