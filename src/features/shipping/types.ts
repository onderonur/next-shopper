import type { Prisma } from '@prisma/client';

export type ContinentWithChildren = Prisma.ContinentGetPayload<{
  include: {
    regions: {
      include: {
        cities: true;
      };
    };
  };
}>;
