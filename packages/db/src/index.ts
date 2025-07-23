import { PrismaClient } from '@prisma/client';

// Export Prisma client
export { PrismaClient } from '@prisma/client';

// Create and export prisma instance
declare global {
  var __prisma: PrismaClient | undefined;
}

export const prisma = globalThis.__prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma;
}

// Export utility functions
export * from './utils';

// Export specific types that don't conflict with Prisma
export type { 
  ContentFilter, 
  AffiliateLinkFilter, 
  AnalyticsPeriod, 
  ClickAnalytics, 
  Pagination, 
  ApiResponse 
} from './types';

// Export site configuration
export * from './site-config';