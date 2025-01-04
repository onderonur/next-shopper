import { z } from 'zod';

const searchParamParser = {
  toSingle: <Output, Def extends z.ZodTypeDef, Input>(
    valueSchema: z.ZodType<Output, Def, Input>,
  ) => {
    const finalSchema = valueSchema.or(
      z.array(valueSchema).transform((val) => val[0]),
    );

    return finalSchema;
  },
  toArray: <Output, Def extends z.ZodTypeDef, Input>(
    valueSchema: z.ZodType<Output, Def, Input>,
  ) => {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const signInPageSearchParamsSchema = z.object({
  callbackUrl: searchParamParser.toSingle(z.string().nullable()),
});

export type SignInPageSearchParams = z.infer<
  typeof signInPageSearchParamsSchema
>;
