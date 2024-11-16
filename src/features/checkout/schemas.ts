import { ERROR_MESSAGES } from '@/core/errors/utils';
import { z } from 'zod';

export const completeCheckoutInputSchema = z.object({
  continentId: z.string().nonempty(ERROR_MESSAGES.required('Continent')),
  regionId: z.string().nonempty(ERROR_MESSAGES.required('Region')),
  cityId: z.string().nonempty(ERROR_MESSAGES.required('City')),
});

export type CompleteCheckoutInput = z.infer<typeof completeCheckoutInputSchema>;
