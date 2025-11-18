// https://www.prisma.io/docs/orm/prisma-schema/overview/location#usage
import path from 'node:path';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: path.join('prisma'),
  migrations: {
    seed: 'tsx src/core/db/seed.ts',
  },
});
