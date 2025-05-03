import type { Prisma } from '@/generated/prisma';

export type ContinentWithChildren = Prisma.ContinentGetPayload<{
  include: {
    regions: {
      include: {
        cities: true;
      };
    };
  };
}>;
