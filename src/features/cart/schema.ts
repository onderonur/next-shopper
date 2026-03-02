import { z } from 'zod';

export const addProductToCartInputSchema = z.object({
  productId: z.cuid(),
});

export type AddProductToCartInput = z.infer<typeof addProductToCartInputSchema>;

export const decreaseProductInCartInputSchema = z.object({
  productId: z.cuid(),
});

export type DecreaseProductInCartInput = z.infer<
  typeof decreaseProductInCartInputSchema
>;

export const removeProductFromCartInputSchema = z.object({
  productId: z.cuid(),
});

export type RemoveProductFromCartInput = z.infer<
  typeof removeProductFromCartInputSchema
>;
