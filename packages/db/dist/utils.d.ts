import { PrismaClient, Prisma } from '@prisma/client';
declare const prisma: PrismaClient<Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
export declare const contentService: {
    create(data: Prisma.ContentCreateInput): Promise<{
        id: string;
        title: string;
        slug: string;
        contentTypeId: number;
        data: Prisma.JsonValue;
        status: string;
        createdBy: string | null;
        updatedBy: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        version: number | null;
        scheduledPublishAt: Date | null;
    }>;
    findById(id: string): Promise<({
        contentType: {
            id: number;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            description: string | null;
            schema: Prisma.JsonValue | null;
        };
        siteContent: ({
            site: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
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
                socialLinks: Prisma.JsonValue | null;
            };
        } & {
            siteId: string;
            contentId: string;
        })[];
        categories: ({
            category: {
                id: number;
                slug: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                name: string;
                description: string | null;
                parentId: number | null;
            };
        } & {
            contentId: string;
            categoryId: number;
        })[];
        tags: ({
            tag: {
                id: number;
                slug: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                name: string;
                description: string | null;
            };
        } & {
            contentId: string;
            tagId: number;
        })[];
        media: ({
            mediaAsset: {
                url: string;
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                filename: string;
                originalName: string;
                mimeType: string;
                size: number;
                altText: string | null;
                metadata: Prisma.JsonValue | null;
            };
        } & {
            siteId: string;
            contentId: string;
            mediaAssetId: string;
        })[];
        versions: {
            id: string;
            data: Prisma.JsonValue;
            createdBy: string | null;
            createdAt: Date | null;
            version: number;
            contentId: string;
        }[];
    } & {
        id: string;
        title: string;
        slug: string;
        contentTypeId: number;
        data: Prisma.JsonValue;
        status: string;
        createdBy: string | null;
        updatedBy: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        version: number | null;
        scheduledPublishAt: Date | null;
    }) | null>;
    findBySlug(slug: string): Promise<({
        contentType: {
            id: number;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            description: string | null;
            schema: Prisma.JsonValue | null;
        };
        siteContent: ({
            site: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
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
                socialLinks: Prisma.JsonValue | null;
            };
        } & {
            siteId: string;
            contentId: string;
        })[];
        categories: ({
            category: {
                id: number;
                slug: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                name: string;
                description: string | null;
                parentId: number | null;
            };
        } & {
            contentId: string;
            categoryId: number;
        })[];
        tags: ({
            tag: {
                id: number;
                slug: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                name: string;
                description: string | null;
            };
        } & {
            contentId: string;
            tagId: number;
        })[];
        media: ({
            mediaAsset: {
                url: string;
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                filename: string;
                originalName: string;
                mimeType: string;
                size: number;
                altText: string | null;
                metadata: Prisma.JsonValue | null;
            };
        } & {
            siteId: string;
            contentId: string;
            mediaAssetId: string;
        })[];
        versions: {
            id: string;
            data: Prisma.JsonValue;
            createdBy: string | null;
            createdAt: Date | null;
            version: number;
            contentId: string;
        }[];
    } & {
        id: string;
        title: string;
        slug: string;
        contentTypeId: number;
        data: Prisma.JsonValue;
        status: string;
        createdBy: string | null;
        updatedBy: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        version: number | null;
        scheduledPublishAt: Date | null;
    }) | null>;
    findAll(options?: {
        status?: string;
        contentTypeId?: number;
        limit?: number;
        offset?: number;
    }): Promise<({
        contentType: {
            id: number;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            description: string | null;
            schema: Prisma.JsonValue | null;
        };
        siteContent: ({
            site: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
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
                socialLinks: Prisma.JsonValue | null;
            };
        } & {
            siteId: string;
            contentId: string;
        })[];
        categories: ({
            category: {
                id: number;
                slug: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                name: string;
                description: string | null;
                parentId: number | null;
            };
        } & {
            contentId: string;
            categoryId: number;
        })[];
        tags: ({
            tag: {
                id: number;
                slug: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                name: string;
                description: string | null;
            };
        } & {
            contentId: string;
            tagId: number;
        })[];
        media: ({
            mediaAsset: {
                url: string;
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                filename: string;
                originalName: string;
                mimeType: string;
                size: number;
                altText: string | null;
                metadata: Prisma.JsonValue | null;
            };
        } & {
            siteId: string;
            contentId: string;
            mediaAssetId: string;
        })[];
        versions: {
            id: string;
            data: Prisma.JsonValue;
            createdBy: string | null;
            createdAt: Date | null;
            version: number;
            contentId: string;
        }[];
    } & {
        id: string;
        title: string;
        slug: string;
        contentTypeId: number;
        data: Prisma.JsonValue;
        status: string;
        createdBy: string | null;
        updatedBy: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        version: number | null;
        scheduledPublishAt: Date | null;
    })[]>;
    update(id: string, data: Prisma.ContentUpdateInput): Promise<{
        contentType: {
            id: number;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            description: string | null;
            schema: Prisma.JsonValue | null;
        };
        siteContent: ({
            site: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
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
                socialLinks: Prisma.JsonValue | null;
            };
        } & {
            siteId: string;
            contentId: string;
        })[];
        categories: ({
            category: {
                id: number;
                slug: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                name: string;
                description: string | null;
                parentId: number | null;
            };
        } & {
            contentId: string;
            categoryId: number;
        })[];
        tags: ({
            tag: {
                id: number;
                slug: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                name: string;
                description: string | null;
            };
        } & {
            contentId: string;
            tagId: number;
        })[];
        media: ({
            mediaAsset: {
                url: string;
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                filename: string;
                originalName: string;
                mimeType: string;
                size: number;
                altText: string | null;
                metadata: Prisma.JsonValue | null;
            };
        } & {
            siteId: string;
            contentId: string;
            mediaAssetId: string;
        })[];
        versions: {
            id: string;
            data: Prisma.JsonValue;
            createdBy: string | null;
            createdAt: Date | null;
            version: number;
            contentId: string;
        }[];
    } & {
        id: string;
        title: string;
        slug: string;
        contentTypeId: number;
        data: Prisma.JsonValue;
        status: string;
        createdBy: string | null;
        updatedBy: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        version: number | null;
        scheduledPublishAt: Date | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        title: string;
        slug: string;
        contentTypeId: number;
        data: Prisma.JsonValue;
        status: string;
        createdBy: string | null;
        updatedBy: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        version: number | null;
        scheduledPublishAt: Date | null;
    }>;
    addCategory(contentId: string, categoryId: number): Promise<{
        category: {
            id: number;
            slug: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            description: string | null;
            parentId: number | null;
        };
    } & {
        contentId: string;
        categoryId: number;
    }>;
    removeCategory(contentId: string, categoryId: number): Promise<{
        contentId: string;
        categoryId: number;
    }>;
    addTag(contentId: string, tagId: number): Promise<{
        tag: {
            id: number;
            slug: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            description: string | null;
        };
    } & {
        contentId: string;
        tagId: number;
    }>;
    removeTag(contentId: string, tagId: number): Promise<{
        contentId: string;
        tagId: number;
    }>;
};
export declare const siteService: {
    create(data: Prisma.SiteCreateInput): Promise<{
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
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
        socialLinks: Prisma.JsonValue | null;
    }>;
    findById(id: string): Promise<({
        content: ({
            content: {
                id: string;
                title: string;
                slug: string;
                contentTypeId: number;
                data: Prisma.JsonValue;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                createdAt: Date | null;
                updatedAt: Date | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            siteId: string;
            contentId: string;
        })[];
        media: ({
            mediaAsset: {
                url: string;
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                filename: string;
                originalName: string;
                mimeType: string;
                size: number;
                altText: string | null;
                metadata: Prisma.JsonValue | null;
            };
        } & {
            siteId: string;
            contentId: string;
            mediaAssetId: string;
        })[];
        products: ({
            product: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                name: string;
                description: string | null;
                manufacturer: string | null;
                basePrice: Prisma.Decimal;
                mainImageUrl: string | null;
                specifications: Prisma.JsonValue | null;
            };
        } & {
            createdAt: Date | null;
            updatedAt: Date | null;
            siteId: string;
            price: Prisma.Decimal;
            discount: Prisma.Decimal | null;
            inStock: boolean;
            productId: string;
        })[];
        affiliateLinks: {
            id: string;
            status: string;
            createdBy: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            siteId: string;
            productId: string | null;
            originalUrl: string;
            affiliateUrl: string;
            displayText: string | null;
            trackingId: string | null;
            commissionInfo: Prisma.JsonValue | null;
            expirationDate: Date | null;
            merchantId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
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
        socialLinks: Prisma.JsonValue | null;
    }) | null>;
    findByDomain(domain: string): Promise<({
        content: ({
            content: {
                id: string;
                title: string;
                slug: string;
                contentTypeId: number;
                data: Prisma.JsonValue;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                createdAt: Date | null;
                updatedAt: Date | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            siteId: string;
            contentId: string;
        })[];
        media: ({
            mediaAsset: {
                url: string;
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                filename: string;
                originalName: string;
                mimeType: string;
                size: number;
                altText: string | null;
                metadata: Prisma.JsonValue | null;
            };
        } & {
            siteId: string;
            contentId: string;
            mediaAssetId: string;
        })[];
        products: ({
            product: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                name: string;
                description: string | null;
                manufacturer: string | null;
                basePrice: Prisma.Decimal;
                mainImageUrl: string | null;
                specifications: Prisma.JsonValue | null;
            };
        } & {
            createdAt: Date | null;
            updatedAt: Date | null;
            siteId: string;
            price: Prisma.Decimal;
            discount: Prisma.Decimal | null;
            inStock: boolean;
            productId: string;
        })[];
        affiliateLinks: {
            id: string;
            status: string;
            createdBy: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            siteId: string;
            productId: string | null;
            originalUrl: string;
            affiliateUrl: string;
            displayText: string | null;
            trackingId: string | null;
            commissionInfo: Prisma.JsonValue | null;
            expirationDate: Date | null;
            merchantId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
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
        socialLinks: Prisma.JsonValue | null;
    }) | null>;
    findAll(options?: {
        limit?: number;
        offset?: number;
    }): Promise<({
        content: ({
            content: {
                id: string;
                title: string;
                slug: string;
                contentTypeId: number;
                data: Prisma.JsonValue;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                createdAt: Date | null;
                updatedAt: Date | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            siteId: string;
            contentId: string;
        })[];
        media: ({
            mediaAsset: {
                url: string;
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                filename: string;
                originalName: string;
                mimeType: string;
                size: number;
                altText: string | null;
                metadata: Prisma.JsonValue | null;
            };
        } & {
            siteId: string;
            contentId: string;
            mediaAssetId: string;
        })[];
        products: ({
            product: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                name: string;
                description: string | null;
                manufacturer: string | null;
                basePrice: Prisma.Decimal;
                mainImageUrl: string | null;
                specifications: Prisma.JsonValue | null;
            };
        } & {
            createdAt: Date | null;
            updatedAt: Date | null;
            siteId: string;
            price: Prisma.Decimal;
            discount: Prisma.Decimal | null;
            inStock: boolean;
            productId: string;
        })[];
        affiliateLinks: {
            id: string;
            status: string;
            createdBy: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            siteId: string;
            productId: string | null;
            originalUrl: string;
            affiliateUrl: string;
            displayText: string | null;
            trackingId: string | null;
            commissionInfo: Prisma.JsonValue | null;
            expirationDate: Date | null;
            merchantId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
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
        socialLinks: Prisma.JsonValue | null;
    })[]>;
    update(id: string, data: Prisma.SiteUpdateInput): Promise<{
        content: ({
            content: {
                id: string;
                title: string;
                slug: string;
                contentTypeId: number;
                data: Prisma.JsonValue;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                createdAt: Date | null;
                updatedAt: Date | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            siteId: string;
            contentId: string;
        })[];
        media: ({
            mediaAsset: {
                url: string;
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                filename: string;
                originalName: string;
                mimeType: string;
                size: number;
                altText: string | null;
                metadata: Prisma.JsonValue | null;
            };
        } & {
            siteId: string;
            contentId: string;
            mediaAssetId: string;
        })[];
        products: ({
            product: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                name: string;
                description: string | null;
                manufacturer: string | null;
                basePrice: Prisma.Decimal;
                mainImageUrl: string | null;
                specifications: Prisma.JsonValue | null;
            };
        } & {
            createdAt: Date | null;
            updatedAt: Date | null;
            siteId: string;
            price: Prisma.Decimal;
            discount: Prisma.Decimal | null;
            inStock: boolean;
            productId: string;
        })[];
        affiliateLinks: {
            id: string;
            status: string;
            createdBy: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            siteId: string;
            productId: string | null;
            originalUrl: string;
            affiliateUrl: string;
            displayText: string | null;
            trackingId: string | null;
            commissionInfo: Prisma.JsonValue | null;
            expirationDate: Date | null;
            merchantId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
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
        socialLinks: Prisma.JsonValue | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
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
        socialLinks: Prisma.JsonValue | null;
    }>;
};
export declare const affiliateLinkService: {
    create(data: Prisma.AffiliateLinkCreateInput): Promise<{
        id: string;
        status: string;
        createdBy: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        siteId: string;
        productId: string | null;
        originalUrl: string;
        affiliateUrl: string;
        displayText: string | null;
        trackingId: string | null;
        commissionInfo: Prisma.JsonValue | null;
        expirationDate: Date | null;
        merchantId: string | null;
    }>;
    findById(id: string): Promise<({
        site: {
            id: string;
            createdAt: Date | null;
            updatedAt: Date | null;
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
            socialLinks: Prisma.JsonValue | null;
        };
        product: {
            id: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            description: string | null;
            manufacturer: string | null;
            basePrice: Prisma.Decimal;
            mainImageUrl: string | null;
            specifications: Prisma.JsonValue | null;
        } | null;
        merchant: {
            id: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            description: string | null;
            logoUrl: string | null;
            website: string | null;
        } | null;
        linkClicks: {
            id: string;
            affiliateLinkId: string;
            ipAddress: string | null;
            userAgent: string | null;
            referrer: string | null;
            clickedAt: Date | null;
            conversionStatus: string | null;
            conversionValue: Prisma.Decimal | null;
        }[];
    } & {
        id: string;
        status: string;
        createdBy: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        siteId: string;
        productId: string | null;
        originalUrl: string;
        affiliateUrl: string;
        displayText: string | null;
        trackingId: string | null;
        commissionInfo: Prisma.JsonValue | null;
        expirationDate: Date | null;
        merchantId: string | null;
    }) | null>;
    findBySite(siteId: string, options?: {
        status?: string;
        limit?: number;
        offset?: number;
    }): Promise<({
        site: {
            id: string;
            createdAt: Date | null;
            updatedAt: Date | null;
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
            socialLinks: Prisma.JsonValue | null;
        };
        product: {
            id: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            description: string | null;
            manufacturer: string | null;
            basePrice: Prisma.Decimal;
            mainImageUrl: string | null;
            specifications: Prisma.JsonValue | null;
        } | null;
        merchant: {
            id: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            description: string | null;
            logoUrl: string | null;
            website: string | null;
        } | null;
        linkClicks: {
            id: string;
            affiliateLinkId: string;
            ipAddress: string | null;
            userAgent: string | null;
            referrer: string | null;
            clickedAt: Date | null;
            conversionStatus: string | null;
            conversionValue: Prisma.Decimal | null;
        }[];
    } & {
        id: string;
        status: string;
        createdBy: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        siteId: string;
        productId: string | null;
        originalUrl: string;
        affiliateUrl: string;
        displayText: string | null;
        trackingId: string | null;
        commissionInfo: Prisma.JsonValue | null;
        expirationDate: Date | null;
        merchantId: string | null;
    })[]>;
    findAll(options?: {
        status?: string;
        limit?: number;
        offset?: number;
    }): Promise<({
        site: {
            id: string;
            createdAt: Date | null;
            updatedAt: Date | null;
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
            socialLinks: Prisma.JsonValue | null;
        };
        product: {
            id: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            description: string | null;
            manufacturer: string | null;
            basePrice: Prisma.Decimal;
            mainImageUrl: string | null;
            specifications: Prisma.JsonValue | null;
        } | null;
        merchant: {
            id: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            description: string | null;
            logoUrl: string | null;
            website: string | null;
        } | null;
        linkClicks: {
            id: string;
            affiliateLinkId: string;
            ipAddress: string | null;
            userAgent: string | null;
            referrer: string | null;
            clickedAt: Date | null;
            conversionStatus: string | null;
            conversionValue: Prisma.Decimal | null;
        }[];
    } & {
        id: string;
        status: string;
        createdBy: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        siteId: string;
        productId: string | null;
        originalUrl: string;
        affiliateUrl: string;
        displayText: string | null;
        trackingId: string | null;
        commissionInfo: Prisma.JsonValue | null;
        expirationDate: Date | null;
        merchantId: string | null;
    })[]>;
    update(id: string, data: Prisma.AffiliateLinkUpdateInput): Promise<{
        site: {
            id: string;
            createdAt: Date | null;
            updatedAt: Date | null;
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
            socialLinks: Prisma.JsonValue | null;
        };
        product: {
            id: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            description: string | null;
            manufacturer: string | null;
            basePrice: Prisma.Decimal;
            mainImageUrl: string | null;
            specifications: Prisma.JsonValue | null;
        } | null;
        merchant: {
            id: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            description: string | null;
            logoUrl: string | null;
            website: string | null;
        } | null;
        linkClicks: {
            id: string;
            affiliateLinkId: string;
            ipAddress: string | null;
            userAgent: string | null;
            referrer: string | null;
            clickedAt: Date | null;
            conversionStatus: string | null;
            conversionValue: Prisma.Decimal | null;
        }[];
    } & {
        id: string;
        status: string;
        createdBy: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        siteId: string;
        productId: string | null;
        originalUrl: string;
        affiliateUrl: string;
        displayText: string | null;
        trackingId: string | null;
        commissionInfo: Prisma.JsonValue | null;
        expirationDate: Date | null;
        merchantId: string | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        status: string;
        createdBy: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        siteId: string;
        productId: string | null;
        originalUrl: string;
        affiliateUrl: string;
        displayText: string | null;
        trackingId: string | null;
        commissionInfo: Prisma.JsonValue | null;
        expirationDate: Date | null;
        merchantId: string | null;
    }>;
    trackClick(data: Prisma.LinkClickCreateInput): Promise<{
        id: string;
        affiliateLinkId: string;
        ipAddress: string | null;
        userAgent: string | null;
        referrer: string | null;
        clickedAt: Date | null;
        conversionStatus: string | null;
        conversionValue: Prisma.Decimal | null;
    }>;
    getClickStats(affiliateLinkId: string): Promise<{
        totalClicks: number;
        uniqueClicks: number;
        conversionRate: number;
        clicks: {
            id: string;
            affiliateLinkId: string;
            ipAddress: string | null;
            userAgent: string | null;
            referrer: string | null;
            clickedAt: Date | null;
            conversionStatus: string | null;
            conversionValue: Prisma.Decimal | null;
        }[];
    }>;
};
export declare const productService: {
    create(data: Prisma.ProductCreateInput): Promise<{
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
        manufacturer: string | null;
        basePrice: Prisma.Decimal;
        mainImageUrl: string | null;
        specifications: Prisma.JsonValue | null;
    }>;
    findById(id: string): Promise<({
        affiliateLinks: {
            id: string;
            status: string;
            createdBy: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            siteId: string;
            productId: string | null;
            originalUrl: string;
            affiliateUrl: string;
            displayText: string | null;
            trackingId: string | null;
            commissionInfo: Prisma.JsonValue | null;
            expirationDate: Date | null;
            merchantId: string | null;
        }[];
        siteProducts: ({
            site: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
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
                socialLinks: Prisma.JsonValue | null;
            };
        } & {
            createdAt: Date | null;
            updatedAt: Date | null;
            siteId: string;
            price: Prisma.Decimal;
            discount: Prisma.Decimal | null;
            inStock: boolean;
            productId: string;
        })[];
    } & {
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
        manufacturer: string | null;
        basePrice: Prisma.Decimal;
        mainImageUrl: string | null;
        specifications: Prisma.JsonValue | null;
    }) | null>;
    findByManufacturer(manufacturer: string, options?: {
        limit?: number;
        offset?: number;
    }): Promise<({
        affiliateLinks: {
            id: string;
            status: string;
            createdBy: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            siteId: string;
            productId: string | null;
            originalUrl: string;
            affiliateUrl: string;
            displayText: string | null;
            trackingId: string | null;
            commissionInfo: Prisma.JsonValue | null;
            expirationDate: Date | null;
            merchantId: string | null;
        }[];
        siteProducts: ({
            site: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
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
                socialLinks: Prisma.JsonValue | null;
            };
        } & {
            createdAt: Date | null;
            updatedAt: Date | null;
            siteId: string;
            price: Prisma.Decimal;
            discount: Prisma.Decimal | null;
            inStock: boolean;
            productId: string;
        })[];
    } & {
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
        manufacturer: string | null;
        basePrice: Prisma.Decimal;
        mainImageUrl: string | null;
        specifications: Prisma.JsonValue | null;
    })[]>;
    findAll(options?: {
        limit?: number;
        offset?: number;
    }): Promise<({
        affiliateLinks: {
            id: string;
            status: string;
            createdBy: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            siteId: string;
            productId: string | null;
            originalUrl: string;
            affiliateUrl: string;
            displayText: string | null;
            trackingId: string | null;
            commissionInfo: Prisma.JsonValue | null;
            expirationDate: Date | null;
            merchantId: string | null;
        }[];
        siteProducts: ({
            site: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
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
                socialLinks: Prisma.JsonValue | null;
            };
        } & {
            createdAt: Date | null;
            updatedAt: Date | null;
            siteId: string;
            price: Prisma.Decimal;
            discount: Prisma.Decimal | null;
            inStock: boolean;
            productId: string;
        })[];
    } & {
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
        manufacturer: string | null;
        basePrice: Prisma.Decimal;
        mainImageUrl: string | null;
        specifications: Prisma.JsonValue | null;
    })[]>;
    update(id: string, data: Prisma.ProductUpdateInput): Promise<{
        affiliateLinks: {
            id: string;
            status: string;
            createdBy: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            siteId: string;
            productId: string | null;
            originalUrl: string;
            affiliateUrl: string;
            displayText: string | null;
            trackingId: string | null;
            commissionInfo: Prisma.JsonValue | null;
            expirationDate: Date | null;
            merchantId: string | null;
        }[];
        siteProducts: ({
            site: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
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
                socialLinks: Prisma.JsonValue | null;
            };
        } & {
            createdAt: Date | null;
            updatedAt: Date | null;
            siteId: string;
            price: Prisma.Decimal;
            discount: Prisma.Decimal | null;
            inStock: boolean;
            productId: string;
        })[];
    } & {
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
        manufacturer: string | null;
        basePrice: Prisma.Decimal;
        mainImageUrl: string | null;
        specifications: Prisma.JsonValue | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
        manufacturer: string | null;
        basePrice: Prisma.Decimal;
        mainImageUrl: string | null;
        specifications: Prisma.JsonValue | null;
    }>;
};
export declare const analyticsService: {
    getSiteAnalytics(siteId: string, dateRange?: {
        start: Date;
        end: Date;
    }): Promise<{
        totalClicks: number;
        uniqueClicks: number;
        conversions: number;
        conversionRate: number;
        totalRevenue: number;
        clicks: ({
            affiliateLink: {
                product: {
                    id: string;
                    createdAt: Date | null;
                    updatedAt: Date | null;
                    name: string;
                    description: string | null;
                    manufacturer: string | null;
                    basePrice: Prisma.Decimal;
                    mainImageUrl: string | null;
                    specifications: Prisma.JsonValue | null;
                } | null;
            } & {
                id: string;
                status: string;
                createdBy: string | null;
                createdAt: Date | null;
                updatedAt: Date | null;
                name: string;
                siteId: string;
                productId: string | null;
                originalUrl: string;
                affiliateUrl: string;
                displayText: string | null;
                trackingId: string | null;
                commissionInfo: Prisma.JsonValue | null;
                expirationDate: Date | null;
                merchantId: string | null;
            };
        } & {
            id: string;
            affiliateLinkId: string;
            ipAddress: string | null;
            userAgent: string | null;
            referrer: string | null;
            clickedAt: Date | null;
            conversionStatus: string | null;
            conversionValue: Prisma.Decimal | null;
        })[];
    }>;
    getTopProducts(siteId: string, limit?: number): Promise<{
        product: {
            id: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            description: string | null;
            manufacturer: string | null;
            basePrice: Prisma.Decimal;
            mainImageUrl: string | null;
            specifications: Prisma.JsonValue | null;
        } | null | undefined;
        clicks: number;
        revenue: number;
    }[]>;
    getClickHistory(affiliateLinkId: string, limit?: number): Promise<{
        id: string;
        affiliateLinkId: string;
        ipAddress: string | null;
        userAgent: string | null;
        referrer: string | null;
        clickedAt: Date | null;
        conversionStatus: string | null;
        conversionValue: Prisma.Decimal | null;
    }[]>;
};
export declare const newsletterService: {
    subscribe(data: Prisma.NewsletterSubscriberCreateInput): Promise<{
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        isActive: boolean;
        source: string | null;
        email: string;
        firstName: string | null;
        lastName: string | null;
        subscribedAt: Date | null;
        unsubscribedAt: Date | null;
        preferences: Prisma.JsonValue | null;
    }>;
    unsubscribe(email: string): Promise<Prisma.BatchPayload>;
    findSubscriber(email: string): Promise<{
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        isActive: boolean;
        source: string | null;
        email: string;
        firstName: string | null;
        lastName: string | null;
        subscribedAt: Date | null;
        unsubscribedAt: Date | null;
        preferences: Prisma.JsonValue | null;
    } | null>;
    getAllSubscribers(options?: {
        isActive?: boolean;
        limit?: number;
        offset?: number;
    }): Promise<{
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        isActive: boolean;
        source: string | null;
        email: string;
        firstName: string | null;
        lastName: string | null;
        subscribedAt: Date | null;
        unsubscribedAt: Date | null;
        preferences: Prisma.JsonValue | null;
    }[]>;
    createCampaign(data: Prisma.NewsletterCampaignCreateInput): Promise<{
        content: string;
        id: string;
        status: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        subject: string;
        sentAt: Date | null;
        sentCount: number;
        openCount: number;
        clickCount: number;
    }>;
    findCampaign(id: string): Promise<{
        content: string;
        id: string;
        status: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        subject: string;
        sentAt: Date | null;
        sentCount: number;
        openCount: number;
        clickCount: number;
    } | null>;
    updateCampaign(id: string, data: Prisma.NewsletterCampaignUpdateInput): Promise<{
        content: string;
        id: string;
        status: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        subject: string;
        sentAt: Date | null;
        sentCount: number;
        openCount: number;
        clickCount: number;
    }>;
    getAllCampaigns(options?: {
        status?: string;
        limit?: number;
        offset?: number;
    }): Promise<{
        content: string;
        id: string;
        status: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        subject: string;
        sentAt: Date | null;
        sentCount: number;
        openCount: number;
        clickCount: number;
    }[]>;
};
export declare const categoryService: {
    create(data: Prisma.CategoryCreateInput): Promise<{
        id: number;
        slug: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
        parentId: number | null;
    }>;
    findById(id: number): Promise<({
        content: ({
            content: {
                id: string;
                title: string;
                slug: string;
                contentTypeId: number;
                data: Prisma.JsonValue;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                createdAt: Date | null;
                updatedAt: Date | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            contentId: string;
            categoryId: number;
        })[];
        parent: {
            id: number;
            slug: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            description: string | null;
            parentId: number | null;
        } | null;
        children: {
            id: number;
            slug: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            description: string | null;
            parentId: number | null;
        }[];
    } & {
        id: number;
        slug: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
        parentId: number | null;
    }) | null>;
    findAll(options?: {
        parentId?: number | null;
        limit?: number;
        offset?: number;
    }): Promise<({
        content: ({
            content: {
                id: string;
                title: string;
                slug: string;
                contentTypeId: number;
                data: Prisma.JsonValue;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                createdAt: Date | null;
                updatedAt: Date | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            contentId: string;
            categoryId: number;
        })[];
        parent: {
            id: number;
            slug: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            description: string | null;
            parentId: number | null;
        } | null;
        children: {
            id: number;
            slug: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            description: string | null;
            parentId: number | null;
        }[];
    } & {
        id: number;
        slug: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
        parentId: number | null;
    })[]>;
    update(id: number, data: Prisma.CategoryUpdateInput): Promise<{
        content: ({
            content: {
                id: string;
                title: string;
                slug: string;
                contentTypeId: number;
                data: Prisma.JsonValue;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                createdAt: Date | null;
                updatedAt: Date | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            contentId: string;
            categoryId: number;
        })[];
        parent: {
            id: number;
            slug: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            description: string | null;
            parentId: number | null;
        } | null;
        children: {
            id: number;
            slug: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            description: string | null;
            parentId: number | null;
        }[];
    } & {
        id: number;
        slug: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
        parentId: number | null;
    }>;
    delete(id: number): Promise<{
        id: number;
        slug: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
        parentId: number | null;
    }>;
};
export declare const tagService: {
    create(data: Prisma.TagCreateInput): Promise<{
        id: number;
        slug: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
    }>;
    findById(id: number): Promise<({
        content: ({
            content: {
                id: string;
                title: string;
                slug: string;
                contentTypeId: number;
                data: Prisma.JsonValue;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                createdAt: Date | null;
                updatedAt: Date | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            contentId: string;
            tagId: number;
        })[];
    } & {
        id: number;
        slug: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
    }) | null>;
    findAll(options?: {
        limit?: number;
        offset?: number;
    }): Promise<({
        content: ({
            content: {
                id: string;
                title: string;
                slug: string;
                contentTypeId: number;
                data: Prisma.JsonValue;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                createdAt: Date | null;
                updatedAt: Date | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            contentId: string;
            tagId: number;
        })[];
    } & {
        id: number;
        slug: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
    })[]>;
    update(id: number, data: Prisma.TagUpdateInput): Promise<{
        content: ({
            content: {
                id: string;
                title: string;
                slug: string;
                contentTypeId: number;
                data: Prisma.JsonValue;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                createdAt: Date | null;
                updatedAt: Date | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            contentId: string;
            tagId: number;
        })[];
    } & {
        id: number;
        slug: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
    }>;
    delete(id: number): Promise<{
        id: number;
        slug: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
    }>;
};
export declare const mediaService: {
    create(data: Prisma.MediaAssetCreateInput): Promise<{
        url: string;
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        filename: string;
        originalName: string;
        mimeType: string;
        size: number;
        altText: string | null;
        metadata: Prisma.JsonValue | null;
    }>;
    findById(id: string): Promise<({
        siteMedia: ({
            content: {
                id: string;
                title: string;
                slug: string;
                contentTypeId: number;
                data: Prisma.JsonValue;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                createdAt: Date | null;
                updatedAt: Date | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
            site: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
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
                socialLinks: Prisma.JsonValue | null;
            };
        } & {
            siteId: string;
            contentId: string;
            mediaAssetId: string;
        })[];
    } & {
        url: string;
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        filename: string;
        originalName: string;
        mimeType: string;
        size: number;
        altText: string | null;
        metadata: Prisma.JsonValue | null;
    }) | null>;
    findByFilename(filename: string): Promise<({
        siteMedia: ({
            content: {
                id: string;
                title: string;
                slug: string;
                contentTypeId: number;
                data: Prisma.JsonValue;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                createdAt: Date | null;
                updatedAt: Date | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
            site: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
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
                socialLinks: Prisma.JsonValue | null;
            };
        } & {
            siteId: string;
            contentId: string;
            mediaAssetId: string;
        })[];
    } & {
        url: string;
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        filename: string;
        originalName: string;
        mimeType: string;
        size: number;
        altText: string | null;
        metadata: Prisma.JsonValue | null;
    }) | null>;
    findAll(options?: {
        mimeType?: string;
        limit?: number;
        offset?: number;
    }): Promise<({
        siteMedia: ({
            content: {
                id: string;
                title: string;
                slug: string;
                contentTypeId: number;
                data: Prisma.JsonValue;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                createdAt: Date | null;
                updatedAt: Date | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
            site: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
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
                socialLinks: Prisma.JsonValue | null;
            };
        } & {
            siteId: string;
            contentId: string;
            mediaAssetId: string;
        })[];
    } & {
        url: string;
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        filename: string;
        originalName: string;
        mimeType: string;
        size: number;
        altText: string | null;
        metadata: Prisma.JsonValue | null;
    })[]>;
    update(id: string, data: Prisma.MediaAssetUpdateInput): Promise<{
        siteMedia: ({
            content: {
                id: string;
                title: string;
                slug: string;
                contentTypeId: number;
                data: Prisma.JsonValue;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                createdAt: Date | null;
                updatedAt: Date | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
            site: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
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
                socialLinks: Prisma.JsonValue | null;
            };
        } & {
            siteId: string;
            contentId: string;
            mediaAssetId: string;
        })[];
    } & {
        url: string;
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        filename: string;
        originalName: string;
        mimeType: string;
        size: number;
        altText: string | null;
        metadata: Prisma.JsonValue | null;
    }>;
    delete(id: string): Promise<{
        url: string;
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        filename: string;
        originalName: string;
        mimeType: string;
        size: number;
        altText: string | null;
        metadata: Prisma.JsonValue | null;
    }>;
};
export declare const merchantService: {
    create(data: Prisma.MerchantCreateInput): Promise<{
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
        logoUrl: string | null;
        website: string | null;
    }>;
    findById(id: string): Promise<({
        affiliateLinks: {
            id: string;
            status: string;
            createdBy: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            siteId: string;
            productId: string | null;
            originalUrl: string;
            affiliateUrl: string;
            displayText: string | null;
            trackingId: string | null;
            commissionInfo: Prisma.JsonValue | null;
            expirationDate: Date | null;
            merchantId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
        logoUrl: string | null;
        website: string | null;
    }) | null>;
    findByName(name: string): Promise<({
        affiliateLinks: {
            id: string;
            status: string;
            createdBy: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            siteId: string;
            productId: string | null;
            originalUrl: string;
            affiliateUrl: string;
            displayText: string | null;
            trackingId: string | null;
            commissionInfo: Prisma.JsonValue | null;
            expirationDate: Date | null;
            merchantId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
        logoUrl: string | null;
        website: string | null;
    }) | null>;
    findAll(options?: {
        limit?: number;
        offset?: number;
    }): Promise<({
        affiliateLinks: {
            id: string;
            status: string;
            createdBy: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            siteId: string;
            productId: string | null;
            originalUrl: string;
            affiliateUrl: string;
            displayText: string | null;
            trackingId: string | null;
            commissionInfo: Prisma.JsonValue | null;
            expirationDate: Date | null;
            merchantId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
        logoUrl: string | null;
        website: string | null;
    })[]>;
    update(id: string, data: Prisma.MerchantUpdateInput): Promise<{
        affiliateLinks: {
            id: string;
            status: string;
            createdBy: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            name: string;
            siteId: string;
            productId: string | null;
            originalUrl: string;
            affiliateUrl: string;
            displayText: string | null;
            trackingId: string | null;
            commissionInfo: Prisma.JsonValue | null;
            expirationDate: Date | null;
            merchantId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
        logoUrl: string | null;
        website: string | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
        logoUrl: string | null;
        website: string | null;
    }>;
};
export declare const auditService: {
    log(data: Prisma.AuditLogCreateInput): Promise<{
        id: string;
        createdAt: Date | null;
        userId: string | null;
        action: string;
        tableName: string;
        recordId: string;
        oldValues: Prisma.JsonValue | null;
        newValues: Prisma.JsonValue | null;
    }>;
    findByUserId(userId: string, options?: {
        limit?: number;
        offset?: number;
    }): Promise<{
        id: string;
        createdAt: Date | null;
        userId: string | null;
        action: string;
        tableName: string;
        recordId: string;
        oldValues: Prisma.JsonValue | null;
        newValues: Prisma.JsonValue | null;
    }[]>;
    findByTable(tableName: string, recordId: string, options?: {
        limit?: number;
        offset?: number;
    }): Promise<{
        id: string;
        createdAt: Date | null;
        userId: string | null;
        action: string;
        tableName: string;
        recordId: string;
        oldValues: Prisma.JsonValue | null;
        newValues: Prisma.JsonValue | null;
    }[]>;
    findAll(options?: {
        limit?: number;
        offset?: number;
    }): Promise<{
        id: string;
        createdAt: Date | null;
        userId: string | null;
        action: string;
        tableName: string;
        recordId: string;
        oldValues: Prisma.JsonValue | null;
        newValues: Prisma.JsonValue | null;
    }[]>;
};
export declare const recipeService: {
    create(data: Prisma.RecipeCreateInput): Promise<{
        id: string;
        title: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        tags: Prisma.JsonValue | null;
        description: string | null;
        prepTime: number | null;
        cookTime: number | null;
        servings: number | null;
        difficulty: string | null;
        cuisine: string | null;
    }>;
    findById(id: string): Promise<({
        ingredients: {
            id: string;
            createdAt: Date | null;
            name: string;
            amount: Prisma.Decimal;
            unit: string;
            notes: string | null;
            order: number;
            recipeId: string;
        }[];
        instructions: {
            id: string;
            createdAt: Date | null;
            recipeId: string;
            stepNumber: number;
            instruction: string;
            imageUrl: string | null;
        }[];
    } & {
        id: string;
        title: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        tags: Prisma.JsonValue | null;
        description: string | null;
        prepTime: number | null;
        cookTime: number | null;
        servings: number | null;
        difficulty: string | null;
        cuisine: string | null;
    }) | null>;
    findByTitle(title: string): Promise<({
        ingredients: {
            id: string;
            createdAt: Date | null;
            name: string;
            amount: Prisma.Decimal;
            unit: string;
            notes: string | null;
            order: number;
            recipeId: string;
        }[];
        instructions: {
            id: string;
            createdAt: Date | null;
            recipeId: string;
            stepNumber: number;
            instruction: string;
            imageUrl: string | null;
        }[];
    } & {
        id: string;
        title: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        tags: Prisma.JsonValue | null;
        description: string | null;
        prepTime: number | null;
        cookTime: number | null;
        servings: number | null;
        difficulty: string | null;
        cuisine: string | null;
    }) | null>;
    findAll(options?: {
        cuisine?: string;
        difficulty?: string;
        limit?: number;
        offset?: number;
    }): Promise<({
        ingredients: {
            id: string;
            createdAt: Date | null;
            name: string;
            amount: Prisma.Decimal;
            unit: string;
            notes: string | null;
            order: number;
            recipeId: string;
        }[];
        instructions: {
            id: string;
            createdAt: Date | null;
            recipeId: string;
            stepNumber: number;
            instruction: string;
            imageUrl: string | null;
        }[];
    } & {
        id: string;
        title: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        tags: Prisma.JsonValue | null;
        description: string | null;
        prepTime: number | null;
        cookTime: number | null;
        servings: number | null;
        difficulty: string | null;
        cuisine: string | null;
    })[]>;
    update(id: string, data: Prisma.RecipeUpdateInput): Promise<{
        ingredients: {
            id: string;
            createdAt: Date | null;
            name: string;
            amount: Prisma.Decimal;
            unit: string;
            notes: string | null;
            order: number;
            recipeId: string;
        }[];
        instructions: {
            id: string;
            createdAt: Date | null;
            recipeId: string;
            stepNumber: number;
            instruction: string;
            imageUrl: string | null;
        }[];
    } & {
        id: string;
        title: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        tags: Prisma.JsonValue | null;
        description: string | null;
        prepTime: number | null;
        cookTime: number | null;
        servings: number | null;
        difficulty: string | null;
        cuisine: string | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        title: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        tags: Prisma.JsonValue | null;
        description: string | null;
        prepTime: number | null;
        cookTime: number | null;
        servings: number | null;
        difficulty: string | null;
        cuisine: string | null;
    }>;
    addIngredient(data: Prisma.RecipeIngredientCreateInput): Promise<{
        id: string;
        createdAt: Date | null;
        name: string;
        amount: Prisma.Decimal;
        unit: string;
        notes: string | null;
        order: number;
        recipeId: string;
    }>;
    updateIngredient(id: string, data: Prisma.RecipeIngredientUpdateInput): Promise<{
        id: string;
        createdAt: Date | null;
        name: string;
        amount: Prisma.Decimal;
        unit: string;
        notes: string | null;
        order: number;
        recipeId: string;
    }>;
    deleteIngredient(id: string): Promise<{
        id: string;
        createdAt: Date | null;
        name: string;
        amount: Prisma.Decimal;
        unit: string;
        notes: string | null;
        order: number;
        recipeId: string;
    }>;
    addInstruction(data: Prisma.RecipeInstructionCreateInput): Promise<{
        id: string;
        createdAt: Date | null;
        recipeId: string;
        stepNumber: number;
        instruction: string;
        imageUrl: string | null;
    }>;
    updateInstruction(id: string, data: Prisma.RecipeInstructionUpdateInput): Promise<{
        id: string;
        createdAt: Date | null;
        recipeId: string;
        stepNumber: number;
        instruction: string;
        imageUrl: string | null;
    }>;
    deleteInstruction(id: string): Promise<{
        id: string;
        createdAt: Date | null;
        recipeId: string;
        stepNumber: number;
        instruction: string;
        imageUrl: string | null;
    }>;
};
export declare const aiContentService: {
    log(data: Prisma.AIContentLogCreateInput): Promise<{
        error: string | null;
        model: string;
        id: string;
        status: string;
        createdAt: Date | null;
        prompt: string;
        response: string;
        tokensUsed: number;
        cost: Prisma.Decimal | null;
        duration: number | null;
    }>;
    findById(id: string): Promise<{
        error: string | null;
        model: string;
        id: string;
        status: string;
        createdAt: Date | null;
        prompt: string;
        response: string;
        tokensUsed: number;
        cost: Prisma.Decimal | null;
        duration: number | null;
    } | null>;
    findByStatus(status: string, options?: {
        limit?: number;
        offset?: number;
    }): Promise<{
        error: string | null;
        model: string;
        id: string;
        status: string;
        createdAt: Date | null;
        prompt: string;
        response: string;
        tokensUsed: number;
        cost: Prisma.Decimal | null;
        duration: number | null;
    }[]>;
    findAll(options?: {
        limit?: number;
        offset?: number;
    }): Promise<{
        error: string | null;
        model: string;
        id: string;
        status: string;
        createdAt: Date | null;
        prompt: string;
        response: string;
        tokensUsed: number;
        cost: Prisma.Decimal | null;
        duration: number | null;
    }[]>;
    getStats(): Promise<{
        totalLogs: number;
        successfulLogs: number;
        failedLogs: number;
        successRate: number;
        averageDuration: number;
    }>;
};
export declare const notificationService: {
    create(data: Prisma.RealTimeNotificationCreateInput): Promise<{
        id: string;
        title: string;
        createdAt: Date | null;
        userId: string;
        type: string;
        message: string;
        isRead: boolean;
    }>;
    findById(id: string): Promise<{
        id: string;
        title: string;
        createdAt: Date | null;
        userId: string;
        type: string;
        message: string;
        isRead: boolean;
    } | null>;
    findByUserId(userId: string, options?: {
        isRead?: boolean;
        limit?: number;
        offset?: number;
    }): Promise<{
        id: string;
        title: string;
        createdAt: Date | null;
        userId: string;
        type: string;
        message: string;
        isRead: boolean;
    }[]>;
    markAsRead(id: string): Promise<{
        id: string;
        title: string;
        createdAt: Date | null;
        userId: string;
        type: string;
        message: string;
        isRead: boolean;
    }>;
    markAllAsRead(userId: string): Promise<Prisma.BatchPayload>;
    delete(id: string): Promise<{
        id: string;
        title: string;
        createdAt: Date | null;
        userId: string;
        type: string;
        message: string;
        isRead: boolean;
    }>;
};
export declare const contentTypeService: {
    create(data: Prisma.ContentTypeCreateInput): Promise<{
        id: number;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
        schema: Prisma.JsonValue | null;
    }>;
    findById(id: number): Promise<({
        content: {
            id: string;
            title: string;
            slug: string;
            contentTypeId: number;
            data: Prisma.JsonValue;
            status: string;
            createdBy: string | null;
            updatedBy: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            version: number | null;
            scheduledPublishAt: Date | null;
        }[];
    } & {
        id: number;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
        schema: Prisma.JsonValue | null;
    }) | null>;
    findByName(name: string): Promise<({
        content: {
            id: string;
            title: string;
            slug: string;
            contentTypeId: number;
            data: Prisma.JsonValue;
            status: string;
            createdBy: string | null;
            updatedBy: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            version: number | null;
            scheduledPublishAt: Date | null;
        }[];
    } & {
        id: number;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
        schema: Prisma.JsonValue | null;
    }) | null>;
    findAll(options?: {
        limit?: number;
        offset?: number;
    }): Promise<({
        content: {
            id: string;
            title: string;
            slug: string;
            contentTypeId: number;
            data: Prisma.JsonValue;
            status: string;
            createdBy: string | null;
            updatedBy: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            version: number | null;
            scheduledPublishAt: Date | null;
        }[];
    } & {
        id: number;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
        schema: Prisma.JsonValue | null;
    })[]>;
    update(id: number, data: Prisma.ContentTypeUpdateInput): Promise<{
        content: {
            id: string;
            title: string;
            slug: string;
            contentTypeId: number;
            data: Prisma.JsonValue;
            status: string;
            createdBy: string | null;
            updatedBy: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            version: number | null;
            scheduledPublishAt: Date | null;
        }[];
    } & {
        id: number;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
        schema: Prisma.JsonValue | null;
    }>;
    delete(id: number): Promise<{
        id: number;
        createdAt: Date | null;
        updatedAt: Date | null;
        name: string;
        description: string | null;
        schema: Prisma.JsonValue | null;
    }>;
};
export default prisma;
//# sourceMappingURL=utils.d.ts.map