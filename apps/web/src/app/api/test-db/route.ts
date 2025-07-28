import { NextResponse } from 'next/server';
import { prisma } from '@affiliate/db';

export async function GET() {
  try {
    // Test database connection
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    
    // Try to get some real data
    const siteCount = await prisma.site.count();
    const productCount = await prisma.product.count();
    const categoryCount = await prisma.productCategory.count();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: {
        test: result,
        counts: {
          sites: siteCount,
          products: productCount,
          categories: categoryCount
        }
      }
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({
      success: false,
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}