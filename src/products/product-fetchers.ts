import type { Id } from '@/common/common-types';
import { filterProducts } from '@/search/search-fetchers';
import { cache } from 'react';
import { db } from '../../db/drizzle';

export const getOneProductById = cache(async (productId: Id) => {
  const product = await db.query.products.findFirst({
    where: (products, { eq }) => eq(products.id, productId),
    with: { category: true },
  });

  return product;
});

export const getManyProductsByIds = cache(async (productIds: Id[]) => {
  const product = await db.query.products.findMany({
    where: (products, { inArray }) => inArray(products.id, productIds),
  });

  return product;
});

export const getRelatedProducts = cache(async (productId: Id) => {
  const product = await getOneProductById(productId);

  if (!product) return [];

  const { products } = await filterProducts({
    categories: [product.category.value],
  });

  const relatedProducts = products.filter(
    (relatedProduct) => relatedProduct.id !== product.id,
  );

  return relatedProducts;
});
