import NumberInput from '@src/forms/NumberInput';
import SubmitButton from '@src/forms/SubmitButton';
import { useYupValidationResolver } from '@src/forms/useYupValidationResolver';
import { SubmitHandler, useForm } from 'react-hook-form';
import 'react-credit-cards/es/styles-compiled.css';
import ErrorMessage from '@src/error-handling/ErrorMessage';
import { Maybe } from '@src/common/CommonTypes';
import { useFocusedField } from '@src/forms/useFocusedField';
import { ApiRequestError } from '@src/error-handling/ErrorHandlingTypes';
import Form from '@src/forms/Form';
import CheckoutFormCreditCard from './CheckoutFormCreditCard';
import { DoCheckoutArgs, doCheckoutArgsSchema } from './CheckoutUtils';
import FormItem from '@src/forms/FormItem';
import Input from '@src/forms/Input';

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
  const { register, formState, handleSubmit, watch } = useForm<DoCheckoutArgs>({
    resolver,
    defaultValues,
  });

  const { focusedField, focusHandlers } = useFocusedField<DoCheckoutArgs>();

  const values = watch();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <CheckoutFormCreditCard values={values} focusedField={focusedField} />
      </div>
      <ErrorMessage error={error} />
      <FormItem label="Name Surname" error={formState.errors.nameSurname}>
        <Input
          placeholder="Name Surname"
          {...focusHandlers(register('nameSurname'))}
        />
      </FormItem>
      <FormItem label="Card Number" error={formState.errors.cardNumber}>
        <NumberInput
          format="#### #### #### ####"
          mask="_"
          placeholder="0000 0000 0000 0000"
          {...focusHandlers(register('cardNumber'))}
        />
      </FormItem>
      <div className="flex justify-between gap-4">
        <FormItem label="Expiration Date" error={formState.errors.expiry}>
          <NumberInput
            format={cardExpiryFormat}
            placeholder="MM/YY"
            {...focusHandlers(register('expiry'))}
          />
        </FormItem>
        <FormItem label="CVC" error={formState.errors.cvc}>
          <NumberInput
            mask="_"
            format="###"
            placeholder="000"
            {...focusHandlers(register('cvc'))}
          />
        </FormItem>
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
