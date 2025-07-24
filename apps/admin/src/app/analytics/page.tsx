'use client';

import { useState } from 'react';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('30d');

  const stats = [
    {
      title: 'Total Clicks',
      value: '12,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: (
        <svg className="w-8 h-8 text-apple-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: 'Conversions',
      value: '342',
      change: '+8.2%',
      changeType: 'positive',
      icon: (
        <svg className="w-8 h-8 text-apple-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Revenue',
      value: '$2,847',
      change: '+15.3%',
      changeType: 'positive',
      icon: (
        <svg className="w-8 h-8 text-apple-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
    },
    {
      title: 'CTR',
      value: '3.2%',
      change: '-2.1%',
      changeType: 'negative',
      icon: (
        <svg className="w-8 h-8 text-apple-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
  ];

  const topProducts = [
    {
      name: 'Apple AirPods Pro',
      clicks: 1247,
      conversions: 89,
      revenue: 1247,
      ctr: 7.1,
    },
    {
      name: 'Sony WH-1000XM4',
      clicks: 892,
      conversions: 67,
      revenue: 1008,
      ctr: 7.5,
    },
    {
      name: 'Bose QuietComfort 45',
      clicks: 654,
      conversions: 45,
      revenue: 675,
      ctr: 6.9,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="admin-header">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in-left">
              <h1 className="text-3xl font-bold text-apple-gray-900">Analytics</h1>
              <p className="text-apple-gray-600 mt-1">Track your affiliate performance and revenue</p>
            </div>
            <div className="flex items-center space-x-4 animate-fade-in-right">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 rounded-2xl border border-apple-gray-200 bg-white focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="admin-stat-card animate-fade-in-up" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-apple-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-apple-gray-900">{stat.value}</p>
                    <p className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-apple-green' : 'text-apple-red'
                    }`}>
                      {stat.change} from last period
                    </p>
                  </div>
                  <div className="p-3 bg-apple-gray-50 rounded-2xl">
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Revenue Chart */}
            <div className="admin-action-card animate-fade-in-up animation-delay-500">
              <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Revenue Trend</h2>
              <div className="h-64 bg-apple-gray-50 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">📈</div>
                  <p className="text-apple-gray-600">Revenue chart coming soon</p>
                </div>
              </div>
            </div>

            {/* Clicks Chart */}
            <div className="admin-action-card animate-fade-in-up animation-delay-600">
              <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Click Performance</h2>
              <div className="h-64 bg-apple-gray-50 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🎯</div>
                  <p className="text-apple-gray-600">Clicks chart coming soon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="admin-action-card animate-fade-in-up animation-delay-700">
            <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Top Performing Products</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-apple-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-apple-gray-900">Product</th>
                    <th className="text-right py-4 px-4 font-semibold text-apple-gray-900">Clicks</th>
                    <th className="text-right py-4 px-4 font-semibold text-apple-gray-900">Conversions</th>
                    <th className="text-right py-4 px-4 font-semibold text-apple-gray-900">Revenue</th>
                    <th className="text-right py-4 px-4 font-semibold text-apple-gray-900">CTR</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product, index) => (
                    <tr key={index} className="border-b border-apple-gray-100 hover:bg-apple-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-semibold text-apple-gray-900">{product.name}</div>
                      </td>
                      <td className="py-4 px-4 text-right text-apple-gray-900">{product.clicks.toLocaleString()}</td>
                      <td className="py-4 px-4 text-right text-apple-gray-900">{product.conversions}</td>
                      <td className="py-4 px-4 text-right text-apple-green font-semibold">${product.revenue.toLocaleString()}</td>
                      <td className="py-4 px-4 text-right text-apple-gray-900">{product.ctr}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="admin-action-card mt-8 animate-fade-in-up animation-delay-800">
            <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Recent Conversions</h2>
            <div className="space-y-4">
              {[
                {
                  product: 'Apple AirPods Pro',
                  commission: 24.50,
                  time: '2 hours ago',
                  status: 'Confirmed',
                },
                {
                  product: 'Sony WH-1000XM4',
                  commission: 18.75,
                  time: '4 hours ago',
                  status: 'Pending',
                },
                {
                  product: 'Bose QuietComfort 45',
                  commission: 15.20,
                  time: '6 hours ago',
                  status: 'Confirmed',
                },
              ].map((conversion, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl border border-apple-gray-100">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-apple-green rounded-full mr-4"></div>
                    <div>
                      <p className="font-semibold text-apple-gray-900">{conversion.product}</p>
                      <p className="text-sm text-apple-gray-600">{conversion.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-apple-green">${conversion.commission}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      conversion.status === 'Confirmed' 
                        ? 'bg-apple-green/10 text-apple-green' 
                        : 'bg-apple-orange/10 text-apple-orange'
                    }`}>
                      {conversion.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 