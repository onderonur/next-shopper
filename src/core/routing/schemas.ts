import { z } from 'zod';

const searchParamParser = {
  toSingle: <T extends z.ZodType>(valueSchema: T) => {
    const finalSchema = valueSchema.or(
      z.array(valueSchema).transform((val) => val[0]),
    );

    return finalSchema;
  },
  toArray: <T extends z.ZodType>(valueSchema: T) => {
    const finalSchema = valueSchema
      .transform((val) => [val])
      .or(z.array(valueSchema));

    return finalSchema;
  },
};

export const searchPageSearchParamsSchema = z
  .object({
    categories: searchParamParser.toArray(z.string()),
    priceRanges: searchParamParser.toArray(z.string()),
    sorting: searchParamParser.toSingle(z.string()),
  })
  .partial();

export type SearchPageSearchParams = z.infer<
  typeof searchPageSearchParamsSchema
>;

export const signInPageSearchParamsSchema = z
  .object({
    callbackUrl: searchParamParser.toSingle(z.string()),
    error: searchParamParser.toSingle(z.string()),
  })
  .partial();

export type SignInPageSearchParams = z.infer<
  typeof signInPageSearchParamsSchema
>;
