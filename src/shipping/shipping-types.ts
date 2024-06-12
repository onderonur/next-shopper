import type { cities, continents, regions } from '../../db/schema';

type City = typeof cities.$inferSelect;

type Region = typeof regions.$inferInsert;

export type Continent = typeof continents.$inferInsert;
