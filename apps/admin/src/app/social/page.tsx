'use client';

import { useState } from 'react';

export default function SocialMediaPage() {
  const [activeTab, setActiveTab] = useState('scheduled');

  const tabs = [
    { id: 'scheduled', name: 'Scheduled', count: 12 },
    { id: 'published', name: 'Published', count: 89 },
    { id: 'drafts', name: 'Drafts', count: 5 },
    { id: 'analytics', name: 'Analytics', count: 0 },
  ];

  const platformStats = [
    {
      name: 'Instagram',
      followers: '2.4K',
      growth: '+15.2%',
      icon: (
        <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      color: 'pink'
    },
    {
      name: 'Twitter',
      followers: '1.8K',
      growth: '+8.7%',
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      color: 'blue'
    },
    {
      name: 'Facebook',
      followers: '3.2K',
      growth: '+12.3%',
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: 'blue'
    },
    {
      name: 'Pinterest',
      followers: '1.5K',
      growth: '+18.9%',
      icon: (
        <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
        </svg>
      ),
      color: 'red'
    },
  ];

  const scheduledPosts = [
    {
      id: 1,
      title: 'Top 10 Wireless Headphones',
      platform: 'Instagram',
      scheduledFor: '2024-01-16T10:00:00Z',
      status: 'Scheduled',
      engagement: 245,
    },
    {
      id: 2,
      title: 'Apple AirPods Pro Review',
      platform: 'Twitter',
      scheduledFor: '2024-01-16T14:30:00Z',
      status: 'Scheduled',
      engagement: 189,
    },
    {
      id: 3,
      title: 'Best Gaming Headsets 2024',
      platform: 'Facebook',
      scheduledFor: '2024-01-17T09:00:00Z',
      status: 'Scheduled',
      engagement: 312,
    },
  ];

  const recentPosts = [
    {
      id: 1,
      title: 'Sony WH-1000XM4 vs AirPods Pro',
      platform: 'Instagram',
      publishedAt: '2024-01-15T10:00:00Z',
      likes: 156,
      comments: 23,
      shares: 12,
    },
    {
      id: 2,
      title: 'Wireless Earbuds Buying Guide',
      platform: 'Twitter',
      publishedAt: '2024-01-14T15:30:00Z',
      likes: 89,
      comments: 15,
      shares: 8,
    },
    {
      id: 3,
      title: 'Noise Cancelling Headphones Comparison',
      platform: 'Facebook',
      publishedAt: '2024-01-13T12:00:00Z',
      likes: 234,
      comments: 31,
      shares: 18,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="admin-header">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in-left">
              <h1 className="text-3xl font-bold text-apple-gray-900">Social Media Automation</h1>
              <p className="text-apple-gray-600 mt-1">Automated posting, hashtags, and content distribution</p>
            </div>
            <div className="animate-fade-in-right">
              <button className="admin-button admin-button-primary">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Post
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Platform Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {platformStats.map((platform, index) => (
              <div key={platform.name} className={`admin-stat-card animate-fade-in-up animation-delay-${(index + 1) * 100}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-apple-gray-600">{platform.name}</p>
                    <p className="text-2xl font-semibold text-apple-gray-900">{platform.followers}</p>
                    <p className="text-sm text-apple-green">{platform.growth} this week</p>
                  </div>
                  <div className={`p-3 bg-${platform.color}-100 rounded-2xl`}>
                    {platform.icon}
                  </div>
                </div>
              </div>
            ))}
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

          {/* Content Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="admin-action-card animate-fade-in-up animation-delay-500">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-apple-gray-900">Scheduled Posts</h2>
                <button className="text-apple-blue text-sm font-medium hover:text-apple-blue-dark">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {scheduledPosts.map((post) => (
                  <div key={post.id} className="p-4 border border-apple-gray-200 rounded-2xl hover:border-apple-gray-300 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-apple-gray-900">{post.title}</h3>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-apple-orange/10 text-apple-orange">
                        {post.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-apple-gray-600">
                      <div>
                        <span className="font-medium">Platform:</span> {post.platform}
                      </div>
                      <div>
                        <span className="font-medium">Scheduled:</span> {new Date(post.scheduledFor).toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">Expected Engagement:</span> {post.engagement}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-action-card animate-fade-in-up animation-delay-600">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-apple-gray-900">Recent Posts</h2>
                <button className="text-apple-blue text-sm font-medium hover:text-apple-blue-dark">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentPosts.map((post) => (
                  <div key={post.id} className="p-4 border border-apple-gray-200 rounded-2xl hover:border-apple-gray-300 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-apple-gray-900">{post.title}</h3>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-apple-green/10 text-apple-green">
                        Published
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-apple-gray-600">
                      <div>
                        <span className="font-medium">Platform:</span> {post.platform}
                      </div>
                      <div>
                        <span className="font-medium">Published:</span> {new Date(post.publishedAt).toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">Likes:</span> {post.likes}
                      </div>
                      <div>
                        <span className="font-medium">Comments:</span> {post.comments}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="font-semibold text-apple-gray-900 mb-2">Create Post</h3>
                <p className="text-sm text-apple-gray-600">Design and schedule a new social media post</p>
              </button>

              <button className="p-6 border border-apple-gray-200 rounded-2xl hover:border-apple-blue/20 hover:shadow-apple-md transition-all duration-300 text-left">
                <div className="p-3 bg-apple-green/10 rounded-2xl mb-4 w-fit">
                  <svg className="w-6 h-6 text-apple-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-apple-gray-900 mb-2">View Analytics</h3>
                <p className="text-sm text-apple-gray-600">Track post performance and engagement</p>
              </button>

              <button className="p-6 border border-apple-gray-200 rounded-2xl hover:border-apple-blue/20 hover:shadow-apple-md transition-all duration-300 text-left">
                <div className="p-3 bg-apple-purple/10 rounded-2xl mb-4 w-fit">
                  <svg className="w-6 h-6 text-apple-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 8h6m-6 4h6m-6 4h6" />
                  </svg>
                </div>
                <h3 className="font-semibold text-apple-gray-900 mb-2">Manage Hashtags</h3>
                <p className="text-sm text-apple-gray-600">Configure trending and custom hashtags</p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 