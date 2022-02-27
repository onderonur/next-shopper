import Input from '@src/forms/Input';
import NumberInput from '@src/forms/NumberInput';
import SubmitButton from '@src/forms/SubmitButton';
import { useYupValidationResolver } from '@src/forms/useYupValidationResolver';
import { SubmitHandler, useForm } from 'react-hook-form';
import 'react-credit-cards/es/styles-compiled.css';
import {
  DoCheckoutArgs,
  doCheckoutArgsSchema,
} from '@src/api/checkout/checkoutService';
import ErrorMessage from '@src/error-handling/ErrorMessage';
import { Maybe } from '@src/common/CommonTypes';
import { useFocusedField } from '@src/forms/useFocusedField';
import { ApiRequestError } from '@src/error-handling/ErrorHandlingTypes';
import Form from '@src/forms/Form';
import CheckoutFormCreditCard, {
  CheckoutFormCreditCardProps,
} from './CheckoutFormCreditCard';

const cardExpiryLimit = (val: string, max: string) => {
  if (val.length === 1 && val[0] > max[0]) {
    val = '0' + val;
  }

  if (val.length === 2) {
    if (Number(val) === 0) {
      val = '01';

      //this can happen when user paste number
    } else if (val > max) {
      val = max;
    }
  }

  return val;
};

const cardExpiryFormat = (val: string) => {
  const month = cardExpiryLimit(val.substring(0, 2), '12');
  const year = val.substring(2, 4);

  return month + (year.length ? '/' + year : '');
};

const defaultValues = doCheckoutArgsSchema.getDefault();

interface CheckoutFormProps {
  error: Maybe<ApiRequestError>;
  onSubmit: SubmitHandler<DoCheckoutArgs>;
}

function CheckoutForm({ error, onSubmit }: CheckoutFormProps) {
  const resolver = useYupValidationResolver(doCheckoutArgsSchema);
  const { control, formState, handleSubmit } = useForm<DoCheckoutArgs>({
    resolver,
    defaultValues,
  });

  const { focusedField, focusHandlers } =
    useFocusedField<CheckoutFormCreditCardProps['focusedField']>();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <CheckoutFormCreditCard control={control} focusedField={focusedField} />
      </div>
      <ErrorMessage error={error} />
      <Input
        label="Name Surname"
        name="nameSurname"
        control={control}
        placeholder="Name Surname"
        {...focusHandlers('name')}
      />
      <NumberInput
        label="Card Number"
        name="cardNumber"
        control={control}
        format="#### #### #### ####"
        mask="_"
        placeholder="0000 0000 0000 0000"
        {...focusHandlers('number')}
      />
      <div className="flex justify-between gap-4">
        <NumberInput
          label="Expiration Date"
          name="expiry"
          control={control}
          format={cardExpiryFormat}
          placeholder="MM/YY"
          {...focusHandlers('expiry')}
        />
        <NumberInput
          label="CVC"
          name="cvc"
          control={control}
          mask="_"
          format="###"
          placeholder="000"
          {...focusHandlers('cvc')}
        />
      </div>
      <div className="my-2 flex justify-end">
        <SubmitButton aria-label="Complete Checkout" formState={formState}>
          Checkout
        </SubmitButton>
      </div>
    </Form>
  );
}

export default CheckoutForm;
