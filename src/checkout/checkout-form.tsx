'use client';

import PatternFormatInput from '@/forms/pattern-format-input';
import SubmitButton from '@/forms/submit-button';
import Form from '@/forms/form';
import FormItem from '@/forms/form-item';
import Input from '@/forms/input';
import FormItemLabel from '@/forms/form-item-label';
import CardExpiryInput from './card-expiry-input';
import { completeCheckout } from './checkout-actions';
import FormItemErrorMessage from '@/forms/form-item-error-message';
import { useFormState } from 'react-dom';
import { useRef } from 'react';

export default function CheckoutForm() {
  const formRef = useRef<React.ElementRef<'form'>>(null);
  const [state, formAction] = useFormState(completeCheckout, null);
  const fieldErrors = state?.success ? null : state?.fieldErrors;

  return (
    <Form ref={formRef} action={formAction}>
      <FormItem errorMessages={fieldErrors?.nameSurname?._errors}>
        <FormItemLabel htmlFor="nameSurname">Name Surname</FormItemLabel>
        <Input id="nameSurname" name="nameSurname" placeholder="Name Surname" />
        <FormItemErrorMessage />
      </FormItem>
      <FormItem errorMessages={fieldErrors?.cardNumber?._errors}>
        <FormItemLabel htmlFor="cardNumber">Card Number</FormItemLabel>
        <PatternFormatInput
          id="cardNumber"
          name="cardNumber"
          mask="_"
          format="#### #### #### ####"
          placeholder="0000 0000 0000 0000"
        />
        <FormItemErrorMessage />
      </FormItem>
      <div className="flex justify-between gap-2">
        <FormItem errorMessages={fieldErrors?.expiry?._errors}>
          <FormItemLabel htmlFor="expiry">Expiration Date</FormItemLabel>
          <CardExpiryInput id="expiry" name="expiry" />
          <FormItemErrorMessage />
        </FormItem>
        <FormItem errorMessages={fieldErrors?.cvc?._errors}>
          <FormItemLabel htmlFor="cvc">CVC</FormItemLabel>
          <PatternFormatInput
            id="cvc"
            name="cvc"
            mask="_"
            format="###"
            placeholder="000"
          />
          <FormItemErrorMessage />
        </FormItem>
      </div>
      <div className="flex justify-end">
        <SubmitButton variant="primary">Complete Checkout</SubmitButton>
      </div>
    </Form>
  );
}
