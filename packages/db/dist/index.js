import { PrismaClient } from '@prisma/client';
// Export Prisma client
export { PrismaClient } from '@prisma/client';
export const prisma = globalThis.__prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') {
    globalThis.__prisma = prisma;
}
// Export utility functions
export * from './utils';
// Export site configuration
export * from './site-config';
