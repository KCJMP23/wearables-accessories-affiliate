'use client';

import { useState } from 'react';

export default function NewsletterPage() {
  const [activeTab, setActiveTab] = useState('campaigns');

  const tabs = [
    { id: 'campaigns', name: 'Campaigns', count: 8 },
    { id: 'subscribers', name: 'Subscribers', count: 2847 },
    { id: 'templates', name: 'Templates', count: 12 },
    { id: 'analytics', name: 'Analytics', count: 0 },
  ];

  const recentCampaigns = [
    {
      id: 1,
      name: 'Weekly Tech Roundup',
      status: 'Sent',
      subscribers: 2847,
      openRate: 24.8,
      clickRate: 8.3,
      sentDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'New Product Alert',
      status: 'Scheduled',
      subscribers: 2847,
      openRate: 0,
      clickRate: 0,
      sentDate: '2024-01-18',
    },
    {
      id: 3,
      name: 'Holiday Deals',
      status: 'Draft',
      subscribers: 2847,
      openRate: 0,
      clickRate: 0,
      sentDate: null,
    },
  ];

  const subscriberStats = [
    {
      source: 'Website Signup',
      count: 1847,
      percentage: 65,
      growth: '+12.5%',
    },
    {
      source: 'Social Media',
      count: 567,
      percentage: 20,
      growth: '+8.2%',
    },
    {
      source: 'Referrals',
      count: 234,
      percentage: 8,
      growth: '+15.3%',
    },
    {
      source: 'Other',
      count: 199,
      percentage: 7,
      growth: '+5.1%',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="admin-header">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in-left">
              <h1 className="text-3xl font-bold text-apple-gray-900">Email Marketing</h1>
              <p className="text-apple-gray-600 mt-1">Manage newsletters, campaigns, and subscribers</p>
            </div>
            <div className="animate-fade-in-right">
              <button className="admin-button admin-button-primary">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="admin-stat-card animate-fade-in-up animation-delay-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-apple-gray-600">Total Subscribers</p>
                  <p className="text-2xl font-semibold text-apple-gray-900">2,847</p>
                  <p className="text-sm text-apple-green">+12.5% this month</p>
                </div>
                <div className="p-3 bg-apple-blue/10 rounded-2xl">
                  <svg className="w-6 h-6 text-apple-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="admin-stat-card animate-fade-in-up animation-delay-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-apple-gray-600">Active Campaigns</p>
                  <p className="text-2xl font-semibold text-apple-gray-900">8</p>
                  <p className="text-sm text-apple-blue">3 scheduled</p>
                </div>
                <div className="p-3 bg-apple-green/10 rounded-2xl">
                  <svg className="w-6 h-6 text-apple-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="admin-stat-card animate-fade-in-up animation-delay-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-apple-gray-600">Open Rate</p>
                  <p className="text-2xl font-semibold text-apple-gray-900">24.8%</p>
                  <p className="text-sm text-apple-green">+2.1% from last month</p>
                </div>
                <div className="p-3 bg-apple-orange/10 rounded-2xl">
                  <svg className="w-6 h-6 text-apple-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="admin-stat-card animate-fade-in-up animation-delay-400">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-apple-gray-600">Click Rate</p>
                  <p className="text-2xl font-semibold text-apple-gray-900">8.3%</p>
                  <p className="text-sm text-apple-green">+1.2% from last month</p>
                </div>
                <div className="p-3 bg-apple-purple/10 rounded-2xl">
                  <svg className="w-6 h-6 text-apple-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
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

          {/* Campaign Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="admin-action-card animate-fade-in-up animation-delay-500">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-apple-gray-900">Recent Campaigns</h2>
                <button className="text-apple-blue text-sm font-medium hover:text-apple-blue-dark">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentCampaigns.map((campaign) => (
                  <div key={campaign.id} className="p-4 border border-apple-gray-200 rounded-2xl hover:border-apple-gray-300 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-apple-gray-900">{campaign.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        campaign.status === 'Sent' 
                          ? 'bg-apple-green/10 text-apple-green'
                          : campaign.status === 'Scheduled'
                          ? 'bg-apple-orange/10 text-apple-orange'
                          : 'bg-apple-gray-500/10 text-apple-gray-600'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-apple-gray-600">
                      <div>
                        <span className="font-medium">Subscribers:</span> {campaign.subscribers.toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">Open Rate:</span> {campaign.openRate}%
                      </div>
                      <div>
                        <span className="font-medium">Click Rate:</span> {campaign.clickRate}%
                      </div>
                      <div>
                        <span className="font-medium">Sent:</span> {campaign.sentDate || 'Not sent'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-action-card animate-fade-in-up animation-delay-600">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-apple-gray-900">Subscriber Growth</h2>
                <button className="text-apple-blue text-sm font-medium hover:text-apple-blue-dark">
                  View Details
                </button>
              </div>
              <div className="space-y-4">
                {subscriberStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl border border-apple-gray-100">
                    <div className="flex-1">
                      <h3 className="font-semibold text-apple-gray-900">{stat.source}</h3>
                      <p className="text-sm text-apple-gray-600">{stat.count.toLocaleString()} subscribers</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-apple-gray-900">{stat.percentage}%</p>
                      <p className="text-sm text-apple-green">{stat.growth}</p>
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
                <h3 className="font-semibold text-apple-gray-900 mb-2">Create Campaign</h3>
                <p className="text-sm text-apple-gray-600">Design and send a new email campaign</p>
              </button>

              <button className="p-6 border border-apple-gray-200 rounded-2xl hover:border-apple-blue/20 hover:shadow-apple-md transition-all duration-300 text-left">
                <div className="p-3 bg-apple-green/10 rounded-2xl mb-4 w-fit">
                  <svg className="w-6 h-6 text-apple-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-apple-gray-900 mb-2">Manage Subscribers</h3>
                <p className="text-sm text-apple-gray-600">View and manage your subscriber list</p>
              </button>

              <button className="p-6 border border-apple-gray-200 rounded-2xl hover:border-apple-blue/20 hover:shadow-apple-md transition-all duration-300 text-left">
                <div className="p-3 bg-apple-purple/10 rounded-2xl mb-4 w-fit">
                  <svg className="w-6 h-6 text-apple-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-apple-gray-900 mb-2">View Analytics</h3>
                <p className="text-sm text-apple-gray-600">Track campaign performance and metrics</p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 