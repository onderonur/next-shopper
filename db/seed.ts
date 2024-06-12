import { data } from './data';
import { db } from './drizzle';
import {
  categories,
  cities,
  continents,
  priceRanges,
  products,
  regions,
  sortings,
} from './schema';

async function clear() {
  await db.delete(products);
  await db.delete(categories);
  await db.delete(sortings);
  await db.delete(priceRanges);
  await db.delete(continents);
  await db.delete(regions);
  await db.delete(cities);
}

async function seed() {
  await clear();
  await db.insert(categories).values(data.categories);
  await db.insert(products).values(data.products);
  await db.insert(sortings).values(data.sortings);
  await db.insert(priceRanges).values(data.priceRanges);
  await db.insert(continents).values(data.continents);
  await db.insert(regions).values(data.regions);
  await db.insert(cities).values(data.cities);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises, unicorn/prefer-top-level-await
seed();
