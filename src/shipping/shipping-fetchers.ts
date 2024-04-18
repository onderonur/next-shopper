import { getDb } from '@/db/db-utils';
import { cache } from 'react';
import type { Continent } from './shipping-types';

export const getManyContinents = cache(async (): Promise<Continent[]> => {
  const db = await getDb();
  return db.continents;
});
