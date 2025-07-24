'use client';

import { useState } from 'react';

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', name: 'All Products', count: 342 },
    { id: 'active', name: 'Active', count: 298 },
    { id: 'pending', name: 'Pending', count: 23 },
    { id: 'inactive', name: 'Inactive', count: 21 },
  ];

  const recentProducts = [
    {
      id: 1,
      name: 'Sony WH-1000XM4 Wireless Headphones',
      category: 'Audio',
      price: 349.99,
      status: 'Active',
      commission: 15.00,
      lastUpdated: '2024-01-15',
    },
    {
      id: 2,
      name: 'Apple AirPods Pro (2nd Generation)',
      category: 'Audio',
      price: 249.00,
      status: 'Active',
      commission: 12.45,
      lastUpdated: '2024-01-14',
    },
    {
      id: 3,
      name: 'Bose QuietComfort 45',
      category: 'Audio',
      price: 329.00,
      status: 'Pending',
      commission: 16.45,
      lastUpdated: '2024-01-13',
    },
  ];

  const priceUpdates = [
    {
      id: 1,
      product: 'Sony WH-1000XM4',
      oldPrice: 379.99,
      newPrice: 349.99,
      change: -30.00,
      date: '2024-01-15',
    },
    {
      id: 2,
      product: 'Apple AirPods Pro',
      oldPrice: 279.00,
      newPrice: 249.00,
      change: -30.00,
      date: '2024-01-14',
    },
    {
      id: 3,
      product: 'Bose QuietComfort 45',
      oldPrice: 349.00,
      newPrice: 329.00,
      change: -20.00,
      date: '2024-01-13',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="admin-header">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in-left">
              <h1 className="text-3xl font-bold text-apple-gray-900">Product Management</h1>
              <p className="text-apple-gray-600 mt-1">Manage affiliate products, custom fields, and dynamic pricing</p>
            </div>
            <div className="flex items-center space-x-4 animate-fade-in-right">
              <button className="admin-button admin-button-secondary">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                Import CSV
              </button>
              <button className="admin-button admin-button-primary">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Product
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="admin-stat-card animate-fade-in-up animation-delay-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-apple-gray-600">Total Products</p>
                  <p className="text-2xl font-semibold text-apple-gray-900">342</p>
                  <p className="text-sm text-apple-green">+12 this week</p>
                </div>
                <div className="p-3 bg-apple-blue/10 rounded-2xl">
                  <svg className="w-6 h-6 text-apple-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="admin-stat-card animate-fade-in-up animation-delay-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-apple-gray-600">Active Products</p>
                  <p className="text-2xl font-semibold text-apple-gray-900">298</p>
                  <p className="text-sm text-apple-green">87% active rate</p>
                </div>
                <div className="p-3 bg-apple-green/10 rounded-2xl">
                  <svg className="w-6 h-6 text-apple-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="admin-stat-card animate-fade-in-up animation-delay-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-apple-gray-600">Pending Approval</p>
                  <p className="text-2xl font-semibold text-apple-gray-900">23</p>
                  <p className="text-sm text-apple-orange">Needs review</p>
                </div>
                <div className="p-3 bg-apple-orange/10 rounded-2xl">
                  <svg className="w-6 h-6 text-apple-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="admin-stat-card animate-fade-in-up animation-delay-400">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-apple-gray-600">Price Updates</p>
                  <p className="text-2xl font-semibold text-apple-gray-900">47</p>
                  <p className="text-sm text-apple-blue">Today</p>
                </div>
                <div className="p-3 bg-apple-purple/10 rounded-2xl">
                  <svg className="w-6 h-6 text-apple-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-apple-gray-100 p-1 rounded-2xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white text-apple-gray-900 shadow-apple-sm'
                      : 'text-apple-gray-600 hover:text-apple-gray-900'
                  }`}
                >
                  {tab.name}
                  <span className="ml-2 px-2 py-1 bg-apple-gray-200 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="admin-action-card animate-fade-in-up animation-delay-500">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-apple-gray-900">Recent Products</h2>
                <button className="text-apple-blue text-sm font-medium hover:text-apple-blue-dark">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div key={product.id} className="p-4 border border-apple-gray-200 rounded-2xl hover:border-apple-gray-300 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-apple-gray-900">{product.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.status === 'Active' 
                          ? 'bg-apple-green/10 text-apple-green'
                          : 'bg-apple-orange/10 text-apple-orange'
                      }`}>
                        {product.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-apple-gray-600">
                      <div>
                        <span className="font-medium">Price:</span> ${product.price}
                      </div>
                      <div>
                        <span className="font-medium">Commission:</span> ${product.commission}
                      </div>
                      <div>
                        <span className="font-medium">Category:</span> {product.category}
                      </div>
                      <div>
                        <span className="font-medium">Updated:</span> {product.lastUpdated}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-action-card animate-fade-in-up animation-delay-600">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-apple-gray-900">Recent Price Updates</h2>
                <button className="text-apple-blue text-sm font-medium hover:text-apple-blue-dark">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {priceUpdates.map((update) => (
                  <div key={update.id} className="p-4 border border-apple-gray-200 rounded-2xl hover:border-apple-gray-300 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-apple-gray-900">{update.product}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        update.change < 0 
                          ? 'bg-apple-red/10 text-apple-red'
                          : 'bg-apple-green/10 text-apple-green'
                      }`}>
                        {update.change > 0 ? '+' : ''}${update.change}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-apple-gray-600">
                      <div>
                        <span className="font-medium">Old Price:</span> ${update.oldPrice}
                      </div>
                      <div>
                        <span className="font-medium">New Price:</span> ${update.newPrice}
                      </div>
                      <div>
                        <span className="font-medium">Date:</span> {update.date}
                      </div>
                      <div>
                        <span className="font-medium">Change:</span> {update.change > 0 ? '+' : ''}${update.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="admin-action-card animate-fade-in-up animation-delay-700">
            <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button className="p-6 border border-apple-gray-200 rounded-2xl hover:border-apple-blue/20 hover:shadow-apple-md transition-all duration-300 text-left">
                <div className="p-3 bg-apple-blue/10 rounded-2xl mb-4 w-fit">
                  <svg className="w-6 h-6 text-apple-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                </div>
                <h3 className="font-semibold text-apple-gray-900 mb-2">Bulk Import</h3>
                <p className="text-sm text-apple-gray-600">Import products from CSV or API</p>
              </button>

              <button className="p-6 border border-apple-gray-200 rounded-2xl hover:border-apple-blue/20 hover:shadow-apple-md transition-all duration-300 text-left">
                <div className="p-3 bg-apple-green/10 rounded-2xl mb-4 w-fit">
                  <svg className="w-6 h-6 text-apple-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-apple-gray-900 mb-2">Price Monitoring</h3>
                <p className="text-sm text-apple-gray-600">Set up automatic price tracking</p>
              </button>

              <button className="p-6 border border-apple-gray-200 rounded-2xl hover:border-apple-blue/20 hover:shadow-apple-md transition-all duration-300 text-left">
                <div className="p-3 bg-apple-purple/10 rounded-2xl mb-4 w-fit">
                  <svg className="w-6 h-6 text-apple-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-apple-gray-900 mb-2">Commission Settings</h3>
                <p className="text-sm text-apple-gray-600">Configure commission rates</p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 