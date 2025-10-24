// https://www.prisma.io/docs/orm/prisma-schema/overview/location#usage
import path from 'node:path';
import type { PrismaConfig } from 'prisma';

export default {
  schema: path.join('prisma'),
} satisfies PrismaConfig;
