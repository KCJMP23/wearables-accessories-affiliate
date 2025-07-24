import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  // Featured Products Data
  const featuredProducts = [
    {
      id: 1,
      name: "Apple MacBook Pro 14-inch",
      description: "Latest M3 chip, 16GB RAM, 512GB SSD",
      price: 1999.99,
      originalPrice: 2199.99,
      rating: 4.8,
      reviewCount: 1247,
      category: "Laptops",
      image: "/products/macbook-pro.jpg",
      retailers: [
        { name: "Amazon", url: "#", logo: "🛒", color: "bg-orange-500" },
        { name: "Target", url: "#", logo: "🎯", color: "bg-red-500" },
        { name: "Walmart", url: "#", logo: "🛒", color: "bg-blue-500" },
        { name: "Best Buy", url: "#", logo: "💙", color: "bg-blue-600" }
      ]
    },
    {
      id: 2,
      name: "Sony WH-1000XM5 Headphones",
      description: "Industry-leading noise cancellation",
      price: 349.99,
      originalPrice: 399.99,
      rating: 4.9,
      reviewCount: 892,
      category: "Audio",
      image: "/products/sony-headphones.jpg",
      retailers: [
        { name: "Amazon", url: "#", logo: "🛒", color: "bg-orange-500" },
        { name: "Target", url: "#", logo: "🎯", color: "bg-red-500" },
        { name: "Walmart", url: "#", logo: "🛒", color: "bg-blue-500" }
      ]
    },
    {
      id: 3,
      name: "Samsung 65-inch QLED TV",
      description: "4K Ultra HD, Quantum HDR, Smart TV",
      price: 1299.99,
      originalPrice: 1499.99,
      rating: 4.7,
      reviewCount: 567,
      category: "TVs",
      image: "/products/samsung-tv.jpg",
      retailers: [
        { name: "Amazon", url: "#", logo: "🛒", color: "bg-orange-500" },
        { name: "Target", url: "#", logo: "🎯", color: "bg-red-500" },
        { name: "Walmart", url: "#", logo: "🛒", color: "bg-blue-500" },
        { name: "Best Buy", url: "#", logo: "💙", color: "bg-blue-600" }
      ]
    },
    {
      id: 4,
      name: "Nike Air Max 270",
      description: "Comfortable running shoes with Air unit",
      price: 129.99,
      originalPrice: 150.00,
      rating: 4.6,
      reviewCount: 2341,
      category: "Shoes",
      image: "/products/nike-shoes.jpg",
      retailers: [
        { name: "Amazon", url: "#", logo: "🛒", color: "bg-orange-500" },
        { name: "Target", url: "#", logo: "🎯", color: "bg-red-500" },
        { name: "Walmart", url: "#", logo: "🛒", color: "bg-blue-500" }
      ]
    }
  ];

  const categories = [
    { name: "Electronics", icon: "📱", count: 156 },
    { name: "Home & Garden", icon: "🏠", count: 89 },
    { name: "Fashion", icon: "👕", count: 234 },
    { name: "Sports", icon: "⚽", count: 67 },
    { name: "Books", icon: "📚", count: 123 },
    { name: "Toys", icon: "🧸", count: 78 }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Discover Amazing Products
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100">
              Your trusted source for honest reviews and recommendations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Browse Products
              </Link>
              <Link
                href="/blog"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Read Reviews
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600">
              Handpicked products with the best value and quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-4xl">📦</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">{product.category}</span>
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                      <span className="text-xs text-gray-400 ml-1">({product.reviewCount})</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-lg text-gray-400 line-through ml-2">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Retailer Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    {product.retailers.map((retailer) => (
                      <button
                        key={retailer.name}
                        className={`${retailer.color} text-white px-3 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center`}
                      >
                        <span className="mr-1">{retailer.logo}</span>
                        {retailer.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600">
              Find exactly what you&apos;re looking for
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} products</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect Product?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers who trust our recommendations
          </p>
          <Link
            href="/products"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Start Shopping Now
          </Link>
        </div>
      </section>
    </div>
  );
}
