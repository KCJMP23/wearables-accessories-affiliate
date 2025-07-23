import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    console.log('🌱 Seeding database...');
    // Create a test site
    const site = await prisma.site.upsert({
        where: { id: 'test-site-1' },
        update: {},
        create: {
            id: 'test-site-1',
            name: 'Universal Template Site',
            domain: 'localhost',
            logoUrl: 'https://example.com/logo.png',
            primaryColor: '#3b82f6',
            secondaryColor: '#8b5cf6',
            siteTitle: 'Your Trusted Source for Product Reviews',
            siteDescription: 'Discover the best products through honest, comprehensive reviews. We test everything so you don\'t have to.',
            heroTitle: 'Your Trusted Source for Product Reviews',
            heroSubtitle: 'Discover the best products through honest, comprehensive reviews. We test everything so you don\'t have to.',
            aboutTitle: 'About Us',
            aboutDescription: 'Your trusted source for honest product reviews and recommendations',
            featuredPostsTitle: 'Featured Reviews',
            featuredPostsSubtitle: 'Latest product reviews and recommendations',
            featuredProductsTitle: 'Featured Products',
            featuredProductsSubtitle: 'Top-rated products we recommend',
            newsletterTitle: 'Stay Updated',
            newsletterSubtitle: 'Get the latest product reviews and recommendations delivered to your inbox.',
            footerText: '© 2024 Your Site. All rights reserved.'
        }
    });
    // Create a test product
    const product = await prisma.product.upsert({
        where: { id: 'test-product-1' },
        update: {},
        create: {
            id: 'test-product-1',
            name: 'Test Product',
            description: 'A test product for affiliate marketing',
            manufacturer: 'Test Manufacturer',
            basePrice: 99.99,
            mainImageUrl: 'https://example.com/product.jpg',
            specifications: {}
        }
    });
    // Create a test merchant
    const merchant = await prisma.merchant.upsert({
        where: { id: 'test-merchant-1' },
        update: {},
        create: {
            id: 'test-merchant-1',
            name: 'Test Merchant',
            website: 'https://test-merchant.com',
            logoUrl: 'https://example.com/merchant-logo.png',
            description: 'A test merchant for affiliate marketing'
        }
    });
    // Create a test affiliate link
    const affiliateLink = await prisma.affiliateLink.upsert({
        where: { id: 'test-link-1' },
        update: {},
        create: {
            id: 'test-link-1',
            name: 'Test Affiliate Link',
            siteId: site.id,
            productId: product.id,
            originalUrl: 'https://amazon.com/dp/B08N5WRWNW',
            affiliateUrl: 'https://amazon.com/dp/B08N5WRWNW?tag=testaffiliate-20',
            displayText: 'Buy Now',
            trackingId: 'test-tracking-123',
            commissionInfo: {},
            status: 'active'
        }
    });
    // Create a test content type
    const contentType = await prisma.contentType.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            name: 'Article',
            description: 'Blog article content type',
            schema: {}
        }
    });
    // Create a test content
    const content = await prisma.content.upsert({
        where: { id: 'test-content-1' },
        update: {},
        create: {
            id: 'test-content-1',
            title: 'Test Article',
            slug: 'test-article',
            contentTypeId: contentType.id,
            data: {
                content: 'This is a test article content.',
                excerpt: 'A test article for affiliate marketing.'
            },
            status: 'published'
        }
    });
    console.log('✅ Database seeded successfully!');
    console.log('📊 Created:');
    console.log(`  - Site: ${site.name}`);
    console.log(`  - Product: ${product.name}`);
    console.log(`  - Merchant: ${merchant.name}`);
    console.log(`  - Affiliate Link: ${affiliateLink.name}`);
    console.log(`  - Content Type: ${contentType.name}`);
    console.log(`  - Content: ${content.title}`);
}
main()
    .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
