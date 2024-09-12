import { ERROR_MESSAGES } from '@/core/errors/errors.utils';
import { z } from 'zod';

export const completeCheckoutInputSchema = z.object({
  continentId: z.string().min(1, ERROR_MESSAGES.required('Continent')),
  regionId: z.string().min(1, ERROR_MESSAGES.required('Region')),
  cityId: z.string().min(1, ERROR_MESSAGES.required('City')),
});

export type CompleteCheckoutInput = z.infer<typeof completeCheckoutInputSchema>;
