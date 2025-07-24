'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import ProtectedRoute from '@/components/ProtectedRoute';

interface SiteConfig {
  name: string;
  domain: string;
  niche: string;
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
}

interface ProductConfig {
  importProducts: boolean;
  productSource: 'amazon' | 'manual' | 'csv';
  categories: string[];
  affiliateProgram: string;
  commissionRate: number;
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
  });

  const [productConfig, setProductConfig] = useState<ProductConfig>({
    importProducts: true,
    productSource: 'amazon',
    categories: [],
    affiliateProgram: 'amazon',
    commissionRate: 4.0,
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

  const niches = [
    { value: 'wearables', label: 'Wearables & Fitness', description: 'Smartwatches, fitness trackers, health monitoring' },
    { value: 'tech', label: 'Technology', description: 'Laptops, smartphones, gadgets' },
    { value: 'home', label: 'Home & Garden', description: 'Home improvement, gardening, decor' },
    { value: 'fashion', label: 'Fashion & Beauty', description: 'Clothing, accessories, beauty products' },
    { value: 'sports', label: 'Sports & Outdoors', description: 'Fitness equipment, outdoor gear' },
    { value: 'automotive', label: 'Automotive', description: 'Car accessories, maintenance, parts' },
    { value: 'food', label: 'Food & Cooking', description: 'Kitchen appliances, cookware, ingredients' },
    { value: 'travel', label: 'Travel', description: 'Luggage, travel accessories, gear' },
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
    const selectedNiche = niches.find(n => n.value === niche);
    if (selectedNiche) {
      setSiteConfig(prev => ({
        ...prev,
        description: selectedNiche.description,
        name: `${selectedNiche.label} Hub`,
        domain: `${selectedNiche.value}-hub.com`
      }));
    }
  };

  const handleDeploy = async () => {
    setLoading(true);
    setDeploymentProgress(0);
    setDeploymentLogs([]);

    try {
      addLog('🚀 Starting site deployment...');
      setDeploymentProgress(10);

      // Call the deployment API
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          siteConfig,
          contentConfig,
          productConfig,
          seoConfig,
          deploymentConfig
        }),
      });

      const result = await response.json();

      if (result.success) {
        addLog('✅ Site deployment completed successfully!');
        setDeploymentProgress(100);
        
        if (result.data.deploymentUrl) {
          addLog(`🌐 Site deployed at: ${result.data.deploymentUrl}`);
        }
        
        // Show success message
        setTimeout(() => {
          alert(`🎉 Your site "${siteConfig.name}" has been deployed successfully!\n\nSite URL: ${result.data.deploymentUrl || 'Pending deployment'}\n\nYou can now manage your site from the Sites section.`);
        }, 1000);
      } else {
        throw new Error(result.error || 'Deployment failed');
      }

    } catch (error) {
      addLog(`❌ Deployment failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-apple-gray-700 mb-2">Niche Selection</label>
          <select
            value={siteConfig.niche}
            onChange={(e) => handleNicheChange(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
          >
            <option value="">Select a niche...</option>
            {niches.map(niche => (
              <option key={niche.value} value={niche.value}>
                {niche.label} - {niche.description}
              </option>
            ))}
          </select>
        </div>

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
            placeholder="example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-apple-gray-700 mb-2">Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
          />
        </div>

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

      <div>
        <label className="block text-sm font-medium text-apple-gray-700 mb-2">Site Description</label>
        <textarea
          value={siteConfig.description}
          onChange={(e) => handleSiteConfigChange('description', e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
          placeholder="Describe your site's purpose and target audience..."
        />
      </div>

      <div>
        <h4 className="text-md font-semibold text-apple-gray-900 mb-3">Social Media Links</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['facebook', 'twitter', 'instagram', 'youtube', 'linkedin'].map(platform => (
            <div key={platform}>
              <label className="block text-sm font-medium text-apple-gray-700 mb-2 capitalize">{platform}</label>
              <input
                type="url"
                value={siteConfig.socialLinks[platform as keyof typeof siteConfig.socialLinks] || ''}
                onChange={(e) => handleSiteConfigChange('socialLinks', {
                  ...siteConfig.socialLinks,
                  [platform]: e.target.value
                })}
                className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
                placeholder={`https://${platform}.com/your-account`}
              />
            </div>
          ))}
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

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl">
          <div>
            <h4 className="font-semibold text-apple-gray-900">Generate Blog Posts</h4>
            <p className="text-sm text-apple-gray-600">AI-powered blog posts about your niche</p>
          </div>
          <input
            type="checkbox"
            checked={contentConfig.generateBlogPosts}
            onChange={(e) => setContentConfig(prev => ({ ...prev, generateBlogPosts: e.target.checked }))}
            className="w-5 h-5 text-apple-blue border-apple-gray-300 rounded focus:ring-apple-blue"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl">
          <div>
            <h4 className="font-semibold text-apple-gray-900">Generate Product Reviews</h4>
            <p className="text-sm text-apple-gray-600">Detailed product reviews with affiliate links</p>
          </div>
          <input
            type="checkbox"
            checked={contentConfig.generateProductReviews}
            onChange={(e) => setContentConfig(prev => ({ ...prev, generateProductReviews: e.target.checked }))}
            className="w-5 h-5 text-apple-blue border-apple-gray-300 rounded focus:ring-apple-blue"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl">
          <div>
            <h4 className="font-semibold text-apple-gray-900">Generate About Page</h4>
            <p className="text-sm text-apple-gray-600">Professional about page content</p>
          </div>
          <input
            type="checkbox"
            checked={contentConfig.generateAboutPage}
            onChange={(e) => setContentConfig(prev => ({ ...prev, generateAboutPage: e.target.checked }))}
            className="w-5 h-5 text-apple-blue border-apple-gray-300 rounded focus:ring-apple-blue"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl">
          <div>
            <h4 className="font-semibold text-apple-gray-900">Generate Contact Page</h4>
            <p className="text-sm text-apple-gray-600">Contact form and information page</p>
          </div>
          <input
            type="checkbox"
            checked={contentConfig.generateContactPage}
            onChange={(e) => setContentConfig(prev => ({ ...prev, generateContactPage: e.target.checked }))}
            className="w-5 h-5 text-apple-blue border-apple-gray-300 rounded focus:ring-apple-blue"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-apple-gray-700 mb-2">Number of Blog Posts</label>
          <input
            type="number"
            min="1"
            max="20"
            value={contentConfig.blogPostCount}
            onChange={(e) => setContentConfig(prev => ({ ...prev, blogPostCount: parseInt(e.target.value) }))}
            className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-apple-gray-700 mb-2">Number of Product Reviews</label>
          <input
            type="number"
            min="1"
            max="50"
            value={contentConfig.productReviewCount}
            onChange={(e) => setContentConfig(prev => ({ ...prev, productReviewCount: parseInt(e.target.value) }))}
            className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
          />
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
            onChange={(e) => setProductConfig(prev => ({ ...prev, importProducts: e.target.checked }))}
            className="w-5 h-5 text-apple-blue border-apple-gray-300 rounded focus:ring-apple-blue"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-apple-gray-700 mb-2">Product Source</label>
          <select
            value={productConfig.productSource}
            onChange={(e) => setProductConfig(prev => ({ ...prev, productSource: e.target.value as any }))}
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
            onChange={(e) => setProductConfig(prev => ({ ...prev, affiliateProgram: e.target.value }))}
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
            onChange={(e) => setProductConfig(prev => ({ ...prev, commissionRate: parseFloat(e.target.value) }))}
            className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
          />
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
            onChange={(e) => setSEOConfig(prev => ({ ...prev, metaTitle: e.target.value }))}
            className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
            placeholder="Best [Niche] Reviews & Comparisons"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-apple-gray-700 mb-2">Meta Description</label>
          <textarea
            value={seoConfig.metaDescription}
            onChange={(e) => setSEOConfig(prev => ({ ...prev, metaDescription: e.target.value }))}
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
            onChange={(e) => setSEOConfig(prev => ({ ...prev, generateSitemap: e.target.checked }))}
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
            onChange={(e) => setSEOConfig(prev => ({ ...prev, generateRobotsTxt: e.target.checked }))}
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
            onChange={(e) => setSEOConfig(prev => ({ ...prev, schemaMarkup: e.target.checked }))}
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
            onChange={(e) => setDeploymentConfig(prev => ({ ...prev, deployToVercel: e.target.checked }))}
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
            onChange={(e) => setDeploymentConfig(prev => ({ ...prev, customDomain: e.target.checked }))}
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
            onChange={(e) => setDeploymentConfig(prev => ({ ...prev, sslCertificate: e.target.checked }))}
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
            onChange={(e) => setDeploymentConfig(prev => ({ ...prev, cdnEnabled: e.target.checked }))}
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