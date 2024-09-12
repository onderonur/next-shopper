import { prisma } from '@/core/db/db';
import { data } from '@/core/db/seed.data';

async function seed() {
  await prisma.category.createMany({ data: data.categories });
  await prisma.product.createMany({ data: data.products });
  await prisma.sorting.createMany({ data: data.sortings });
  await prisma.priceRange.createMany({ data: data.priceRanges });
  await prisma.continent.createMany({ data: data.continents });
  await prisma.region.createMany({ data: data.regions });
  await prisma.city.createMany({ data: data.cities });
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises, unicorn/prefer-top-level-await
seed();
