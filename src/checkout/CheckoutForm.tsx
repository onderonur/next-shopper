import NumberInput from '@src/forms/NumberInput';
import SubmitButton from '@src/forms/SubmitButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import ErrorMessage from '@src/error-handling/ErrorMessage';
import { Maybe } from '@src/common/CommonTypes';
import { ApiRequestError } from '@src/error-handling/ErrorHandlingTypes';
import Form from '@src/forms/Form';
import {
  CompleteCheckoutArgs,
  completeCheckoutArgsSchema,
  defaultCompleteCheckoutArgs,
} from './CheckoutUtils';
import FormItem from '@src/forms/FormItem';
import Input from '@src/forms/Input';
import FormItemLabel from '@src/forms/FormItemLabel';
import CardExpiryInput from './CardExpiryInput';
import { zodResolver } from '@hookform/resolvers/zod';

type CheckoutFormProps = {
  error: Maybe<ApiRequestError>;
  onSubmit: SubmitHandler<CompleteCheckoutArgs>;
};

export default function CheckoutForm({ error, onSubmit }: CheckoutFormProps) {
  const { register, formState, handleSubmit } = useForm<CompleteCheckoutArgs>({
    resolver: zodResolver(completeCheckoutArgsSchema),
    defaultValues: defaultCompleteCheckoutArgs,
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <ErrorMessage error={error} />
      <FormItem error={formState.errors.nameSurname}>
        <FormItemLabel htmlFor="nameSurname">Name Surname</FormItemLabel>
        <Input
          id="nameSurname"
          placeholder="Name Surname"
          {...register('nameSurname')}
        />
      </FormItem>
      <FormItem error={formState.errors.cardNumber}>
        <FormItemLabel htmlFor="cardNumber">Card Number</FormItemLabel>
        <NumberInput
          id="cardNumber"
          format="#### #### #### ####"
          mask="_"
          placeholder="0000 0000 0000 0000"
          {...register('cardNumber')}
        />
      </FormItem>
      <div className="flex justify-between gap-4">
        <FormItem error={formState.errors.expiry}>
          <FormItemLabel htmlFor="expiry">Expiration Date</FormItemLabel>
          <CardExpiryInput id="expiry" {...register('expiry')} />
        </FormItem>
        <FormItem error={formState.errors.cvc}>
          <FormItemLabel htmlFor="cvc">CVC</FormItemLabel>
          <NumberInput
            id="cvc"
            mask="_"
            format="###"
            placeholder="000"
            {...register('cvc')}
          />
        </FormItem>
      </div>
      <div className="flex justify-end">
        <SubmitButton formState={formState}>Complete Checkout</SubmitButton>
      </div>
    </Form>
  );
}
