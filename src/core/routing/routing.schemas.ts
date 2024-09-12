import { z } from 'zod';

export const singleSearchParamSchema = z
  .string()
  .or(z.array(z.string()).transform((value) => value[0]))
  .optional();

export const multiSearchParamSchema = z
  .string()
  .transform((value) => [value])
  .or(z.array(z.string()))
  .optional();
