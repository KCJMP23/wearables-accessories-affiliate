import { getSiteConfig, getFeaturedProducts, getCategories, getProductCount } from '@affiliate-template/db';

export default async function DatabaseDemoPage() {
  const domain = 'localhost:3000';
  
  try {
    // Test database functions
    const [siteConfig, featuredProducts, categories, productCount] = await Promise.all([
      getSiteConfig(domain),
      getFeaturedProducts(domain, 4),
      getCategories(domain),
      getProductCount(domain)
    ]);

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Database Connection Demo</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Database Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-medium text-green-800">✅ Connected to Real Database</h3>
                <p className="text-sm text-green-600 mt-1">Supabase PostgreSQL</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800">📊 Data Retrieved</h3>
                <p className="text-sm text-blue-600 mt-1">Real-time data from database</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Site Configuration</h2>
              {siteConfig ? (
                <div className="space-y-2">
                  <p><strong>Site Name:</strong> {siteConfig.name}</p>
                  <p><strong>Domain:</strong> {siteConfig.domain}</p>
                  <p><strong>Hero Title:</strong> {siteConfig.heroTitle}</p>
                  <p><strong>Hero Subtitle:</strong> {siteConfig.heroSubtitle}</p>
                </div>
              ) : (
                <p className="text-gray-500">No site configuration found</p>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Data Counts</h2>
              <div className="space-y-2">
                <p><strong>Products:</strong> {productCount}</p>
                <p><strong>Categories:</strong> {categories.length}</p>
                <p><strong>Featured Products:</strong> {featuredProducts.length}</p>
              </div>
            </div>
          </div>

          {featuredProducts.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Featured Products (From Database)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredProducts.map((product) => (
                  <div key={product.id} className="border rounded-lg p-4">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <p className="text-lg font-bold mt-2">${product.siteProduct?.price || product.basePrice}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {categories.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Categories (From Database)</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div key={category.id} className="text-center p-4 border rounded-lg">
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Database Connection Demo</h1>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-800 mb-4">Database Error</h2>
            <p className="text-red-600">
              Error connecting to database: {error instanceof Error ? error.message : 'Unknown error'}
            </p>
          </div>
        </div>
      </div>
    );
  }
}