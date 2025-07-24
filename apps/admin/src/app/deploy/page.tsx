'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import ProtectedRoute from '@/components/ProtectedRoute';

interface SiteConfig {
  name: string;
  domain: string;
  niche: string;
  nicheType: 'predefined' | 'custom';
  customNiche?: {
    name: string;
    description: string;
    keywords: string[];
    categories: string[];
    targetAudience: string;
    competitionLevel: 'low' | 'medium' | 'high';
    profitabilityScore: number;
  };
  description: string;
  logo: File | null;
  primaryColor: string;
  secondaryColor: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  };
  googleMyBusiness?: string;
  googleSearchConsole?: string;
  googleAnalytics?: string;
}

interface ContentConfig {
  generateBlogPosts: boolean;
  generateProductReviews: boolean;
  generateAboutPage: boolean;
  generateContactPage: boolean;
  blogPostCount: number;
  productReviewCount: number;
  categories: string[];
  autoBlogEnabled: boolean;
  autoBlogFrequency: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  autoBlogPostTypes: string[];
  autoBlogCategories: string[];
  autoBlogKeywords: string[];
}

interface ProductConfig {
  importProducts: boolean;
  productSource: 'amazon' | 'manual' | 'csv';
  categories: string[];
  affiliateProgram: 'amazon' | 'walmart' | 'target' | 'bestbuy';
  commissionRate: number;
  customCategories: Array<{
    name: string;
    description: string;
    parentCategory?: string;
  }>;
}

interface SEOConfig {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  generateSitemap: boolean;
  generateRobotsTxt: boolean;
  schemaMarkup: boolean;
}

interface DeploymentConfig {
  deployToVercel: boolean;
  customDomain: boolean;
  sslCertificate: boolean;
  cdnEnabled: boolean;
}

export default function DeployPage() {
  const { data: session } = useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [deploymentLogs, setDeploymentLogs] = useState<string[]>([]);

  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    name: '',
    domain: '',
    niche: '',
    nicheType: 'predefined',
    description: '',
    logo: null,
    primaryColor: '#3B82F6',
    secondaryColor: '#1E40AF',
    socialLinks: {},
  });

  const [contentConfig, setContentConfig] = useState<ContentConfig>({
    generateBlogPosts: true,
    generateProductReviews: true,
    generateAboutPage: true,
    generateContactPage: true,
    blogPostCount: 5,
    productReviewCount: 10,
    categories: [],
    autoBlogEnabled: true,
    autoBlogFrequency: 'weekly',
    autoBlogPostTypes: ['how_to', 'product_review', 'listicle'],
    autoBlogCategories: [],
    autoBlogKeywords: [],
  });

  const [productConfig, setProductConfig] = useState<ProductConfig>({
    importProducts: true,
    productSource: 'amazon',
    categories: [],
    affiliateProgram: 'amazon',
    commissionRate: 4.0,
    customCategories: [],
  });

  const [seoConfig, setSEOConfig] = useState<SEOConfig>({
    metaTitle: '',
    metaDescription: '',
    metaKeywords: [],
    generateSitemap: true,
    generateRobotsTxt: true,
    schemaMarkup: true,
  });

  const [deploymentConfig, setDeploymentConfig] = useState<DeploymentConfig>({
    deployToVercel: true,
    customDomain: false,
    sslCertificate: true,
    cdnEnabled: true,
  });

  const predefinedNiches = [
    { value: 'wearables', label: 'Wearables & Fitness', description: 'Smartwatches, fitness trackers, health monitoring' },
    { value: 'tech', label: 'Technology', description: 'Laptops, smartphones, gadgets' },
    { value: 'home', label: 'Home & Garden', description: 'Home improvement, gardening, decor' },
    { value: 'fashion', label: 'Fashion & Beauty', description: 'Clothing, accessories, beauty products' },
    { value: 'sports', label: 'Sports & Outdoors', description: 'Fitness equipment, outdoor gear' },
    { value: 'automotive', label: 'Automotive', description: 'Car accessories, maintenance, parts' },
    { value: 'food', label: 'Food & Cooking', description: 'Kitchen appliances, cookware, ingredients' },
    { value: 'travel', label: 'Travel', description: 'Luggage, travel accessories, gear' },
  ];

  const blogPostTypes = [
    { value: 'how_to', label: 'How-To Guide', description: 'Step-by-step tutorials and guides' },
    { value: 'listicle', label: 'Listicle Post', description: 'Numbered lists and rankings' },
    { value: 'product_review', label: 'Product Review', description: 'Detailed product reviews' },
    { value: 'answer_post', label: 'Answer Post', description: 'Q&A style content' },
    { value: 'roundup', label: 'Roundup Post', description: 'Product comparisons' },
    { value: 'alternate', label: 'Alternative Post', description: 'Replacement options' },
  ];

  const addLog = (message: string) => {
    setDeploymentLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleSiteConfigChange = (field: keyof SiteConfig, value: any) => {
    setSiteConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSiteConfig(prev => ({ ...prev, logo: file }));
    }
  };

  const handleNicheChange = (niche: string) => {
    setSiteConfig(prev => ({ ...prev, niche }));
    
    // Auto-populate based on niche
    const selectedNiche = predefinedNiches.find(n => n.value === niche);
    if (selectedNiche) {
      setSiteConfig(prev => ({
        ...prev,
        description: selectedNiche.description,
        name: `${selectedNiche.label} Hub`,
        domain: `${selectedNiche.value}-hub.com`
      }));
    }
  };

  const handleCustomNicheChange = (field: keyof SiteConfig['customNiche'], value: any) => {
    setSiteConfig(prev => ({
      ...prev,
      customNiche: {
        ...prev.customNiche,
        [field]: value,
      } as SiteConfig['customNiche']
    }));
  };

  const handleContentConfigChange = (field: keyof ContentConfig, value: any) => {
    setContentConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleProductConfigChange = (field: keyof ProductConfig, value: any) => {
    setProductConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSEOConfigChange = (field: keyof SEOConfig, value: any) => {
    setSEOConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleDeploymentConfigChange = (field: keyof DeploymentConfig, value: any) => {
    setDeploymentConfig(prev => ({ ...prev, [field]: value }));
  };

  const addCustomCategory = () => {
    setProductConfig(prev => ({
      ...prev,
      customCategories: [...prev.customCategories, {
        name: '',
        description: '',
      }]
    }));
  };

  const updateCustomCategory = (index: number, field: string, value: string) => {
    setProductConfig(prev => ({
      ...prev,
      customCategories: prev.customCategories.map((cat, i) => 
        i === index ? { ...cat, [field]: value } : cat
      )
    }));
  };

  const removeCustomCategory = (index: number) => {
    setProductConfig(prev => ({
      ...prev,
      customCategories: prev.customCategories.filter((_, i) => i !== index)
    }));
  };

  const handleDeploy = async () => {
    setLoading(true);
    setDeploymentProgress(0);
    setDeploymentLogs([]);

    try {
      addLog('Starting deployment process...');
      setDeploymentProgress(10);

      const deploymentData = {
        siteConfig,
        contentConfig,
        productConfig,
        seoConfig,
        deploymentConfig,
      };

      addLog('Sending deployment request...');
      setDeploymentProgress(20);

      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(deploymentData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Deployment failed');
      }

      const result = await response.json();
      addLog('Deployment completed successfully!');
      setDeploymentProgress(100);

      // Redirect to the new site or show success message
      console.log('Deployment result:', result);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Deployment failed';
      addLog(`Error: ${errorMessage}`);
      console.error('Deployment error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Site Configuration</h3>
        <p className="text-apple-gray-600 mb-6">Configure your new affiliate site with basic information and branding.</p>
      </div>

      <div className="space-y-6">
        {/* Niche Selection */}
        <div>
          <label className="block text-sm font-medium text-apple-gray-700 mb-2">Niche Type</label>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="predefined"
                name="nicheType"
                value="predefined"
                checked={siteConfig.nicheType === 'predefined'}
                onChange={(e) => handleSiteConfigChange('nicheType', e.target.value)}
                className="w-4 h-4 text-apple-blue border-apple-gray-300 focus:ring-apple-blue"
              />
              <label htmlFor="predefined" className="text-sm font-medium text-apple-gray-900">
                Predefined Niche
              </label>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="radio"
                id="custom"
                name="nicheType"
                value="custom"
                checked={siteConfig.nicheType === 'custom'}
                onChange={(e) => handleSiteConfigChange('nicheType', e.target.value)}
                className="w-4 h-4 text-apple-blue border-apple-gray-300 focus:ring-apple-blue"
              />
              <label htmlFor="custom" className="text-sm font-medium text-apple-gray-900">
                Custom Niche
              </label>
            </div>
          </div>
        </div>

        {siteConfig.nicheType === 'predefined' ? (
          <div>
            <label className="block text-sm font-medium text-apple-gray-700 mb-2">Niche Selection</label>
            <select
              value={siteConfig.niche}
              onChange={(e) => handleNicheChange(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
            >
              <option value="">Select a niche...</option>
              {predefinedNiches.map(niche => (
                <option key={niche.value} value={niche.value}>
                  {niche.label} - {niche.description}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-apple-gray-700 mb-2">Custom Niche Name</label>
              <input
                type="text"
                value={siteConfig.customNiche?.name || ''}
                onChange={(e) => handleCustomNicheChange('name', e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
                placeholder="e.g., Hot Honey, Pet Tech, Sustainable Living"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-apple-gray-700 mb-2">Description</label>
              <textarea
                value={siteConfig.customNiche?.description || ''}
                onChange={(e) => handleCustomNicheChange('description', e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
                rows={3}
                placeholder="Describe your niche and what products/content you'll focus on..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-apple-gray-700 mb-2">Target Keywords (comma-separated)</label>
              <input
                type="text"
                value={siteConfig.customNiche?.keywords?.join(', ') || ''}
                onChange={(e) => handleCustomNicheChange('keywords', e.target.value.split(',').map(k => k.trim()))}
                className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
                placeholder="e.g., hot honey, spicy honey, honey products"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-apple-gray-700 mb-2">Product Categories (comma-separated)</label>
              <input
                type="text"
                value={siteConfig.customNiche?.categories?.join(', ') || ''}
                onChange={(e) => handleCustomNicheChange('categories', e.target.value.split(',').map(k => k.trim()))}
                className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
                placeholder="e.g., hot honey brands, honey accessories, honey recipes"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-apple-gray-700 mb-2">Target Audience</label>
              <input
                type="text"
                value={siteConfig.customNiche?.targetAudience || ''}
                onChange={(e) => handleCustomNicheChange('targetAudience', e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
                placeholder="e.g., Food enthusiasts, home cooks, spicy food lovers"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-apple-gray-700 mb-2">Competition Level</label>
                <select
                  value={siteConfig.customNiche?.competitionLevel || 'medium'}
                  onChange={(e) => handleCustomNicheChange('competitionLevel', e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
                >
                  <option value="low">Low Competition</option>
                  <option value="medium">Medium Competition</option>
                  <option value="high">High Competition</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray-700 mb-2">Profitability Score (1-10)</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={siteConfig.customNiche?.profitabilityScore || 5}
                  onChange={(e) => handleCustomNicheChange('profitabilityScore', parseInt(e.target.value))}
                  className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-apple-gray-700 mb-2">Site Name</label>
            <input
              type="text"
              value={siteConfig.name}
              onChange={(e) => handleSiteConfigChange('name', e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
              placeholder="Enter site name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-apple-gray-700 mb-2">Domain</label>
            <input
              type="text"
              value={siteConfig.domain}
              onChange={(e) => handleSiteConfigChange('domain', e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
              placeholder="your-domain.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-apple-gray-700 mb-2">Description</label>
          <textarea
            value={siteConfig.description}
            onChange={(e) => handleSiteConfigChange('description', e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
            rows={3}
            placeholder="Brief description of your site"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-apple-gray-700 mb-2">Logo</label>
          <input
            type="file"
            onChange={handleLogoUpload}
            accept="image/*"
            className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-apple-gray-700 mb-2">Primary Color</label>
            <input
              type="color"
              value={siteConfig.primaryColor}
              onChange={(e) => handleSiteConfigChange('primaryColor', e.target.value)}
              className="w-full h-12 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-apple-gray-700 mb-2">Secondary Color</label>
            <input
              type="color"
              value={siteConfig.secondaryColor}
              onChange={(e) => handleSiteConfigChange('secondaryColor', e.target.value)}
              className="w-full h-12 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Content Generation</h3>
        <p className="text-apple-gray-600 mb-6">Configure AI-powered content generation for your site.</p>
      </div>

      <div className="space-y-6">
        {/* Initial Content Generation */}
        <div className="space-y-4">
          <h4 className="font-semibold text-apple-gray-900">Initial Content Setup</h4>
          
          <div className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl">
            <div>
              <h5 className="font-semibold text-apple-gray-900">Generate Blog Posts</h5>
              <p className="text-sm text-apple-gray-600">AI-powered blog posts about your niche</p>
            </div>
            <input
              type="checkbox"
              checked={contentConfig.generateBlogPosts}
              onChange={(e) => handleContentConfigChange('generateBlogPosts', e.target.checked)}
              className="w-5 h-5 text-apple-blue border-apple-gray-300 rounded focus:ring-apple-blue"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl">
            <div>
              <h5 className="font-semibold text-apple-gray-900">Generate Product Reviews</h5>
              <p className="text-sm text-apple-gray-600">Detailed product reviews with affiliate links</p>
            </div>
            <input
              type="checkbox"
              checked={contentConfig.generateProductReviews}
              onChange={(e) => handleContentConfigChange('generateProductReviews', e.target.checked)}
              className="w-5 h-5 text-apple-blue border-apple-gray-300 rounded focus:ring-apple-blue"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl">
            <div>
              <h5 className="font-semibold text-apple-gray-900">Generate About Page</h5>
              <p className="text-sm text-apple-gray-600">Professional about page content</p>
            </div>
            <input
              type="checkbox"
              checked={contentConfig.generateAboutPage}
              onChange={(e) => handleContentConfigChange('generateAboutPage', e.target.checked)}
              className="w-5 h-5 text-apple-blue border-apple-gray-300 rounded focus:ring-apple-blue"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl">
            <div>
              <h5 className="font-semibold text-apple-gray-900">Generate Contact Page</h5>
              <p className="text-sm text-apple-gray-600">Contact form and information</p>
            </div>
            <input
              type="checkbox"
              checked={contentConfig.generateContactPage}
              onChange={(e) => handleContentConfigChange('generateContactPage', e.target.checked)}
              className="w-5 h-5 text-apple-blue border-apple-gray-300 rounded focus:ring-apple-blue"
            />
          </div>
        </div>

        {/* Automated Blogging */}
        <div className="space-y-4">
          <h4 className="font-semibold text-apple-gray-900">Automated Blogging (Every 3 Days)</h4>
          
          <div className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl">
            <div>
              <h5 className="font-semibold text-apple-gray-900">Enable Auto-Blogger</h5>
              <p className="text-sm text-apple-gray-600">Automatically generate new blog posts every 3 days</p>
            </div>
            <input
              type="checkbox"
              checked={contentConfig.autoBlogEnabled}
              onChange={(e) => handleContentConfigChange('autoBlogEnabled', e.target.checked)}
              className="w-5 h-5 text-apple-blue border-apple-gray-300 rounded focus:ring-apple-blue"
            />
          </div>

          {contentConfig.autoBlogEnabled && (
            <div className="space-y-4 p-4 bg-apple-gray-50 rounded-2xl">
              <div>
                <label className="block text-sm font-medium text-apple-gray-700 mb-2">Blog Post Types</label>
                <div className="grid grid-cols-2 gap-2">
                  {blogPostTypes.map(type => (
                    <label key={type.value} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={contentConfig.autoBlogPostTypes.includes(type.value)}
                        onChange={(e) => {
                          const current = contentConfig.autoBlogPostTypes;
                          const updated = e.target.checked
                            ? [...current, type.value]
                            : current.filter(t => t !== type.value);
                          handleContentConfigChange('autoBlogPostTypes', updated);
                        }}
                        className="w-4 h-4 text-apple-blue border-apple-gray-300 rounded focus:ring-apple-blue"
                      />
                      <span className="text-sm text-apple-gray-900">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-apple-gray-700 mb-2">Target Keywords (comma-separated)</label>
                <input
                  type="text"
                  value={contentConfig.autoBlogKeywords.join(', ')}
                  onChange={(e) => handleContentConfigChange('autoBlogKeywords', e.target.value.split(',').map(k => k.trim()))}
                  className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
                  placeholder="e.g., best products, how to choose, reviews"
                />
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-apple-gray-700 mb-2">Blog Post Count</label>
            <input
              type="number"
              min="1"
              max="20"
              value={contentConfig.blogPostCount}
              onChange={(e) => handleContentConfigChange('blogPostCount', parseInt(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-apple-gray-700 mb-2">Product Review Count</label>
            <input
              type="number"
              min="1"
              max="50"
              value={contentConfig.productReviewCount}
              onChange={(e) => handleContentConfigChange('productReviewCount', parseInt(e.target.value))}
              className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Product Setup</h3>
        <p className="text-apple-gray-600 mb-6">Configure product import and affiliate link setup.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl">
          <div>
            <h4 className="font-semibold text-apple-gray-900">Import Products</h4>
            <p className="text-sm text-apple-gray-600">Automatically import products with affiliate links</p>
          </div>
          <input
            type="checkbox"
            checked={productConfig.importProducts}
            onChange={(e) => handleProductConfigChange('importProducts', e.target.checked)}
            className="w-5 h-5 text-apple-blue border-apple-gray-300 rounded focus:ring-apple-blue"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-apple-gray-700 mb-2">Product Source</label>
          <select
            value={productConfig.productSource}
            onChange={(e) => handleProductConfigChange('productSource', e.target.value as any)}
            className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
          >
            <option value="amazon">Amazon Product Advertising API</option>
            <option value="manual">Manual Entry</option>
            <option value="csv">CSV Import</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-apple-gray-700 mb-2">Affiliate Program</label>
          <select
            value={productConfig.affiliateProgram}
            onChange={(e) => handleProductConfigChange('affiliateProgram', e.target.value as any)}
            className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
          >
            <option value="amazon">Amazon Associates</option>
            <option value="walmart">Walmart Affiliates</option>
            <option value="target">Target Affiliates</option>
            <option value="bestbuy">Best Buy Affiliates</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-apple-gray-700 mb-2">Commission Rate (%)</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="20"
            value={productConfig.commissionRate}
            onChange={(e) => handleProductConfigChange('commissionRate', parseFloat(e.target.value))}
            className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-apple-gray-700 mb-2">Custom Product Categories</label>
        <div className="space-y-4">
          {productConfig.customCategories.map((category, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="flex-1">
                <label className="block text-sm font-medium text-apple-gray-700 mb-1">Category Name</label>
                <input
                  type="text"
                  value={category.name}
                  onChange={(e) => updateCustomCategory(index, 'name', e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
                  placeholder="e.g., Honey Brands, Honey Accessories"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-apple-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={category.description}
                  onChange={(e) => updateCustomCategory(index, 'description', e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
                  placeholder="e.g., Top-rated honey brands, Unique honey accessories"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-apple-gray-700 mb-1">Parent Category</label>
                <select
                  value={category.parentCategory || ''}
                  onChange={(e) => updateCustomCategory(index, 'parentCategory', e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
                >
                  <option value="">No Parent</option>
                  {productConfig.customCategories.map((parentCat, parentIndex) => (
                    <option key={parentIndex} value={parentCat.name}>{parentCat.name}</option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => removeCustomCategory(index)}
                className="admin-button admin-button-danger"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addCustomCategory}
            className="admin-button admin-button-secondary"
          >
            Add Custom Category
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">SEO & Analytics</h3>
        <p className="text-apple-gray-600 mb-6">Configure SEO optimization and analytics tracking.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-apple-gray-700 mb-2">Meta Title</label>
          <input
            type="text"
            value={seoConfig.metaTitle}
            onChange={(e) => handleSEOConfigChange('metaTitle', e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
            placeholder="Best [Niche] Reviews & Comparisons"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-apple-gray-700 mb-2">Meta Description</label>
          <textarea
            value={seoConfig.metaDescription}
            onChange={(e) => handleSEOConfigChange('metaDescription', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
            placeholder="Discover the best [niche] products with expert reviews, comparisons, and exclusive deals..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-apple-gray-700 mb-2">Google Analytics ID</label>
          <input
            type="text"
            value={siteConfig.googleAnalytics || ''}
            onChange={(e) => handleSiteConfigChange('googleAnalytics', e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
            placeholder="G-XXXXXXXXXX"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-apple-gray-700 mb-2">Google Search Console</label>
          <input
            type="text"
            value={siteConfig.googleSearchConsole || ''}
            onChange={(e) => handleSiteConfigChange('googleSearchConsole', e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
            placeholder="https://search.google.com/search-console"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl">
          <div>
            <h4 className="font-semibold text-apple-gray-900">Generate Sitemap</h4>
            <p className="text-sm text-apple-gray-600">Automatically generate XML sitemap</p>
          </div>
          <input
            type="checkbox"
            checked={seoConfig.generateSitemap}
            onChange={(e) => handleSEOConfigChange('generateSitemap', e.target.checked)}
            className="w-5 h-5 text-apple-blue border-apple-gray-300 rounded focus:ring-apple-blue"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl">
          <div>
            <h4 className="font-semibold text-apple-gray-900">Generate Robots.txt</h4>
            <p className="text-sm text-apple-gray-600">Create robots.txt file for search engines</p>
          </div>
          <input
            type="checkbox"
            checked={seoConfig.generateRobotsTxt}
            onChange={(e) => handleSEOConfigChange('generateRobotsTxt', e.target.checked)}
            className="w-5 h-5 text-apple-blue border-apple-gray-300 rounded focus:ring-apple-blue"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl">
          <div>
            <h4 className="font-semibold text-apple-gray-900">Schema Markup</h4>
            <p className="text-sm text-apple-gray-600">Add structured data for better SEO</p>
          </div>
          <input
            type="checkbox"
            checked={seoConfig.schemaMarkup}
            onChange={(e) => handleSEOConfigChange('schemaMarkup', e.target.checked)}
            className="w-5 h-5 text-apple-blue border-apple-gray-300 rounded focus:ring-apple-blue"
          />
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-apple-gray-900 mb-4">Deployment</h3>
        <p className="text-apple-gray-600 mb-6">Configure deployment settings and domain setup.</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl">
          <div>
            <h4 className="font-semibold text-apple-gray-900">Deploy to Vercel</h4>
            <p className="text-sm text-apple-gray-600">Automatically deploy to Vercel hosting</p>
          </div>
          <input
            type="checkbox"
            checked={deploymentConfig.deployToVercel}
            onChange={(e) => handleDeploymentConfigChange('deployToVercel', e.target.checked)}
            className="w-5 h-5 text-apple-blue border-apple-gray-300 rounded focus:ring-apple-blue"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl">
          <div>
            <h4 className="font-semibold text-apple-gray-900">Custom Domain</h4>
            <p className="text-sm text-apple-gray-600">Set up custom domain with DNS</p>
          </div>
          <input
            type="checkbox"
            checked={deploymentConfig.customDomain}
            onChange={(e) => handleDeploymentConfigChange('customDomain', e.target.checked)}
            className="w-5 h-5 text-apple-blue border-apple-gray-300 rounded focus:ring-apple-blue"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl">
          <div>
            <h4 className="font-semibold text-apple-gray-900">SSL Certificate</h4>
            <p className="text-sm text-apple-gray-600">Enable HTTPS with SSL certificate</p>
          </div>
          <input
            type="checkbox"
            checked={deploymentConfig.sslCertificate}
            onChange={(e) => handleDeploymentConfigChange('sslCertificate', e.target.checked)}
            className="w-5 h-5 text-apple-blue border-apple-gray-300 rounded focus:ring-apple-blue"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl">
          <div>
            <h4 className="font-semibold text-apple-gray-900">CDN Enabled</h4>
            <p className="text-sm text-apple-gray-600">Enable content delivery network for faster loading</p>
          </div>
          <input
            type="checkbox"
            checked={deploymentConfig.cdnEnabled}
            onChange={(e) => handleDeploymentConfigChange('cdnEnabled', e.target.checked)}
            className="w-5 h-5 text-apple-blue border-apple-gray-300 rounded focus:ring-apple-blue"
          />
        </div>
      </div>

      {loading && (
        <div className="mt-8">
          <div className="mb-4">
            <div className="flex justify-between text-sm text-apple-gray-600 mb-2">
              <span>Deployment Progress</span>
              <span>{deploymentProgress}%</span>
            </div>
            <div className="w-full bg-apple-gray-200 rounded-full h-2">
              <div
                className="bg-apple-blue h-2 rounded-full transition-all duration-300"
                style={{ width: `${deploymentProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-apple-gray-50 rounded-2xl p-4 max-h-64 overflow-y-auto">
            <h4 className="font-semibold text-apple-gray-900 mb-2">Deployment Logs</h4>
            {deploymentLogs.map((log, index) => (
              <div key={index} className="text-sm text-apple-gray-600 mb-1 font-mono">
                {log}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const steps = [
    { number: 1, title: 'Site Config', description: 'Basic site information and branding' },
    { number: 2, title: 'Content', description: 'AI-powered content generation' },
    { number: 3, title: 'Products', description: 'Product import and affiliate setup' },
    { number: 4, title: 'SEO & Analytics', description: 'Search optimization and tracking' },
    { number: 5, title: 'Deploy', description: 'Deployment and domain setup' },
  ];

  return (
    <div className="min-h-screen">
      <header className="admin-header">
        <div className="px-4 sm:px-6 py-6 lg:pl-6 pl-20">
          <div className="animate-fade-in-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-apple-gray-900">Deploy New Site</h1>
            <p className="text-apple-gray-600 mt-1 text-sm sm:text-base">Create and deploy a new affiliate site in minutes</p>
          </div>
        </div>
      </header>

      <main className="px-4 sm:px-6 py-4 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    currentStep >= step.number
                      ? 'bg-apple-blue border-apple-blue text-white'
                      : 'border-apple-gray-300 text-apple-gray-500'
                  }`}>
                    {currentStep > step.number ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 transition-all duration-300 ${
                      currentStep > step.number ? 'bg-apple-blue' : 'bg-apple-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4">
              {steps.map((step) => (
                <div key={step.number} className="text-center flex-1">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-apple-blue' : 'text-apple-gray-500'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-apple-gray-400 mt-1">{step.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="admin-action-card animate-fade-in-up">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            {currentStep === 5 && renderStep5()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              disabled={currentStep === 1}
              className="admin-button admin-button-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex space-x-4">
              {currentStep < 5 ? (
                <button
                  onClick={() => setCurrentStep(prev => Math.min(5, prev + 1))}
                  className="admin-button admin-button-primary"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleDeploy}
                  disabled={loading}
                  className="admin-button admin-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Deploying...' : '🚀 Deploy Site'}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 