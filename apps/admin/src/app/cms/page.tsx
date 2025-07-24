'use client';

import { useState } from 'react';

export default function CMS() {
  const [activeTab, setActiveTab] = useState('posts');

  const tabs = [
    { id: 'posts', name: 'Posts', count: 127 },
    { id: 'products', name: 'Products', count: 342 },
    { id: 'media', name: 'Media', count: 89 },
    { id: 'categories', name: 'Categories', count: 12 },
  ];

  const posts = [
    {
      id: 1,
      title: 'Best Wireless Headphones 2024',
      status: 'Published',
      author: 'Admin',
      date: '2024-01-15',
      views: 1247,
      category: 'Tech Reviews',
    },
    {
      id: 2,
      title: 'Apple AirPods Pro vs Sony WH-1000XM4',
      status: 'Draft',
      author: 'Admin',
      date: '2024-01-14',
      views: 0,
      category: 'Comparisons',
    },
    {
      id: 3,
      title: 'How to Choose the Right Gaming Headset',
      status: 'Published',
      author: 'Admin',
      date: '2024-01-13',
      views: 892,
      category: 'Guides',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="admin-header">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in-left">
              <h1 className="text-3xl font-bold text-apple-gray-900">Content Management</h1>
              <p className="text-apple-gray-600 mt-1">Manage your posts, products, and media</p>
            </div>
            <div className="animate-fade-in-right">
              <button className="admin-button admin-button-primary">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Post
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
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

          {/* Content */}
          {activeTab === 'posts' && (
            <div className="admin-action-card animate-fade-in-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-apple-gray-900">Posts</h2>
                <div className="flex space-x-2">
                  <button className="admin-button admin-button-secondary">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                    </svg>
                    Filter
                  </button>
                  <button className="admin-button admin-button-secondary">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Export
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl border border-apple-gray-100 hover:shadow-apple-sm transition-all duration-300">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-apple-gray-900">{post.title}</h3>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-apple-gray-600">
                            <span>{post.author}</span>
                            <span>•</span>
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.category}</span>
                            <span>•</span>
                            <span>{post.views} views</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            post.status === 'Published' 
                              ? 'bg-apple-green/10 text-apple-green' 
                              : 'bg-apple-orange/10 text-apple-orange'
                          }`}>
                            {post.status}
                          </span>
                          <button className="p-2 text-apple-gray-400 hover:text-apple-gray-600 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button className="p-2 text-apple-gray-400 hover:text-apple-red transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-apple-gray-200">
                <div className="text-sm text-apple-gray-600">
                  Showing 1-10 of 127 posts
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-2 rounded-xl border border-apple-gray-200 text-apple-gray-600 hover:bg-apple-gray-50 transition-colors">
                    Previous
                  </button>
                  <button className="px-3 py-2 rounded-xl bg-apple-blue text-white">
                    1
                  </button>
                  <button className="px-3 py-2 rounded-xl border border-apple-gray-200 text-apple-gray-600 hover:bg-apple-gray-50 transition-colors">
                    2
                  </button>
                  <button className="px-3 py-2 rounded-xl border border-apple-gray-200 text-apple-gray-600 hover:bg-apple-gray-50 transition-colors">
                    3
                  </button>
                  <button className="px-3 py-2 rounded-xl border border-apple-gray-200 text-apple-gray-600 hover:bg-apple-gray-50 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="admin-action-card animate-fade-in-up">
              <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Products</h2>
              <p className="text-apple-gray-600">Product management coming soon...</p>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="admin-action-card animate-fade-in-up">
              <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Media</h2>
              <p className="text-apple-gray-600">Media management coming soon...</p>
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="admin-action-card animate-fade-in-up">
              <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Categories</h2>
              <p className="text-apple-gray-600">Category management coming soon...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 