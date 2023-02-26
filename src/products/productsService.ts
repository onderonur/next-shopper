import 'server-only';

import { Id } from '@src/common/CommonTypes';
import { getDb } from '@src/db/DbUtils';
import { cache } from 'react';

export const productsService = {
  getOneProductById: cache(async (productId: Id) => {
    const db = await getDb();
    const found = db.products.find((product) => product.id === productId);
    return found;
  }),
};
