'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Site {
  id: string;
  name: string;
  url: string;
  created_at: string;
  settings?: {
    logo?: string;
    theme?: string;
    description?: string;
  };
  stats?: {
    posts: number;
    products: number;
    clicks: number;
    revenue: number;
  };
}

export default function SitesPage() {
  const { data: session } = useSession();
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: ''
  });

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      setLoading(true);
      // Mock data for now
      const mockSites: Site[] = [
        {
          id: '1',
          name: 'TechGear Reviews',
          url: 'https://techgear-reviews.com',
          created_at: '2024-01-15T10:00:00Z',
          settings: {
            logo: '/logo1.png',
            theme: 'dark',
            description: 'Comprehensive reviews of the latest tech gadgets and accessories'
          },
          stats: {
            posts: 127,
            products: 342,
            clicks: 12470,
            revenue: 2847
          }
        },
        {
          id: '2',
          name: 'Audio Excellence',
          url: 'https://audio-excellence.com',
          created_at: '2024-01-10T14:30:00Z',
          settings: {
            logo: '/logo2.png',
            theme: 'light',
            description: 'Expert reviews of headphones, speakers, and audio equipment'
          },
          stats: {
            posts: 89,
            products: 156,
            clicks: 8920,
            revenue: 1650
          }
        },
        {
          id: '3',
          name: 'Smart Home Hub',
          url: 'https://smart-home-hub.com',
          created_at: '2024-01-05T09:15:00Z',
          settings: {
            logo: '/logo3.png',
            theme: 'dark',
            description: 'Your guide to smart home technology and automation'
          },
          stats: {
            posts: 64,
            products: 98,
            clicks: 5430,
            revenue: 920
          }
        }
      ];
      
      setSites(mockSites);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch sites');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSite = async () => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newSite: Site = {
        id: Date.now().toString(),
        name: formData.name,
        url: formData.url,
        created_at: new Date().toISOString(),
        settings: {
          description: formData.description
        },
        stats: {
          posts: 0,
          products: 0,
          clicks: 0,
          revenue: 0
        }
      };
      
      setSites(prev => [...prev, newSite]);
      setShowCreateModal(false);
      setFormData({ name: '', url: '', description: '' });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create site');
    }
  };

  const handleUpdateSite = async () => {
    if (!selectedSite) return;

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSites(prev => prev.map(site => 
        site.id === selectedSite.id 
          ? { ...site, name: formData.name, url: formData.url, settings: { ...site.settings, description: formData.description } }
          : site
      ));
      
      setShowEditModal(false);
      setSelectedSite(null);
      setFormData({ name: '', url: '', description: '' });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to update site');
    }
  };

  const handleDeleteSite = async (siteId: string) => {
    if (!confirm('Are you sure you want to delete this site?')) return;

    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSites(prev => prev.filter(site => site.id !== siteId));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to delete site');
    }
  };

  const openEditModal = (site: Site) => {
    setSelectedSite(site);
    setFormData({
      name: site.name,
      url: site.url,
      description: site.settings?.description || ''
    });
    setShowEditModal(true);
  };

  const openCreateModal = () => {
    setFormData({ name: '', url: '', description: '' });
    setShowCreateModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <header className="admin-header">
          <div className="px-6 py-6">
            <div className="animate-fade-in-left">
              <h1 className="text-3xl font-bold text-apple-gray-900">Sites</h1>
              <p className="text-apple-gray-600 mt-1">Manage your affiliate sites</p>
            </div>
          </div>
        </header>
        <main className="px-6 py-8">
          <div className="admin-action-card animate-fade-in-up">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-apple-blue"></div>
              <span className="ml-3 text-apple-gray-600">Loading sites...</span>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="admin-header">
        <div className="px-4 sm:px-6 py-6 lg:pl-6 pl-20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="animate-fade-in-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-apple-gray-900">Sites</h1>
              <p className="text-apple-gray-600 mt-1 text-sm sm:text-base">Manage your affiliate sites</p>
            </div>
            <div className="animate-fade-in-right">
              <button 
                onClick={openCreateModal}
                className="admin-button admin-button-primary w-full sm:w-auto"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Site
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 py-4 sm:py-8">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-apple-red/10 border border-apple-red/20 rounded-2xl text-apple-red">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                {error}
              </div>
            </div>
          )}

          {/* Sites Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {sites.map((site) => (
              <div key={site.id} className="admin-action-card animate-fade-in-up">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-apple-gray-900 mb-1">{site.name}</h3>
                    <p className="text-sm text-apple-gray-600 mb-2">{site.url}</p>
                    {site.settings?.description && (
                      <p className="text-sm text-apple-gray-600 line-clamp-2">{site.settings.description}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(site)}
                      className="p-2 text-apple-gray-600 hover:text-apple-blue hover:bg-apple-blue/10 rounded-xl transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteSite(site.id)}
                      className="p-2 text-apple-gray-600 hover:text-apple-red hover:bg-apple-red/10 rounded-xl transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Stats */}
                {site.stats && (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-apple-gray-100">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-apple-gray-900">{site.stats.posts}</p>
                      <p className="text-xs text-apple-gray-600">Posts</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-apple-gray-900">{site.stats.products}</p>
                      <p className="text-xs text-apple-gray-600">Products</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-apple-gray-900">{site.stats.clicks.toLocaleString()}</p>
                      <p className="text-xs text-apple-gray-600">Clicks</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-apple-green">${site.stats.revenue}</p>
                      <p className="text-xs text-apple-gray-600">Revenue</p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 mt-4 pt-4 border-t border-apple-gray-100">
                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 admin-button admin-button-secondary text-center justify-center"
                  >
                    <svg className="w-4 h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Visit
                  </a>
                  <button className="flex-1 admin-button admin-button-primary justify-center">
                    <svg className="w-4 h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Analytics
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-apple-gray-900 mb-4">Create New Site</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-apple-gray-700 mb-2">Site Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
                  placeholder="Enter site name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray-700 mb-2">URL</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                  className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
                  placeholder="Enter site description"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleCreateSite}
                className="flex-1 admin-button admin-button-primary"
              >
                Create Site
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 admin-button admin-button-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedSite && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-apple-gray-900 mb-4">Edit Site</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-apple-gray-700 mb-2">Site Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
                  placeholder="Enter site name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray-700 mb-2">URL</label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                  className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-apple-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-3 rounded-2xl border border-apple-gray-200 focus:border-apple-blue focus:ring-2 focus:ring-apple-blue/20 transition-all duration-300"
                  placeholder="Enter site description"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleUpdateSite}
                className="flex-1 admin-button admin-button-primary"
              >
                Update Site
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 admin-button admin-button-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 