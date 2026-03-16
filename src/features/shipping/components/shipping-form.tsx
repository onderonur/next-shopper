'use client';

import {
  FormItem,
  FormItemErrorMessage,
  FormItemLabel,
} from '@/core/forms/components/form-item';
import { Select, SelectItem } from '@/core/forms/components/select';
import { SubmitButton } from '@/core/forms/components/submit-button';
import { Card, CardContent, CardFooter } from '@/core/ui/components/card';
import { completeCheckout } from '@/features/checkout/actions';
import {
  completeCheckoutInputSchema,
  type CompleteCheckoutInput,
} from '@/features/checkout/schemas';
import type { ContinentWithChildren } from '@/features/shipping/types';
import { zodResolver } from '@hookform/resolvers/zod';
import Form from 'next/form';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'sonner';

type ShippingFormProps = {
  continents: ContinentWithChildren[];
};

export function ShippingForm({ continents }: ShippingFormProps) {
  const form = useForm<CompleteCheckoutInput>({
    resolver: zodResolver(completeCheckoutInputSchema),
    defaultValues: { continentId: '', regionId: '', cityId: '' },
    mode: 'onChange',
  });

  const continentId = useWatch({ control: form.control, name: 'continentId' });
  const regionId = useWatch({ control: form.control, name: 'regionId' });

  const continent = continents.find((c) => c.id === continentId);
  const regions = continent?.regions;
  const region = regions?.find((r) => r.id === regionId);
  const cities = region?.cities;

  return (
    <Form
      action={async () => {
        await form.handleSubmit(async () => {
          const result = await completeCheckout(form.getValues());
          if (result.status === 'error') {
            toast.error(result.error);
          }
        })();
      }}
    >
      <Card>
        <CardContent className="flex flex-col gap-3">
          <Controller
            control={form.control}
            name="continentId"
            render={({ field, fieldState }) => (
              <FormItem isRequired errorMessage={fieldState.error?.message}>
                <FormItemLabel>Continent</FormItemLabel>
                <Select
                  name={field.name}
                  placeholder="Continent"
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue('regionId', '');
                    form.setValue('cityId', '');
                  }}
                >
                  {continents.map((continent) => (
                    <SelectItem key={continent.id} value={continent.id}>
                      {continent.name}
                    </SelectItem>
                  ))}
                </Select>
                <FormItemErrorMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2">
            <Controller
              control={form.control}
              name="regionId"
              render={({ field, fieldState }) => (
                <FormItem isRequired errorMessage={fieldState.error?.message}>
                  <FormItemLabel>Region</FormItemLabel>
                  <Select
                    name={field.name}
                    placeholder="Region"
                    disabled={!continentId}
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue('cityId', '');
                    }}
                  >
                    {regions?.map((region) => (
                      <SelectItem key={region.id} value={region.id}>
                        {region.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <FormItemErrorMessage />
                </FormItem>
              )}
            />
            <Controller
              control={form.control}
              name="cityId"
              render={({ field, fieldState }) => (
                <FormItem isRequired errorMessage={fieldState.error?.message}>
                  <FormItemLabel>City</FormItemLabel>
                  <Select
                    name={field.name}
                    placeholder="City"
                    disabled={!regionId}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    {cities?.map((city) => (
                      <SelectItem key={city.id} value={city.id}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <FormItemErrorMessage />
                </FormItem>
              )}
            />
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
