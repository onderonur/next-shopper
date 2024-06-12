// TODO: Bu db path'lerini absolute yap.
import type { products } from '../../db/schema';

export type Product = typeof products.$inferSelect;
