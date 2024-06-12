import { cache } from 'react';
import { db } from '../../db/drizzle';
import type { Continent } from './shipping-types';

export const getManyContinents = cache(async (): Promise<Continent[]> => {
  const continents = await db.query.continents.findMany({
    with: {
      regions: {
        with: {
          cities: true,
        },
      },
    },
  });

  return continents;
});
