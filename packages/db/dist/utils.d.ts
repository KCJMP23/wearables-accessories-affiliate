import { PrismaClient, Prisma } from '@prisma/client';
declare const prisma: PrismaClient<Prisma.PrismaClientOptions, never, import("@prisma/client/runtime/library").DefaultArgs>;
export declare const contentService: {
    create(data: Prisma.ContentCreateInput): Promise<{
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        data: Prisma.JsonValue;
        title: string;
        slug: string;
        contentTypeId: number;
        status: string;
        createdBy: string | null;
        updatedBy: string | null;
        version: number | null;
        scheduledPublishAt: Date | null;
    }>;
    findById(id: string): Promise<({
        media: ({
            mediaAsset: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                filename: string;
                originalName: string;
                mimeType: string;
                size: number;
                url: string;
                altText: string | null;
                metadata: Prisma.JsonValue | null;
            };
        } & {
            contentId: string;
            siteId: string;
            mediaAssetId: string;
        })[];
        contentType: {
            id: number;
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            description: string | null;
            schema: Prisma.JsonValue | null;
        };
        siteContent: ({
            site: {
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
                socialLinks: Prisma.JsonValue | null;
                createdAt: Date | null;
                updatedAt: Date | null;
            };
        } & {
            contentId: string;
            siteId: string;
        })[];
        categories: ({
            category: {
                id: number;
                name: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                slug: string;
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
                name: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                slug: string;
                description: string | null;
            };
        } & {
            contentId: string;
            tagId: number;
        })[];
        versions: {
            id: string;
            createdAt: Date | null;
            data: Prisma.JsonValue;
            createdBy: string | null;
            version: number;
            contentId: string;
        }[];
    } & {
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        data: Prisma.JsonValue;
        title: string;
        slug: string;
        contentTypeId: number;
        status: string;
        createdBy: string | null;
        updatedBy: string | null;
        version: number | null;
        scheduledPublishAt: Date | null;
    }) | null>;
    findBySlug(slug: string): Promise<({
        media: ({
            mediaAsset: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                filename: string;
                originalName: string;
                mimeType: string;
                size: number;
                url: string;
                altText: string | null;
                metadata: Prisma.JsonValue | null;
            };
        } & {
            contentId: string;
            siteId: string;
            mediaAssetId: string;
        })[];
        contentType: {
            id: number;
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            description: string | null;
            schema: Prisma.JsonValue | null;
        };
        siteContent: ({
            site: {
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
                socialLinks: Prisma.JsonValue | null;
                createdAt: Date | null;
                updatedAt: Date | null;
            };
        } & {
            contentId: string;
            siteId: string;
        })[];
        categories: ({
            category: {
                id: number;
                name: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                slug: string;
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
                name: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                slug: string;
                description: string | null;
            };
        } & {
            contentId: string;
            tagId: number;
        })[];
        versions: {
            id: string;
            createdAt: Date | null;
            data: Prisma.JsonValue;
            createdBy: string | null;
            version: number;
            contentId: string;
        }[];
    } & {
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        data: Prisma.JsonValue;
        title: string;
        slug: string;
        contentTypeId: number;
        status: string;
        createdBy: string | null;
        updatedBy: string | null;
        version: number | null;
        scheduledPublishAt: Date | null;
    }) | null>;
    findAll(options?: {
        status?: string;
        contentTypeId?: number;
        limit?: number;
        offset?: number;
    }): Promise<({
        media: ({
            mediaAsset: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                filename: string;
                originalName: string;
                mimeType: string;
                size: number;
                url: string;
                altText: string | null;
                metadata: Prisma.JsonValue | null;
            };
        } & {
            contentId: string;
            siteId: string;
            mediaAssetId: string;
        })[];
        contentType: {
            id: number;
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            description: string | null;
            schema: Prisma.JsonValue | null;
        };
        siteContent: ({
            site: {
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
                socialLinks: Prisma.JsonValue | null;
                createdAt: Date | null;
                updatedAt: Date | null;
            };
        } & {
            contentId: string;
            siteId: string;
        })[];
        categories: ({
            category: {
                id: number;
                name: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                slug: string;
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
                name: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                slug: string;
                description: string | null;
            };
        } & {
            contentId: string;
            tagId: number;
        })[];
        versions: {
            id: string;
            createdAt: Date | null;
            data: Prisma.JsonValue;
            createdBy: string | null;
            version: number;
            contentId: string;
        }[];
    } & {
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        data: Prisma.JsonValue;
        title: string;
        slug: string;
        contentTypeId: number;
        status: string;
        createdBy: string | null;
        updatedBy: string | null;
        version: number | null;
        scheduledPublishAt: Date | null;
    })[]>;
    update(id: string, data: Prisma.ContentUpdateInput): Promise<{
        media: ({
            mediaAsset: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                filename: string;
                originalName: string;
                mimeType: string;
                size: number;
                url: string;
                altText: string | null;
                metadata: Prisma.JsonValue | null;
            };
        } & {
            contentId: string;
            siteId: string;
            mediaAssetId: string;
        })[];
        contentType: {
            id: number;
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            description: string | null;
            schema: Prisma.JsonValue | null;
        };
        siteContent: ({
            site: {
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
                socialLinks: Prisma.JsonValue | null;
                createdAt: Date | null;
                updatedAt: Date | null;
            };
        } & {
            contentId: string;
            siteId: string;
        })[];
        categories: ({
            category: {
                id: number;
                name: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                slug: string;
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
                name: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                slug: string;
                description: string | null;
            };
        } & {
            contentId: string;
            tagId: number;
        })[];
        versions: {
            id: string;
            createdAt: Date | null;
            data: Prisma.JsonValue;
            createdBy: string | null;
            version: number;
            contentId: string;
        }[];
    } & {
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        data: Prisma.JsonValue;
        title: string;
        slug: string;
        contentTypeId: number;
        status: string;
        createdBy: string | null;
        updatedBy: string | null;
        version: number | null;
        scheduledPublishAt: Date | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        data: Prisma.JsonValue;
        title: string;
        slug: string;
        contentTypeId: number;
        status: string;
        createdBy: string | null;
        updatedBy: string | null;
        version: number | null;
        scheduledPublishAt: Date | null;
    }>;
    addCategory(contentId: string, categoryId: number): Promise<{
        category: {
            id: number;
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            slug: string;
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
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            slug: string;
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
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
    findById(id: string): Promise<({
        content: ({
            content: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                data: Prisma.JsonValue;
                title: string;
                slug: string;
                contentTypeId: number;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            contentId: string;
            siteId: string;
        })[];
        media: ({
            mediaAsset: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                filename: string;
                originalName: string;
                mimeType: string;
                size: number;
                url: string;
                altText: string | null;
                metadata: Prisma.JsonValue | null;
            };
        } & {
            contentId: string;
            siteId: string;
            mediaAssetId: string;
        })[];
        products: ({
            product: {
                id: string;
                name: string;
                createdAt: Date | null;
                updatedAt: Date | null;
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
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            status: string;
            createdBy: string | null;
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
        createdAt: Date | null;
        updatedAt: Date | null;
    }) | null>;
    findByDomain(domain: string): Promise<({
        content: ({
            content: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                data: Prisma.JsonValue;
                title: string;
                slug: string;
                contentTypeId: number;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            contentId: string;
            siteId: string;
        })[];
        media: ({
            mediaAsset: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                filename: string;
                originalName: string;
                mimeType: string;
                size: number;
                url: string;
                altText: string | null;
                metadata: Prisma.JsonValue | null;
            };
        } & {
            contentId: string;
            siteId: string;
            mediaAssetId: string;
        })[];
        products: ({
            product: {
                id: string;
                name: string;
                createdAt: Date | null;
                updatedAt: Date | null;
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
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            status: string;
            createdBy: string | null;
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
        createdAt: Date | null;
        updatedAt: Date | null;
    }) | null>;
    findAll(options?: {
        limit?: number;
        offset?: number;
    }): Promise<({
        content: ({
            content: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                data: Prisma.JsonValue;
                title: string;
                slug: string;
                contentTypeId: number;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            contentId: string;
            siteId: string;
        })[];
        media: ({
            mediaAsset: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                filename: string;
                originalName: string;
                mimeType: string;
                size: number;
                url: string;
                altText: string | null;
                metadata: Prisma.JsonValue | null;
            };
        } & {
            contentId: string;
            siteId: string;
            mediaAssetId: string;
        })[];
        products: ({
            product: {
                id: string;
                name: string;
                createdAt: Date | null;
                updatedAt: Date | null;
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
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            status: string;
            createdBy: string | null;
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
        createdAt: Date | null;
        updatedAt: Date | null;
    })[]>;
    update(id: string, data: Prisma.SiteUpdateInput): Promise<{
        content: ({
            content: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                data: Prisma.JsonValue;
                title: string;
                slug: string;
                contentTypeId: number;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            contentId: string;
            siteId: string;
        })[];
        media: ({
            mediaAsset: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                filename: string;
                originalName: string;
                mimeType: string;
                size: number;
                url: string;
                altText: string | null;
                metadata: Prisma.JsonValue | null;
            };
        } & {
            contentId: string;
            siteId: string;
            mediaAssetId: string;
        })[];
        products: ({
            product: {
                id: string;
                name: string;
                createdAt: Date | null;
                updatedAt: Date | null;
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
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            status: string;
            createdBy: string | null;
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
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
    delete(id: string): Promise<{
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
        socialLinks: Prisma.JsonValue | null;
        createdAt: Date | null;
        updatedAt: Date | null;
    }>;
};
export declare const affiliateLinkService: {
    create(data: Prisma.AffiliateLinkCreateInput): Promise<{
        id: string;
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        status: string;
        createdBy: string | null;
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
            createdAt: Date | null;
            updatedAt: Date | null;
        };
        product: {
            id: string;
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            description: string | null;
            manufacturer: string | null;
            basePrice: Prisma.Decimal;
            mainImageUrl: string | null;
            specifications: Prisma.JsonValue | null;
        } | null;
        merchant: {
            id: string;
            name: string;
            logoUrl: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            description: string | null;
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
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        status: string;
        createdBy: string | null;
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
            createdAt: Date | null;
            updatedAt: Date | null;
        };
        product: {
            id: string;
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            description: string | null;
            manufacturer: string | null;
            basePrice: Prisma.Decimal;
            mainImageUrl: string | null;
            specifications: Prisma.JsonValue | null;
        } | null;
        merchant: {
            id: string;
            name: string;
            logoUrl: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            description: string | null;
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
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        status: string;
        createdBy: string | null;
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
            createdAt: Date | null;
            updatedAt: Date | null;
        };
        product: {
            id: string;
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            description: string | null;
            manufacturer: string | null;
            basePrice: Prisma.Decimal;
            mainImageUrl: string | null;
            specifications: Prisma.JsonValue | null;
        } | null;
        merchant: {
            id: string;
            name: string;
            logoUrl: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            description: string | null;
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
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        status: string;
        createdBy: string | null;
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
            createdAt: Date | null;
            updatedAt: Date | null;
        };
        product: {
            id: string;
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            description: string | null;
            manufacturer: string | null;
            basePrice: Prisma.Decimal;
            mainImageUrl: string | null;
            specifications: Prisma.JsonValue | null;
        } | null;
        merchant: {
            id: string;
            name: string;
            logoUrl: string | null;
            createdAt: Date | null;
            updatedAt: Date | null;
            description: string | null;
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
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        status: string;
        createdBy: string | null;
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
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        status: string;
        createdBy: string | null;
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
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        manufacturer: string | null;
        basePrice: Prisma.Decimal;
        mainImageUrl: string | null;
        specifications: Prisma.JsonValue | null;
    }>;
    findById(id: string): Promise<({
        affiliateLinks: {
            id: string;
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            status: string;
            createdBy: string | null;
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
                createdAt: Date | null;
                updatedAt: Date | null;
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
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
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
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            status: string;
            createdBy: string | null;
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
                createdAt: Date | null;
                updatedAt: Date | null;
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
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
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
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            status: string;
            createdBy: string | null;
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
                createdAt: Date | null;
                updatedAt: Date | null;
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
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        manufacturer: string | null;
        basePrice: Prisma.Decimal;
        mainImageUrl: string | null;
        specifications: Prisma.JsonValue | null;
    })[]>;
    update(id: string, data: Prisma.ProductUpdateInput): Promise<{
        affiliateLinks: {
            id: string;
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            status: string;
            createdBy: string | null;
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
                createdAt: Date | null;
                updatedAt: Date | null;
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
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        manufacturer: string | null;
        basePrice: Prisma.Decimal;
        mainImageUrl: string | null;
        specifications: Prisma.JsonValue | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
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
                    name: string;
                    createdAt: Date | null;
                    updatedAt: Date | null;
                    description: string | null;
                    manufacturer: string | null;
                    basePrice: Prisma.Decimal;
                    mainImageUrl: string | null;
                    specifications: Prisma.JsonValue | null;
                } | null;
            } & {
                id: string;
                name: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                status: string;
                createdBy: string | null;
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
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
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
        id: string;
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        content: string;
        status: string;
        subject: string;
        sentAt: Date | null;
        sentCount: number;
        openCount: number;
        clickCount: number;
    }>;
    findCampaign(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        content: string;
        status: string;
        subject: string;
        sentAt: Date | null;
        sentCount: number;
        openCount: number;
        clickCount: number;
    } | null>;
    updateCampaign(id: string, data: Prisma.NewsletterCampaignUpdateInput): Promise<{
        id: string;
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        content: string;
        status: string;
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
        id: string;
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        content: string;
        status: string;
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
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        slug: string;
        description: string | null;
        parentId: number | null;
    }>;
    findById(id: number): Promise<({
        content: ({
            content: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                data: Prisma.JsonValue;
                title: string;
                slug: string;
                contentTypeId: number;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            contentId: string;
            categoryId: number;
        })[];
        parent: {
            id: number;
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            slug: string;
            description: string | null;
            parentId: number | null;
        } | null;
        children: {
            id: number;
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            slug: string;
            description: string | null;
            parentId: number | null;
        }[];
    } & {
        id: number;
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        slug: string;
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
                createdAt: Date | null;
                updatedAt: Date | null;
                data: Prisma.JsonValue;
                title: string;
                slug: string;
                contentTypeId: number;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            contentId: string;
            categoryId: number;
        })[];
        parent: {
            id: number;
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            slug: string;
            description: string | null;
            parentId: number | null;
        } | null;
        children: {
            id: number;
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            slug: string;
            description: string | null;
            parentId: number | null;
        }[];
    } & {
        id: number;
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        slug: string;
        description: string | null;
        parentId: number | null;
    })[]>;
    update(id: number, data: Prisma.CategoryUpdateInput): Promise<{
        content: ({
            content: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                data: Prisma.JsonValue;
                title: string;
                slug: string;
                contentTypeId: number;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            contentId: string;
            categoryId: number;
        })[];
        parent: {
            id: number;
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            slug: string;
            description: string | null;
            parentId: number | null;
        } | null;
        children: {
            id: number;
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            slug: string;
            description: string | null;
            parentId: number | null;
        }[];
    } & {
        id: number;
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        slug: string;
        description: string | null;
        parentId: number | null;
    }>;
    delete(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        slug: string;
        description: string | null;
        parentId: number | null;
    }>;
};
export declare const tagService: {
    create(data: Prisma.TagCreateInput): Promise<{
        id: number;
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        slug: string;
        description: string | null;
    }>;
    findById(id: number): Promise<({
        content: ({
            content: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                data: Prisma.JsonValue;
                title: string;
                slug: string;
                contentTypeId: number;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            contentId: string;
            tagId: number;
        })[];
    } & {
        id: number;
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        slug: string;
        description: string | null;
    }) | null>;
    findAll(options?: {
        limit?: number;
        offset?: number;
    }): Promise<({
        content: ({
            content: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                data: Prisma.JsonValue;
                title: string;
                slug: string;
                contentTypeId: number;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            contentId: string;
            tagId: number;
        })[];
    } & {
        id: number;
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        slug: string;
        description: string | null;
    })[]>;
    update(id: number, data: Prisma.TagUpdateInput): Promise<{
        content: ({
            content: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                data: Prisma.JsonValue;
                title: string;
                slug: string;
                contentTypeId: number;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            contentId: string;
            tagId: number;
        })[];
    } & {
        id: number;
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        slug: string;
        description: string | null;
    }>;
    delete(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        slug: string;
        description: string | null;
    }>;
};
export declare const mediaService: {
    create(data: Prisma.MediaAssetCreateInput): Promise<{
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        filename: string;
        originalName: string;
        mimeType: string;
        size: number;
        url: string;
        altText: string | null;
        metadata: Prisma.JsonValue | null;
    }>;
    findById(id: string): Promise<({
        siteMedia: ({
            site: {
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
                socialLinks: Prisma.JsonValue | null;
                createdAt: Date | null;
                updatedAt: Date | null;
            };
            content: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                data: Prisma.JsonValue;
                title: string;
                slug: string;
                contentTypeId: number;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            contentId: string;
            siteId: string;
            mediaAssetId: string;
        })[];
    } & {
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        filename: string;
        originalName: string;
        mimeType: string;
        size: number;
        url: string;
        altText: string | null;
        metadata: Prisma.JsonValue | null;
    }) | null>;
    findByFilename(filename: string): Promise<({
        siteMedia: ({
            site: {
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
                socialLinks: Prisma.JsonValue | null;
                createdAt: Date | null;
                updatedAt: Date | null;
            };
            content: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                data: Prisma.JsonValue;
                title: string;
                slug: string;
                contentTypeId: number;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            contentId: string;
            siteId: string;
            mediaAssetId: string;
        })[];
    } & {
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        filename: string;
        originalName: string;
        mimeType: string;
        size: number;
        url: string;
        altText: string | null;
        metadata: Prisma.JsonValue | null;
    }) | null>;
    findAll(options?: {
        mimeType?: string;
        limit?: number;
        offset?: number;
    }): Promise<({
        siteMedia: ({
            site: {
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
                socialLinks: Prisma.JsonValue | null;
                createdAt: Date | null;
                updatedAt: Date | null;
            };
            content: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                data: Prisma.JsonValue;
                title: string;
                slug: string;
                contentTypeId: number;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            contentId: string;
            siteId: string;
            mediaAssetId: string;
        })[];
    } & {
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        filename: string;
        originalName: string;
        mimeType: string;
        size: number;
        url: string;
        altText: string | null;
        metadata: Prisma.JsonValue | null;
    })[]>;
    update(id: string, data: Prisma.MediaAssetUpdateInput): Promise<{
        siteMedia: ({
            site: {
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
                socialLinks: Prisma.JsonValue | null;
                createdAt: Date | null;
                updatedAt: Date | null;
            };
            content: {
                id: string;
                createdAt: Date | null;
                updatedAt: Date | null;
                data: Prisma.JsonValue;
                title: string;
                slug: string;
                contentTypeId: number;
                status: string;
                createdBy: string | null;
                updatedBy: string | null;
                version: number | null;
                scheduledPublishAt: Date | null;
            };
        } & {
            contentId: string;
            siteId: string;
            mediaAssetId: string;
        })[];
    } & {
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        filename: string;
        originalName: string;
        mimeType: string;
        size: number;
        url: string;
        altText: string | null;
        metadata: Prisma.JsonValue | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        filename: string;
        originalName: string;
        mimeType: string;
        size: number;
        url: string;
        altText: string | null;
        metadata: Prisma.JsonValue | null;
    }>;
};
export declare const merchantService: {
    create(data: Prisma.MerchantCreateInput): Promise<{
        id: string;
        name: string;
        logoUrl: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        website: string | null;
    }>;
    findById(id: string): Promise<({
        affiliateLinks: {
            id: string;
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            status: string;
            createdBy: string | null;
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
        name: string;
        logoUrl: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        website: string | null;
    }) | null>;
    findByName(name: string): Promise<({
        affiliateLinks: {
            id: string;
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            status: string;
            createdBy: string | null;
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
        name: string;
        logoUrl: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        website: string | null;
    }) | null>;
    findAll(options?: {
        limit?: number;
        offset?: number;
    }): Promise<({
        affiliateLinks: {
            id: string;
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            status: string;
            createdBy: string | null;
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
        name: string;
        logoUrl: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        website: string | null;
    })[]>;
    update(id: string, data: Prisma.MerchantUpdateInput): Promise<{
        affiliateLinks: {
            id: string;
            name: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            status: string;
            createdBy: string | null;
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
        name: string;
        logoUrl: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        website: string | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        logoUrl: string | null;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
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
        createdAt: Date | null;
        updatedAt: Date | null;
        title: string;
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
            name: string;
            createdAt: Date | null;
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
        createdAt: Date | null;
        updatedAt: Date | null;
        title: string;
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
            name: string;
            createdAt: Date | null;
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
        createdAt: Date | null;
        updatedAt: Date | null;
        title: string;
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
            name: string;
            createdAt: Date | null;
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
        createdAt: Date | null;
        updatedAt: Date | null;
        title: string;
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
            name: string;
            createdAt: Date | null;
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
        createdAt: Date | null;
        updatedAt: Date | null;
        title: string;
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
        createdAt: Date | null;
        updatedAt: Date | null;
        title: string;
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
        name: string;
        createdAt: Date | null;
        amount: Prisma.Decimal;
        unit: string;
        notes: string | null;
        order: number;
        recipeId: string;
    }>;
    updateIngredient(id: string, data: Prisma.RecipeIngredientUpdateInput): Promise<{
        id: string;
        name: string;
        createdAt: Date | null;
        amount: Prisma.Decimal;
        unit: string;
        notes: string | null;
        order: number;
        recipeId: string;
    }>;
    deleteIngredient(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date | null;
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
        id: string;
        createdAt: Date | null;
        model: string;
        status: string;
        prompt: string;
        response: string;
        tokensUsed: number;
        cost: Prisma.Decimal | null;
        duration: number | null;
    }>;
    findById(id: string): Promise<{
        error: string | null;
        id: string;
        createdAt: Date | null;
        model: string;
        status: string;
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
        id: string;
        createdAt: Date | null;
        model: string;
        status: string;
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
        id: string;
        createdAt: Date | null;
        model: string;
        status: string;
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
        createdAt: Date | null;
        title: string;
        userId: string;
        type: string;
        message: string;
        isRead: boolean;
    }>;
    findById(id: string): Promise<{
        id: string;
        createdAt: Date | null;
        title: string;
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
        createdAt: Date | null;
        title: string;
        userId: string;
        type: string;
        message: string;
        isRead: boolean;
    }[]>;
    markAsRead(id: string): Promise<{
        id: string;
        createdAt: Date | null;
        title: string;
        userId: string;
        type: string;
        message: string;
        isRead: boolean;
    }>;
    markAllAsRead(userId: string): Promise<Prisma.BatchPayload>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date | null;
        title: string;
        userId: string;
        type: string;
        message: string;
        isRead: boolean;
    }>;
};
export declare const contentTypeService: {
    create(data: Prisma.ContentTypeCreateInput): Promise<{
        id: number;
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        schema: Prisma.JsonValue | null;
    }>;
    findById(id: number): Promise<({
        content: {
            id: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            data: Prisma.JsonValue;
            title: string;
            slug: string;
            contentTypeId: number;
            status: string;
            createdBy: string | null;
            updatedBy: string | null;
            version: number | null;
            scheduledPublishAt: Date | null;
        }[];
    } & {
        id: number;
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        schema: Prisma.JsonValue | null;
    }) | null>;
    findByName(name: string): Promise<({
        content: {
            id: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            data: Prisma.JsonValue;
            title: string;
            slug: string;
            contentTypeId: number;
            status: string;
            createdBy: string | null;
            updatedBy: string | null;
            version: number | null;
            scheduledPublishAt: Date | null;
        }[];
    } & {
        id: number;
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        schema: Prisma.JsonValue | null;
    }) | null>;
    findAll(options?: {
        limit?: number;
        offset?: number;
    }): Promise<({
        content: {
            id: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            data: Prisma.JsonValue;
            title: string;
            slug: string;
            contentTypeId: number;
            status: string;
            createdBy: string | null;
            updatedBy: string | null;
            version: number | null;
            scheduledPublishAt: Date | null;
        }[];
    } & {
        id: number;
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        schema: Prisma.JsonValue | null;
    })[]>;
    update(id: number, data: Prisma.ContentTypeUpdateInput): Promise<{
        content: {
            id: string;
            createdAt: Date | null;
            updatedAt: Date | null;
            data: Prisma.JsonValue;
            title: string;
            slug: string;
            contentTypeId: number;
            status: string;
            createdBy: string | null;
            updatedBy: string | null;
            version: number | null;
            scheduledPublishAt: Date | null;
        }[];
    } & {
        id: number;
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        schema: Prisma.JsonValue | null;
    }>;
    delete(id: number): Promise<{
        id: number;
        name: string;
        createdAt: Date | null;
        updatedAt: Date | null;
        description: string | null;
        schema: Prisma.JsonValue | null;
    }>;
};
export default prisma;
//# sourceMappingURL=utils.d.ts.map