'use client';

import { useState, useEffect } from 'react';

interface Post {
  id: string;
  title: string;
  summary: string;
  content: string;
  keyTakeaways: string[];
  featuredImage?: string;
  status: 'draft' | 'pending_approval' | 'published';
  author: string;
  createdAt: string;
  updatedAt: string;
  seoTitle?: string;
  seoDescription?: string;
}

export default function ContentApprovalPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [filter, setFilter] = useState<'all' | 'draft' | 'pending_approval'>('all');
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Mock data for now
      const mockPosts: Post[] = [
        {
          id: '1',
          title: 'Best Wireless Headphones 2024',
          summary: 'Comprehensive review of the top wireless headphones available in 2024',
          content: 'This is a detailed review of wireless headphones...',
          keyTakeaways: ['Excellent sound quality', 'Great battery life', 'Comfortable fit'],
          status: 'pending_approval',
          author: 'Admin',
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z',
          seoTitle: 'Best Wireless Headphones 2024 - Complete Guide',
          seoDescription: 'Find the perfect wireless headphones for your needs in 2024'
        },
        {
          id: '2',
          title: 'Apple AirPods Pro vs Sony WH-1000XM4',
          summary: 'Head-to-head comparison of two premium wireless earbuds',
          content: 'Comparing the latest AirPods Pro with Sony\'s flagship...',
          keyTakeaways: ['AirPods Pro better for iOS users', 'Sony has better noise cancellation', 'Price difference significant'],
          status: 'draft',
          author: 'Admin',
          createdAt: '2024-01-14T15:30:00Z',
          updatedAt: '2024-01-14T15:30:00Z',
          seoTitle: 'AirPods Pro vs Sony WH-1000XM4 Comparison',
          seoDescription: 'Which premium wireless earbuds should you choose?'
        },
        {
          id: '3',
          title: 'How to Choose the Right Gaming Headset',
          summary: 'Complete guide to selecting the perfect gaming headset',
          content: 'Gaming headsets come in many varieties...',
          keyTakeaways: ['Consider your gaming platform', 'Audio quality matters', 'Comfort is crucial'],
          status: 'pending_approval',
          author: 'Admin',
          createdAt: '2024-01-13T09:15:00Z',
          updatedAt: '2024-01-13T09:15:00Z',
          seoTitle: 'Gaming Headset Buying Guide 2024',
          seoDescription: 'Everything you need to know about choosing a gaming headset'
        }
      ];
      
      setPosts(mockPosts);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (postId: string) => {
    setIsApproving(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update local state
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, status: 'published' as const }
          : post
      ));
      
      if (selectedPost?.id === postId) {
        setSelectedPost(prev => prev ? { ...prev, status: 'published' as const } : null);
      }
    } catch (error) {
      console.error('Failed to approve post:', error);
    } finally {
      setIsApproving(false);
    }
  };

  const handleReject = async (postId: string, reason: string) => {
    setIsRejecting(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove from list
      setPosts(prev => prev.filter(post => post.id !== postId));
      
      if (selectedPost?.id === postId) {
        setSelectedPost(null);
      }
    } catch (error) {
      console.error('Failed to reject post:', error);
    } finally {
      setIsRejecting(false);
    }
  };

  const handleEdit = async (postId: string, updatedData: Partial<Post>) => {
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, ...updatedData }
          : post
      ));
      
      if (selectedPost?.id === postId) {
        setSelectedPost(prev => prev ? { ...prev, ...updatedData } : null);
      }
      
      setEditingPost(null);
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-apple-green/10 text-apple-green">
            <div className="w-2 h-2 bg-apple-green rounded-full mr-2"></div>
            Published
          </span>
        );
      case 'pending_approval':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-apple-orange/10 text-apple-orange">
            <div className="w-2 h-2 bg-apple-orange rounded-full mr-2"></div>
            Pending
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-apple-gray-500/10 text-apple-gray-600">
            <div className="w-2 h-2 bg-apple-gray-500 rounded-full mr-2"></div>
            Draft
          </span>
        );
      default:
        return null;
    }
  };

  const filteredPosts = posts.filter(post => 
    filter === 'all' ? true : post.status === filter
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="admin-header">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in-left">
              <h1 className="text-3xl font-bold text-apple-gray-900">Content Approval</h1>
              <p className="text-apple-gray-600 mt-1">Review and approve content before publication</p>
            </div>
            <div className="animate-fade-in-right">
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    filter === 'all'
                      ? 'bg-apple-blue text-white'
                      : 'bg-apple-gray-100 text-apple-gray-700 hover:bg-apple-gray-200'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('pending_approval')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    filter === 'pending_approval'
                      ? 'bg-apple-orange text-white'
                      : 'bg-apple-gray-100 text-apple-gray-700 hover:bg-apple-gray-200'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilter('draft')}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    filter === 'draft'
                      ? 'bg-apple-gray-600 text-white'
                      : 'bg-apple-gray-100 text-apple-gray-700 hover:bg-apple-gray-200'
                  }`}
                >
                  Drafts
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="admin-action-card animate-fade-in-up">
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-apple-blue"></div>
                <span className="ml-3 text-apple-gray-600">Loading posts...</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Posts List */}
              <div className="lg:col-span-1">
                <div className="admin-action-card animate-fade-in-up">
                  <h2 className="text-xl font-bold text-apple-gray-900 mb-6">Posts ({filteredPosts.length})</h2>
                  <div className="space-y-4">
                    {filteredPosts.map((post) => (
                      <div
                        key={post.id}
                        onClick={() => setSelectedPost(post)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                          selectedPost?.id === post.id
                            ? 'border-apple-blue bg-apple-blue/5'
                            : 'border-apple-gray-200 hover:border-apple-gray-300 hover:bg-apple-gray-50'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-apple-gray-900 line-clamp-2">{post.title}</h3>
                          {getStatusBadge(post.status)}
                        </div>
                        <p className="text-sm text-apple-gray-600 mb-3 line-clamp-2">{post.summary}</p>
                        <div className="flex items-center justify-between text-xs text-apple-gray-500">
                          <span>{post.author}</span>
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Post Details */}
              <div className="lg:col-span-2">
                {selectedPost ? (
                  <div className="admin-action-card animate-fade-in-up">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold text-apple-gray-900">Post Details</h2>
                      <div className="flex space-x-2">
                        {selectedPost.status === 'pending_approval' && (
                          <>
                            <button
                              onClick={() => handleApprove(selectedPost.id)}
                              disabled={isApproving}
                              className="admin-button admin-button-primary"
                            >
                              {isApproving ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              ) : (
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(selectedPost.id, 'Rejected by admin')}
                              disabled={isRejecting}
                              className="admin-button bg-apple-red text-white hover:bg-apple-red/90"
                            >
                              {isRejecting ? (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              ) : (
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              )}
                              Reject
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => setEditingPost(selectedPost)}
                          className="admin-button admin-button-secondary"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">Title</h3>
                        <p className="text-apple-gray-700">{selectedPost.title}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">Summary</h3>
                        <p className="text-apple-gray-700">{selectedPost.summary}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">Content</h3>
                        <div className="bg-apple-gray-50 rounded-2xl p-4 max-h-64 overflow-y-auto">
                          <p className="text-apple-gray-700 whitespace-pre-wrap">{selectedPost.content}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">Key Takeaways</h3>
                        <ul className="space-y-2">
                          {selectedPost.keyTakeaways.map((takeaway, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-2 h-2 bg-apple-blue rounded-full mt-2 mr-3 flex-shrink-0"></div>
                              <span className="text-apple-gray-700">{takeaway}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">SEO Title</h3>
                          <p className="text-apple-gray-700">{selectedPost.seoTitle}</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">SEO Description</h3>
                          <p className="text-apple-gray-700">{selectedPost.seoDescription}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">Author</h3>
                          <p className="text-apple-gray-700">{selectedPost.author}</p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">Created</h3>
                          <p className="text-apple-gray-700">{new Date(selectedPost.createdAt).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="admin-action-card animate-fade-in-up">
                    <div className="text-center py-12">
                      <svg className="w-16 h-16 text-apple-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <h3 className="text-lg font-semibold text-apple-gray-900 mb-2">Select a Post</h3>
                      <p className="text-apple-gray-600">Choose a post from the list to view its details and approve or reject it.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 