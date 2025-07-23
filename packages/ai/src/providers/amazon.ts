import { ProductAdvertisingAPI } from 'amazon-paapi';

export interface AmazonProduct {
  asin: string;
  title: string;
  price: {
    amount: number;
    currency: string;
    displayAmount: string;
  };
  image: string;
  rating: number;
  reviewCount: number;
  availability: string;
  features: string[];
  description: string;
  affiliateUrl: string;
  category: string;
}

export interface AmazonSearchParams {
  keywords: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sortBy?: 'relevance' | 'price-low-to-high' | 'price-high-to-low' | 'average-customer-review' | 'newest-arrivals';
  itemCount?: number;
}

export class AmazonAssociatesService {
  private client: ProductAdvertisingAPI;
  private associateTag: string;
  private region: string;

  constructor() {
    const accessKeyId = process.env.AMAZON_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AMAZON_SECRET_ACCESS_KEY;
    this.associateTag = process.env.AMAZON_ASSOCIATE_TAG || '';
    this.region = process.env.AMAZON_REGION || 'us-east-1';

    if (!accessKeyId || !secretAccessKey) {
      throw new Error('Amazon Associates credentials not configured');
    }

    this.client = new ProductAdvertisingAPI({
      accessKey: accessKeyId,
      secretKey: secretAccessKey,
      partnerTag: this.associateTag,
      partnerType: 'Associates',
      marketplace: this.getMarketplace(),
    });
  }

  private getMarketplace(): string {
    const regionMap: Record<string, string> = {
      'us-east-1': 'www.amazon.com',
      'us-west-1': 'www.amazon.com',
      'eu-west-1': 'www.amazon.co.uk',
      'eu-central-1': 'www.amazon.de',
      'ca-central-1': 'www.amazon.ca',
      'ap-southeast-1': 'www.amazon.com.au',
      'ap-northeast-1': 'www.amazon.co.jp',
    };
    return regionMap[this.region] || 'www.amazon.com';
  }

  async searchProducts(params: AmazonSearchParams): Promise<AmazonProduct[]> {
    try {
      const searchParams = {
        Keywords: params.keywords,
        SearchIndex: 'All',
        ItemCount: params.itemCount || 10,
        SortBy: params.sortBy || 'relevance',
        ...(params.category && { BrowseNode: params.category }),
        ...(params.minPrice && { MinimumPrice: params.minPrice }),
        ...(params.maxPrice && { MaximumPrice: params.maxPrice }),
      };

      const response = await this.client.searchItems(searchParams);
      
      if (!response.ItemsResult?.Items) {
        return [];
      }

      return response.ItemsResult.Items.map((item: any) => ({
        asin: item.ASIN,
        title: item.ItemInfo?.Title?.DisplayValue || '',
        price: {
          amount: item.Offers?.Listings?.[0]?.Price?.Amount || 0,
          currency: item.Offers?.Listings?.[0]?.Price?.Currency || 'USD',
          displayAmount: item.Offers?.Listings?.[0]?.Price?.DisplayAmount || '',
        },
        image: item.Images?.Primary?.Large?.URL || '',
        rating: item.CustomerReviews?.Rating || 0,
        reviewCount: item.CustomerReviews?.Count || 0,
        availability: item.Offers?.Listings?.[0]?.Availability?.Message || 'Unknown',
        features: item.Features?.DisplayValues || [],
        description: item.ItemInfo?.Features?.DisplayValues?.[0] || '',
        affiliateUrl: item.DetailPageURL || '',
        category: item.ItemInfo?.ProductInfo?.ItemClassification?.ProductGroup || '',
      }));
    } catch (error) {
      console.error('Amazon API search error:', error);
      throw new Error('Failed to search Amazon products');
    }
  }

  async getProductByASIN(asin: string): Promise<AmazonProduct | null> {
    try {
      const response = await this.client.searchItems({
        ItemIds: [asin],
        Resources: [
          'ItemInfo.Title',
          'Offers.Listings.Price',
          'Images.Primary.Large',
          'CustomerReviews',
          'ItemInfo.Features',
          'ItemInfo.ProductInfo',
        ],
      });

      const item = response.ItemsResult?.Items?.[0];
      if (!item) {
        return null;
      }

      return {
        asin: item.ASIN,
        title: item.ItemInfo?.Title?.DisplayValue || '',
        price: {
          amount: item.Offers?.Listings?.[0]?.Price?.Amount || 0,
          currency: item.Offers?.Listings?.[0]?.Price?.Currency || 'USD',
          displayAmount: item.Offers?.Listings?.[0]?.Price?.DisplayAmount || '',
        },
        image: item.Images?.Primary?.Large?.URL || '',
        rating: item.CustomerReviews?.Rating || 0,
        reviewCount: item.CustomerReviews?.Count || 0,
        availability: item.Offers?.Listings?.[0]?.Availability?.Message || 'Unknown',
        features: item.Features?.DisplayValues || [],
        description: item.ItemInfo?.Features?.DisplayValues?.[0] || '',
        affiliateUrl: item.DetailPageURL || '',
        category: item.ItemInfo?.ProductInfo?.ItemClassification?.ProductGroup || '',
      };
    } catch (error) {
      console.error('Amazon API product fetch error:', error);
      throw new Error('Failed to fetch Amazon product');
    }
  }

  async getProductByURL(url: string): Promise<AmazonProduct | null> {
    try {
      // Extract ASIN from Amazon URL
      const asinMatch = url.match(/\/dp\/([A-Z0-9]{10})/);
      if (!asinMatch) {
        throw new Error('Invalid Amazon URL format');
      }

      const asin = asinMatch[1];
      return await this.getProductByASIN(asin);
    } catch (error) {
      console.error('Amazon API URL parsing error:', error);
      throw new Error('Failed to parse Amazon URL');
    }
  }

  async getTopProducts(category: string, limit: number = 10): Promise<AmazonProduct[]> {
    try {
      const response = await this.client.searchItems({
        SearchIndex: 'All',
        BrowseNode: category,
        SortBy: 'average-customer-review',
        ItemCount: limit,
      });

      if (!response.ItemsResult?.Items) {
        return [];
      }

      return response.ItemsResult.Items.map((item: any) => ({
        asin: item.ASIN,
        title: item.ItemInfo?.Title?.DisplayValue || '',
        price: {
          amount: item.Offers?.Listings?.[0]?.Price?.Amount || 0,
          currency: item.Offers?.Listings?.[0]?.Price?.Currency || 'USD',
          displayAmount: item.Offers?.Listings?.[0]?.Price?.DisplayAmount || '',
        },
        image: item.Images?.Primary?.Large?.URL || '',
        rating: item.CustomerReviews?.Rating || 0,
        reviewCount: item.CustomerReviews?.Count || 0,
        availability: item.Offers?.Listings?.[0]?.Availability?.Message || 'Unknown',
        features: item.Features?.DisplayValues || [],
        description: item.ItemInfo?.Features?.DisplayValues?.[0] || '',
        affiliateUrl: item.DetailPageURL || '',
        category: item.ItemInfo?.ProductInfo?.ItemClassification?.ProductGroup || '',
      }));
    } catch (error) {
      console.error('Amazon API top products error:', error);
      throw new Error('Failed to fetch top Amazon products');
    }
  }

  async getDeals(limit: number = 10): Promise<AmazonProduct[]> {
    try {
      const response = await this.client.searchItems({
        SearchIndex: 'All',
        Keywords: 'deals sale discount',
        SortBy: 'price-low-to-high',
        ItemCount: limit,
      });

      if (!response.ItemsResult?.Items) {
        return [];
      }

      return response.ItemsResult.Items.map((item: any) => ({
        asin: item.ASIN,
        title: item.ItemInfo?.Title?.DisplayValue || '',
        price: {
          amount: item.Offers?.Listings?.[0]?.Price?.Amount || 0,
          currency: item.Offers?.Listings?.[0]?.Price?.Currency || 'USD',
          displayAmount: item.Offers?.Listings?.[0]?.Price?.DisplayAmount || '',
        },
        image: item.Images?.Primary?.Large?.URL || '',
        rating: item.CustomerReviews?.Rating || 0,
        reviewCount: item.CustomerReviews?.Count || 0,
        availability: item.Offers?.Listings?.[0]?.Availability?.Message || 'Unknown',
        features: item.Features?.DisplayValues || [],
        description: item.ItemInfo?.Features?.DisplayValues?.[0] || '',
        affiliateUrl: item.DetailPageURL || '',
        category: item.ItemInfo?.ProductInfo?.ItemClassification?.ProductGroup || '',
      }));
    } catch (error) {
      console.error('Amazon API deals error:', error);
      throw new Error('Failed to fetch Amazon deals');
    }
  }

  generateAffiliateUrl(asin: string, campaign?: string): string {
    const baseUrl = `https://${this.getMarketplace()}/dp/${asin}`;
    const params = new URLSearchParams({
      tag: this.associateTag,
      ...(campaign && { linkCode: campaign }),
    });
    return `${baseUrl}?${params.toString()}`;
  }

  async testConnection(): Promise<boolean> {
    try {
      await this.searchProducts({ keywords: 'test', itemCount: 1 });
      return true;
    } catch (error) {
      console.error('Amazon API connection test failed:', error);
      return false;
    }
  }
}

export const amazonService = new AmazonAssociatesService(); 
