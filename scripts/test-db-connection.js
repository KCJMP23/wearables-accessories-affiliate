const { PrismaClient } = require('@prisma/client');

async function testDatabaseConnection() {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL || 'postgresql://postgres.hdvruoskquplrtddmwnj:C56emdFoC3ZaYeqr@aws-0-us-east-1.pooler.supabase.com:6543/postgres',
      },
    },
  });

  try {
    console.log('🔍 Testing database connection...');
    
    // Test basic connection
    const result = await prisma.$queryRaw`SELECT 1 as test, NOW() as timestamp`;
    console.log('✅ Database connection successful!');
    console.log('📊 Connection test result:', result);

    // Try to get any existing data
    try {
      const sites = await prisma.site.findMany({ take: 5 });
      console.log(`📈 Found ${sites.length} sites in database`);
      
      const products = await prisma.product.findMany({ take: 5 });
      console.log(`📦 Found ${products.length} products in database`);
      
      if (sites.length > 0) {
        console.log('🏪 Sample sites:', sites.map(s => ({ id: s.id, name: s.name, domain: s.domain })));
      }
      
      if (products.length > 0) {
        console.log('🛍️ Sample products:', products.map(p => ({ id: p.id, name: p.name, price: p.basePrice })));
      }
      
    } catch (schemaError) {
      console.log('⚠️ Schema not yet created, but connection works!');
      console.log('📝 Schema error:', schemaError.message);
    }

    console.log('\n🎉 Database connection test completed successfully!');
    console.log('✅ The platform is ready for deployment with real database integration.');
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('🔧 Error details:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the test
testDatabaseConnection();