'use client';

import { Form } from '@/forms/form';
import {
  FormItem,
  FormItemErrorMessage,
  FormItemLabel,
} from '@/forms/form-item';
import { Input } from '@/forms/input';
import { PatternFormatInput } from '@/forms/pattern-format-input';
import { Select, SelectItem } from '@/forms/select';
import { SubmitButton } from '@/forms/submit-button';
import type { Continent } from '@/shipping/shipping-types';
import { useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { completeCheckout } from '../checkout/checkout-actions';

type ShippingFormProps = {
  continents: Continent[];
};

export function ShippingForm({ continents }: ShippingFormProps) {
  const formRef = useRef<React.ElementRef<'form'>>(null);
  const [state, formAction] = useFormState(completeCheckout, null);
  const fieldErrors = state?.success ? null : state?.fieldErrors;

  const [continentId, setContinentId] = useState<string>('');
  const [regionId, setRegionId] = useState<string>('');
  const [cityId, setCityId] = useState<string>('');

  const continent = continents.find(
    (continent) => continent.id === continentId,
  );
  const regions = continent?.regions;
  const region = regions?.find((region) => region.id === regionId);
  const cities = region?.cities;

  return (
    <Form
      ref={formRef}
      action={(formData) => {
        // Normally we don't need these.
        // But Radix `Select` sets its first `SelectItem` as the value
        // in the `formData` when its `value` prop is an empty string
        // or when it's not in the `SelectItem` values.
        // This issue does not occur when the components are uncontrolled.
        // So, we change the values in `formData` here as a hack.
        formData.set('continentId', continentId);
        formData.set('regionId', regionId);
        formData.set('cityId', cityId);
        formAction(formData);
      }}
    >
      <FormItem isRequired errorMessages={fieldErrors?.continentId?._errors}>
        <FormItemLabel>Continent</FormItemLabel>
        <Select
          name="continentId"
          placeholder="Continent"
          value={continentId}
          onValueChange={(value) => {
            setContinentId(value);
            setRegionId('');
            setCityId('');
          }}
        >
          {continents.map((continent) => {
            return (
              <SelectItem key={continent.id} value={continent.id}>
                {continent.name}
              </SelectItem>
            );
          })}
        </Select>
        <FormItemErrorMessage />
      </FormItem>
      <div className="flex gap-2">
        <FormItem isRequired errorMessages={fieldErrors?.regionId?._errors}>
          <FormItemLabel>Region</FormItemLabel>
          <Select
            name="regionId"
            placeholder="Region"
            disabled={!continentId}
            value={regionId}
            onValueChange={(value) => {
              setRegionId(value);
              setCityId('');
            }}
          >
            {regions?.map((region) => {
              return (
                <SelectItem key={region.id} value={region.id}>
                  {region.name}
                </SelectItem>
              );
            })}
          </Select>
          <FormItemErrorMessage />
        </FormItem>
        <FormItem isRequired errorMessages={fieldErrors?.cityId?._errors}>
          <FormItemLabel>City</FormItemLabel>
          <Select
            name="cityId"
            placeholder="City"
            disabled={!regionId}
            value={cityId}
            onValueChange={(value) => {
              setCityId(value);
            }}
          >
            {cities?.map((city) => {
              return (
                <SelectItem key={city.id} value={city.id}>
                  {city.name}
                </SelectItem>
              );
            })}
          </Select>
          <FormItemErrorMessage />
        </FormItem>
      </div>
      <FormItem isRequired errorMessages={fieldErrors?.address?._errors}>
        <FormItemLabel>Address</FormItemLabel>
        <Input name="address" placeholder="Address" />
        <FormItemErrorMessage />
      </FormItem>
      <FormItem isRequired errorMessages={fieldErrors?.phone?._errors}>
        <FormItemLabel>Phone</FormItemLabel>
        <PatternFormatInput
          name="phone"
          type="tel"
          mask="_"
          format="+1 (###) #### ###"
        />
        <FormItemErrorMessage />
      </FormItem>
      <FormItem isRequired errorMessages={fieldErrors?.email?._errors}>
        <FormItemLabel>E-mail</FormItemLabel>
        <Input name="email" type="email" placeholder="E-mail" />
        <FormItemErrorMessage />
      </FormItem>
      <div className="flex justify-end">
        <SubmitButton variant="primary">Complete Checkout</SubmitButton>
      </div>
    </Form>
  );
}
