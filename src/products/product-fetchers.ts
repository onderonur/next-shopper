import type { Id } from '@/common/common-types';
import { getDb } from '@/db/db-utils';
import { filterProducts } from '@/search/search-fetchers';
import { cache } from 'react';

export const getOneProductById = cache(async (productId: Id) => {
  const db = await getDb();
  const product = db.products.find((product) => product.id === productId);
  return product;
});

export const getManyProductsByIds = cache(async (productIds: Id[]) => {
  const db = await getDb();
  const products = db.products.filter((product) =>
    productIds.includes(product.id),
  );
  return products;
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
