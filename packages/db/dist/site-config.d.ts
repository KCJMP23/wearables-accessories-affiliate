export interface SiteConfig {
    id: string;
    name: string;
    domain: string;
    logoUrl?: string;
    primaryColor?: string;
    secondaryColor?: string;
    siteTitle?: string;
    siteDescription?: string;
    heroTitle?: string;
    heroSubtitle?: string;
    aboutTitle?: string;
    aboutDescription?: string;
    contactEmail?: string;
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string;
    featuredPostsTitle?: string;
    featuredPostsSubtitle?: string;
    featuredProductsTitle?: string;
    featuredProductsSubtitle?: string;
    newsletterTitle?: string;
    newsletterSubtitle?: string;
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
export declare const getDefaultSiteConfig: () => DefaultSiteConfig;
export declare function getSiteConfig(domain: string): Promise<SiteConfig | null>;
export declare function updateSiteConfig(siteId: string, config: Partial<SiteConfig>): Promise<SiteConfig | null>;
export declare function createSiteConfig(config: Omit<SiteConfig, 'id'>): Promise<SiteConfig | null>;
//# sourceMappingURL=site-config.d.ts.map