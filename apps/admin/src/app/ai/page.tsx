'use client';

import { useState } from 'react';
import { ContentGenerator } from '@/components/ai/ContentGenerator';
import { ImageGenerator } from '@/components/ai/ImageGenerator';

export default function AIDashboard() {
  const [activeTab, setActiveTab] = useState<'content' | 'image' | 'settings'>('content');
  const [connectionStatus, setConnectionStatus] = useState<Record<string, boolean>>({});
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  const testConnection = async (provider: string) => {
    setIsTestingConnection(true);
    try {
      const response = await fetch('/api/ai/test-connection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ provider }),
      });

      if (response.ok) {
        const result = await response.json();
        setConnectionStatus(prev => ({
          ...prev,
          [provider]: result.data.connected,
        }));
      } else {
        setConnectionStatus(prev => ({
          ...prev,
          [provider]: false,
        }));
      }
    } catch (error) {
      setConnectionStatus(prev => ({
        ...prev,
        [provider]: false,
      }));
    } finally {
      setIsTestingConnection(false);
    }
  };

  const testAllConnections = async () => {
    setIsTestingConnection(true);
    const providers = ['openai', 'claude', 'leonardo'];
    
    for (const provider of providers) {
      await testConnection(provider);
    }
    setIsTestingConnection(false);
  };

  const handleContentGenerated = (content: string) => {
    // You can implement saving to database or clipboard here
    console.log('Generated content:', content);
  };

  const handleImageGenerated = (imageUrl: string) => {
    // You can implement saving to database or clipboard here
    console.log('Generated image URL:', imageUrl);
  };

  const handleError = (_error: string) => {
    console.error('AI generation error:', _error);
    // You can implement toast notifications here
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="admin-header">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in-left">
              <h1 className="text-3xl font-bold text-apple-gray-900">AI Services</h1>
              <p className="text-apple-gray-600 mt-1">Generate content and images using AI services</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Connection Status */}
          <div className="admin-action-card animate-fade-in-up mb-8">
            <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Service Connections</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {['openai', 'claude', 'leonardo'].map((provider) => (
                <div key={provider} className="flex items-center justify-between p-4 border border-apple-gray-200 rounded-2xl bg-white">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        connectionStatus[provider] === true
                          ? 'bg-apple-green'
                          : connectionStatus[provider] === false
                          ? 'bg-apple-red'
                          : 'bg-apple-gray-300'
                      }`}
                    />
                    <span className="font-medium capitalize text-apple-gray-900">{provider}</span>
                  </div>
                  <button
                    onClick={() => testConnection(provider)}
                    disabled={isTestingConnection}
                    className="admin-button admin-button-secondary text-sm"
                  >
                    Test
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={testAllConnections}
              disabled={isTestingConnection}
              className="admin-button admin-button-primary"
            >
              {isTestingConnection ? 'Testing...' : 'Test All Connections'}
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-apple-gray-100 p-1 rounded-2xl">
              {[
                { id: 'content', name: 'Content Generation' },
                { id: 'image', name: 'Image Generation' },
                { id: 'settings', name: 'Settings' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'content' | 'image' | 'settings')}
                  className={`flex-1 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white text-apple-gray-900 shadow-apple-sm'
                      : 'text-apple-gray-600 hover:text-apple-gray-900'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="admin-action-card animate-fade-in-up animation-delay-200">
            {activeTab === 'content' && (
              <div className="p-6">
                <ContentGenerator
                  onContentGenerated={handleContentGenerated}
                  onError={handleError}
                />
              </div>
            )}

            {activeTab === 'image' && (
              <div className="p-6">
                <ImageGenerator
                  onImageGenerated={handleImageGenerated}
                  onError={handleError}
                />
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="p-6">
                <h2 className="text-2xl font-bold text-apple-gray-900 mb-6">AI Service Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-apple-gray-900 mb-3">Environment Variables</h3>
                    <p className="text-apple-gray-600 mb-4">
                      Make sure the following environment variables are set in your .env file:
                    </p>
                    <div className="bg-apple-gray-50 p-4 rounded-2xl border border-apple-gray-200">
                      <pre className="text-sm text-apple-gray-700">
{`OPENAI_API_KEY=your_openai_api_key
CLAUDE_API_KEY=your_claude_api_key
LEONARDO_API_KEY=your_leonardo_api_key`}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-apple-gray-900 mb-3">Usage Guidelines</h3>
                    <ul className="space-y-2 text-apple-gray-600">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-apple-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Always review generated content before publishing</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-apple-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Ensure FTC compliance for affiliate marketing</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-apple-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Monitor API usage and costs</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-apple-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>Test connections before generating content</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 