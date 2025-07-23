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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Services Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Generate content and images using AI services
          </p>
        </div>

        {/* Connection Status */}
        <div className="mb-6 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Service Connections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['openai', 'claude', 'leonardo'].map((provider) => (
              <div key={provider} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      connectionStatus[provider] === true
                        ? 'bg-green-500'
                        : connectionStatus[provider] === false
                        ? 'bg-red-500'
                        : 'bg-gray-300'
                    }`}
                  />
                  <span className="font-medium capitalize">{provider}</span>
                </div>
                <button
                  onClick={() => testConnection(provider)}
                  disabled={isTestingConnection}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                  Test
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={testAllConnections}
            disabled={isTestingConnection}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400"
          >
            {isTestingConnection ? 'Testing...' : 'Test All Connections'}
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'content', label: 'Content Generation' },
              { id: 'image', label: 'Image Generation' },
              { id: 'settings', label: 'Settings' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'content' | 'image' | 'settings')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-md">
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
              <h2 className="text-2xl font-bold mb-6">AI Service Settings</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Environment Variables</h3>
                  <p className="text-gray-600 mb-4">
                    Make sure the following environment variables are set in your .env file:
                  </p>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <pre className="text-sm">
{`OPENAI_API_KEY=your_openai_api_key
CLAUDE_API_KEY=your_claude_api_key
LEONARDO_API_KEY=your_leonardo_api_key`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Usage Guidelines</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    <li>Always review generated content before publishing</li>
                    <li>Ensure FTC compliance for affiliate marketing</li>
                    <li>Monitor API usage and costs</li>
                    <li>Test connections before generating content</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 