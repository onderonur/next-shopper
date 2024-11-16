import { prisma } from '@/core/db/db';
import { cache } from 'react';
import 'server-only';

export const getManyContinents = cache(async () => {
  const continents = await prisma.continent.findMany({
    include: {
      regions: {
        include: {
          cities: true,
        },
      },
    },
  });

  return continents;
});
