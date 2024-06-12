import { relations } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// TODO: Bu db folder'ında typescript, eslint falan düzgün çalışsın.

export const products = sqliteTable('products', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  price: real('price').notNull(),
  image: text('image').notNull(),
  categoryId: integer('categoryId').notNull(),
});

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  value: text('value').notNull(),
  image: text('image').notNull(),
  color: text('color').notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const sortings = sqliteTable('sortings', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  value: text('value').notNull(),
});

export const priceRanges = sqliteTable('priceRanges', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  value: text('value').notNull(),
});

export const cities = sqliteTable('cities', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  regionId: integer('regionId').notNull(),
});

export const citiesRelations = relations(cities, ({ one }) => ({
  region: one(regions, {
    fields: [cities.regionId],
    references: [regions.id],
  }),
}));

export const regions = sqliteTable('regions', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  continentId: integer('continentId').notNull(),
});

export const regionsRelations = relations(regions, ({ many, one }) => ({
  cities: many(cities),
  continent: one(continents, {
    fields: [regions.continentId],
    references: [continents.id],
  }),
}));

export const continents = sqliteTable('continents', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  series: text('series').notNull(),
});

export const continentsRelations = relations(continents, ({ many }) => ({
  regions: many(regions),
}));
