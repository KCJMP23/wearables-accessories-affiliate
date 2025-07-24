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
export declare function getSiteConfig(domain?: string): Promise<SiteConfig>;
export declare function createDefaultSite(): Promise<void>;
//# sourceMappingURL=site-config.d.ts.map