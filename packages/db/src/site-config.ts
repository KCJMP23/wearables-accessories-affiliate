import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface SiteConfig {
  id: string;
  name: string;
  domain: string;
  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  
  // Site Configuration
  siteTitle?: string;
  siteDescription?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  aboutTitle?: string;
  aboutDescription?: string;
  contactEmail?: string;
  
  // SEO Configuration
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  
  // Content Configuration
  featuredPostsTitle?: string;
  featuredPostsSubtitle?: string;
  featuredProductsTitle?: string;
  featuredProductsSubtitle?: string;
  newsletterTitle?: string;
  newsletterSubtitle?: string;
  
  // Footer Configuration
  footerText?: string;
  socialLinks?: Record<string, string>;
}

export interface DefaultSiteConfig {
  siteTitle: string;
  siteDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutDescription: string;
  featuredPostsTitle: string;
  featuredPostsSubtitle: string;
  featuredProductsTitle: string;
  featuredProductsSubtitle: string;
  newsletterTitle: string;
  newsletterSubtitle: string;
  footerText: string;
}

// Default configuration that can be customized per site
export const getDefaultSiteConfig = (): DefaultSiteConfig => ({
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
});

export async function getSiteConfig(domain: string): Promise<SiteConfig | null> {
  try {
    const site = await prisma.site.findFirst({
      where: { domain }
    });

    if (!site) {
      return null;
    }

    const defaultConfig = getDefaultSiteConfig();

    return {
      id: site.id,
      name: site.name,
      domain: site.domain,
      logoUrl: site.logoUrl || undefined,
      primaryColor: site.primaryColor || undefined,
      secondaryColor: site.secondaryColor || undefined,
      
      // Site Configuration with fallbacks
      siteTitle: site.siteTitle || defaultConfig.siteTitle,
      siteDescription: site.siteDescription || defaultConfig.siteDescription,
      heroTitle: site.heroTitle || defaultConfig.heroTitle,
      heroSubtitle: site.heroSubtitle || defaultConfig.heroSubtitle,
      aboutTitle: site.aboutTitle || defaultConfig.aboutTitle,
      aboutDescription: site.aboutDescription || defaultConfig.aboutDescription,
      contactEmail: site.contactEmail || undefined,
      
      // SEO Configuration
      metaTitle: site.metaTitle || site.siteTitle || defaultConfig.siteTitle,
      metaDescription: site.metaDescription || site.siteDescription || defaultConfig.siteDescription,
      metaKeywords: site.metaKeywords || undefined,
      
      // Content Configuration with fallbacks
      featuredPostsTitle: site.featuredPostsTitle || defaultConfig.featuredPostsTitle,
      featuredPostsSubtitle: site.featuredPostsSubtitle || defaultConfig.featuredPostsSubtitle,
      featuredProductsTitle: site.featuredProductsTitle || defaultConfig.featuredProductsTitle,
      featuredProductsSubtitle: site.featuredProductsSubtitle || defaultConfig.featuredProductsSubtitle,
      newsletterTitle: site.newsletterTitle || defaultConfig.newsletterTitle,
      newsletterSubtitle: site.newsletterSubtitle || defaultConfig.newsletterSubtitle,
      
      // Footer Configuration
      footerText: site.footerText || defaultConfig.footerText,
      socialLinks: site.socialLinks as Record<string, string> || {}
    };
  } catch (error) {
    console.error('Error fetching site config:', error);
    return null;
  }
}

export async function updateSiteConfig(siteId: string, config: Partial<SiteConfig>): Promise<SiteConfig | null> {
  try {
    const updatedSite = await prisma.site.update({
      where: { id: siteId },
      data: {
        name: config.name,
        domain: config.domain,
        logoUrl: config.logoUrl,
        primaryColor: config.primaryColor,
        secondaryColor: config.secondaryColor,
        siteTitle: config.siteTitle,
        siteDescription: config.siteDescription,
        heroTitle: config.heroTitle,
        heroSubtitle: config.heroSubtitle,
        aboutTitle: config.aboutTitle,
        aboutDescription: config.aboutDescription,
        contactEmail: config.contactEmail,
        metaTitle: config.metaTitle,
        metaDescription: config.metaDescription,
        metaKeywords: config.metaKeywords,
        featuredPostsTitle: config.featuredPostsTitle,
        featuredPostsSubtitle: config.featuredPostsSubtitle,
        featuredProductsTitle: config.featuredProductsTitle,
        featuredProductsSubtitle: config.featuredProductsSubtitle,
        newsletterTitle: config.newsletterTitle,
        newsletterSubtitle: config.newsletterSubtitle,
        footerText: config.footerText,
        socialLinks: config.socialLinks,
        updatedAt: new Date()
      }
    });

    return getSiteConfig(updatedSite.domain);
  } catch (error) {
    console.error('Error updating site config:', error);
    return null;
  }
}

export async function createSiteConfig(config: Omit<SiteConfig, 'id'>): Promise<SiteConfig | null> {
  try {
    const site = await prisma.site.create({
      data: {
        name: config.name,
        domain: config.domain,
        logoUrl: config.logoUrl,
        primaryColor: config.primaryColor,
        secondaryColor: config.secondaryColor,
        siteTitle: config.siteTitle,
        siteDescription: config.siteDescription,
        heroTitle: config.heroTitle,
        heroSubtitle: config.heroSubtitle,
        aboutTitle: config.aboutTitle,
        aboutDescription: config.aboutDescription,
        contactEmail: config.contactEmail,
        metaTitle: config.metaTitle,
        metaDescription: config.metaDescription,
        metaKeywords: config.metaKeywords,
        featuredPostsTitle: config.featuredPostsTitle,
        featuredPostsSubtitle: config.featuredPostsSubtitle,
        featuredProductsTitle: config.featuredProductsTitle,
        featuredProductsSubtitle: config.featuredProductsSubtitle,
        newsletterTitle: config.newsletterTitle,
        newsletterSubtitle: config.newsletterSubtitle,
        footerText: config.footerText,
        socialLinks: config.socialLinks
      }
    });

    return getSiteConfig(site.domain);
  } catch (error) {
    console.error('Error creating site config:', error);
    return null;
  }
} 