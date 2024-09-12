'use client';

import { Form } from '@/core/forms/components/form';
import {
  FormItem,
  FormItemErrorMessage,
  FormItemLabel,
} from '@/core/forms/components/form-item';
import { Select, SelectItem } from '@/core/forms/components/select';
import { SubmitButton } from '@/core/forms/components/submit-button';
import { Card, CardContent, CardFooter } from '@/core/ui/components/card';
import { completeCheckout } from '@/features/checkout/checkout.actions';
import type { ContinentWithChildren } from '@/features/shipping/shipping.types';
import { useState } from 'react';
import { useFormState } from 'react-dom';

type ShippingFormProps = {
  continents: ContinentWithChildren[];
};

export function ShippingForm({ continents }: ShippingFormProps) {
  const [state, formAction] = useFormState(completeCheckout, null);
  const fieldErrors = state?.success ? null : state?.fieldErrors;

  const [continentId, setContinentId] = useState('');
  const [regionId, setRegionId] = useState('');
  const [cityId, setCityId] = useState('');

  const continent = continents.find(
    (continent) => continent.id.toString() === continentId,
  );
  const regions = continent?.regions;
  const region = regions?.find((region) => region.id.toString() === regionId);
  const cities = region?.cities;

  return (
    <Form
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
      <Card>
        <CardContent className="flex flex-col gap-3">
          <FormItem
            isRequired
            errorMessages={fieldErrors?.continentId?._errors}
          >
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
                  <SelectItem
                    key={continent.id}
                    value={continent.id.toString()}
                  >
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
                    <SelectItem key={region.id} value={region.id.toString()}>
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
                    <SelectItem key={city.id} value={city.id.toString()}>
                      {city.name}
                    </SelectItem>
                  );
                })}
              </Select>
              <FormItemErrorMessage />
            </FormItem>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-end">
            <SubmitButton variant="primary">Complete Checkout</SubmitButton>
          </div>
        </CardFooter>
      </Card>
    </Form>
  );
}
