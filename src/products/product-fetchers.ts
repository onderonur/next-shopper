import { Id } from '@/common/common-types';
import { getDb } from '@/db/db-utils';
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
