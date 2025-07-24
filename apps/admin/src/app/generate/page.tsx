'use client';

import { useState } from 'react';

export default function GenerateContent() {
  const [contentType, setContentType] = useState('blog-post');
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="admin-header">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in-left">
              <h1 className="text-3xl font-bold text-apple-gray-900">Generate Content</h1>
              <p className="text-apple-gray-600 mt-1">Create AI-powered content for your affiliate sites</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="admin-action-card animate-fade-in-up">
            <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Content Generator</h2>
            
            <div className="space-y-6">
              {/* Content Type Selection */}
              <div>
                <label className="block text-sm font-semibold text-apple-gray-900 mb-3">
                  Content Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: 'blog-post', name: 'Blog Post', icon: '📝' },
                    { id: 'product-review', name: 'Product Review', icon: '⭐' },
                    { id: 'comparison', name: 'Comparison', icon: '⚖️' },
                    { id: 'how-to', name: 'How-To Guide', icon: '📚' },
                    { id: 'newsletter', name: 'Newsletter', icon: '📧' },
                    { id: 'social-post', name: 'Social Media Post', icon: '📱' },
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setContentType(type.id)}
                      className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                        contentType === type.id
                          ? 'border-apple-blue bg-apple-blue/5'
                          : 'border-apple-gray-200 hover:border-apple-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <div className="font-semibold text-apple-gray-900">{type.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic Input */}
              <div>
                <label className="block text-sm font-semibold text-apple-gray-900 mb-3">
                  Topic or Product
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Best wireless headphones 2024, Apple AirPods Pro review..."
                  className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
                />
              </div>

              {/* Advanced Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-apple-gray-900 mb-3">
                    Tone
                  </label>
                  <select className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300">
                    <option>Professional</option>
                    <option>Casual</option>
                    <option>Enthusiastic</option>
                    <option>Educational</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-apple-gray-900 mb-3">
                    Length
                  </label>
                  <select className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300">
                    <option>Short (300-500 words)</option>
                    <option>Medium (500-1000 words)</option>
                    <option>Long (1000+ words)</option>
                  </select>
                </div>
              </div>

              {/* Generate Button */}
              <div className="pt-6">
                <button
                  onClick={handleGenerate}
                  disabled={!topic || isGenerating}
                  className={`w-full admin-button admin-button-primary ${
                    !topic || isGenerating ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isGenerating ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Generating Content...
                    </div>
                  ) : (
                    'Generate Content'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Recent Generations */}
          <div className="admin-action-card mt-8 animate-fade-in-up animation-delay-200">
            <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Recent Generations</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Best Wireless Headphones 2024',
                  type: 'Product Review',
                  date: '2 hours ago',
                  status: 'Published',
                },
                {
                  title: 'Apple AirPods Pro vs Sony WH-1000XM4',
                  type: 'Comparison',
                  date: '1 day ago',
                  status: 'Draft',
                },
                {
                  title: 'How to Choose the Right Gaming Headset',
                  type: 'How-To Guide',
                  date: '2 days ago',
                  status: 'Published',
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-apple-gray-50 rounded-2xl border border-apple-gray-100">
                  <div>
                    <h3 className="font-semibold text-apple-gray-900">{item.title}</h3>
                    <p className="text-sm text-apple-gray-600">{item.type} • {item.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === 'Published' 
                      ? 'bg-apple-green/10 text-apple-green' 
                      : 'bg-apple-orange/10 text-apple-orange'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 