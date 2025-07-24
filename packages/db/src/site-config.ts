import { prisma } from './index';

export interface SiteConfig {
  id: string;
  name: string;
  domain: string;
  logoUrl: string | null;
  primaryColor: string | null;
  secondaryColor: string | null;
  siteTitle: string | null;
  siteDescription: string | null;
  heroTitle: string | null;
  heroSubtitle: string | null;
  aboutTitle: string | null;
  aboutDescription: string | null;
  contactEmail: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  metaKeywords: string | null;
  featuredPostsTitle: string | null;
  featuredPostsSubtitle: string | null;
  featuredProductsTitle: string | null;
  featuredProductsSubtitle: string | null;
  newsletterTitle: string | null;
  newsletterSubtitle: string | null;
  footerText: string | null;
  socialLinks: any | null;
}

// Default fallback configuration
const defaultSiteConfig: SiteConfig = {
  id: 'default',
  name: 'Affiliate Template',
  domain: 'localhost:3000',
  logoUrl: null,
  primaryColor: '#3B82F6',
  secondaryColor: '#1E40AF',
  siteTitle: 'Best Product Reviews & Recommendations',
  siteDescription: 'Discover the best products with our comprehensive reviews and recommendations.',
  heroTitle: 'Find Your Perfect Product',
  heroSubtitle: 'Expert reviews and recommendations to help you make informed decisions',
  aboutTitle: 'About Our Reviews',
  aboutDescription: 'We provide honest, thorough reviews of the best products on the market.',
  contactEmail: 'contact@example.com',
  metaTitle: 'Best Product Reviews & Recommendations',
  metaDescription: 'Discover the best products with our comprehensive reviews and recommendations.',
  metaKeywords: 'product reviews, recommendations, best products',
  featuredPostsTitle: 'Featured Reviews',
  featuredPostsSubtitle: 'Our top picks and latest reviews',
  featuredProductsTitle: 'Featured Products',
  featuredProductsSubtitle: 'Hand-picked products we love',
  newsletterTitle: 'Stay Updated',
  newsletterSubtitle: 'Get the latest product reviews and recommendations',
  footerText: '© 2024 Affiliate Template. All rights reserved.',
  socialLinks: {
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com'
  }
};

export async function getSiteConfig(domain?: string): Promise<SiteConfig> {
  try {
    const site = await prisma.site.findFirst({
      where: domain ? { domain } : undefined,
    });

    if (site) {
      return {
        id: site.id,
        name: site.name,
        domain: site.domain,
        logoUrl: site.logoUrl,
        primaryColor: site.primaryColor,
        secondaryColor: site.secondaryColor,
        siteTitle: site.siteTitle,
        siteDescription: site.siteDescription,
        heroTitle: site.heroTitle,
        heroSubtitle: site.heroSubtitle,
        aboutTitle: site.aboutTitle,
        aboutDescription: site.aboutDescription,
        contactEmail: site.contactEmail,
        metaTitle: site.metaTitle,
        metaDescription: site.metaDescription,
        metaKeywords: site.metaKeywords,
        featuredPostsTitle: site.featuredPostsTitle,
        featuredPostsSubtitle: site.featuredPostsSubtitle,
        featuredProductsTitle: site.featuredProductsTitle,
        featuredProductsSubtitle: site.featuredProductsSubtitle,
        newsletterTitle: site.newsletterTitle,
        newsletterSubtitle: site.newsletterSubtitle,
        footerText: site.footerText,
        socialLinks: site.socialLinks,
      };
    }

    return defaultSiteConfig;
  } catch (error) {
    console.error('Error fetching site config:', error);
    return defaultSiteConfig;
  }
}

export async function createDefaultSite(): Promise<void> {
  try {
    const existingSite = await prisma.site.findFirst({
      where: { domain: 'localhost:3000' }
    });

    if (!existingSite) {
      await prisma.site.create({
        data: {
          name: 'Affiliate Template',
          domain: 'localhost:3000',
          siteTitle: 'Affiliate Template - Best Product Reviews',
          siteDescription: 'Discover the best products with our comprehensive reviews and recommendations.',
          heroTitle: 'Find Your Perfect Product',
          heroSubtitle: 'Get honest reviews and recommendations for the best products on the market.',
          aboutTitle: 'About Our Reviews',
          aboutDescription: 'We provide unbiased, comprehensive reviews to help you make informed purchasing decisions.',
          contactEmail: 'contact@affiliatetemplate.com',
          metaTitle: 'Affiliate Template - Best Product Reviews',
          metaDescription: 'Discover the best products with our comprehensive reviews and recommendations.',
          metaKeywords: 'product reviews, recommendations, affiliate, best products',
          featuredPostsTitle: 'Featured Reviews',
          featuredPostsSubtitle: 'Our top picks and most popular reviews',
          featuredProductsTitle: 'Featured Products',
          featuredProductsSubtitle: 'Hand-picked products we love and recommend',
          newsletterTitle: 'Stay Updated',
          newsletterSubtitle: 'Get the latest product reviews and recommendations delivered to your inbox.',
          footerText: '© 2024 Affiliate Template. All rights reserved.',
          socialLinks: {
            facebook: 'https://facebook.com',
            twitter: 'https://twitter.com',
            instagram: 'https://instagram.com'
          }
        }
      });
      console.log('Default site configuration created successfully');
    }
  } catch (error) {
    console.error('Error creating default site:', error);
  }
} 