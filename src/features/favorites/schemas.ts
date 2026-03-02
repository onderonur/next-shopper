import z from 'zod';

export const addToFavoritesInputSchema = z.object({
  productId: z.cuid(),
});

export type AddToFavoritesInput = z.infer<typeof addToFavoritesInputSchema>;

export const removeFromFavoritesInputSchema = z.object({
  productId: z.cuid(),
});

export type RemoveFromFavoritesInput = z.infer<
  typeof removeFromFavoritesInputSchema
>;
