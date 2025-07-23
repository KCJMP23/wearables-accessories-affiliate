'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Badge, Textarea, Input } from '@affiliate/ui';
import { Eye, Check, X, Edit, Clock, FileText } from 'lucide-react';

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
      const response = await fetch(`/api/cms/posts?status=${filter === 'all' ? '' : filter}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const result = await response.json();
      setPosts(result.data.docs || []);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (postId: string) => {
    setIsApproving(true);
    try {
      const response = await fetch(`/api/cms/posts/${postId}/approve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to approve post');
      }

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
      const response = await fetch(`/api/cms/posts/${postId}/reject`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      });

      if (!response.ok) {
        throw new Error('Failed to reject post');
      }

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
      const response = await fetch(`/api/cms/posts/${postId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      // Update local state
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
    const statusConfig = {
      draft: { color: 'bg-gray-100 text-gray-800', icon: FileText },
      pending_approval: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      published: { color: 'bg-green-100 text-green-800', icon: Check },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    const Icon = config.icon;

    return (
      <Badge className={config.color}>
        <Icon className="h-3 w-3 mr-1" />
        {status.replace('_', ' ')}
      </Badge>
    );
  };

  const filteredPosts = posts.filter(post => {
    if (filter === 'all') return true;
    return post.status === filter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Approval</h1>
          <p className="mt-2 text-gray-600">
            Review and approve draft posts before they go live
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'all', label: 'All Posts', count: posts.length },
                { key: 'draft', label: 'Drafts', count: posts.filter(p => p.status === 'draft').length },
                { key: 'pending_approval', label: 'Pending Approval', count: posts.filter(p => p.status === 'pending_approval').length },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as 'all' | 'draft' | 'pending_approval')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    filter === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Posts List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Posts Queue</CardTitle>
                <CardDescription>
                  {filteredPosts.length} posts to review
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredPosts.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No posts to review</p>
                    </div>
                  ) : (
                    filteredPosts.map((post) => (
                      <div
                        key={post.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedPost?.id === post.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedPost(post)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {post.summary}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              {getStatusBadge(post.status)}
                              <span className="text-xs text-gray-500">
                                {new Date(post.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Post Details */}
          <div className="lg:col-span-2">
            {selectedPost ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{selectedPost.title}</CardTitle>
                      <CardDescription>
                        Created by {selectedPost.author} on{' '}
                        {new Date(selectedPost.createdAt).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    {getStatusBadge(selectedPost.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Summary */}
                  <div>
                    <h3 className="font-semibold mb-2">Summary</h3>
                    <p className="text-gray-600">{selectedPost.summary}</p>
                  </div>

                  {/* Key Takeaways */}
                  {selectedPost.keyTakeaways && selectedPost.keyTakeaways.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Key Takeaways</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {selectedPost.keyTakeaways.map((takeaway, index) => (
                          <li key={index}>{takeaway}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Featured Image */}
                  {selectedPost.featuredImage && (
                    <div>
                      <h3 className="font-semibold mb-2">Featured Image</h3>
                      <img
                        src={selectedPost.featuredImage}
                        alt="Featured"
                        className="w-full max-w-md rounded-lg"
                      />
                    </div>
                  )}

                  {/* Content Preview */}
                  <div>
                    <h3 className="font-semibold mb-2">Content Preview</h3>
                    <div className="bg-gray-50 p-4 rounded-lg max-h-64 overflow-y-auto">
                      <div className="prose prose-sm max-w-none">
                        {selectedPost.content.split('\n').map((paragraph, index) => (
                          <p key={index} className="mb-2">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {selectedPost.status !== 'published' && (
                    <div className="flex space-x-4 pt-4 border-t">
                      <Button
                        onClick={() => setEditingPost(selectedPost)}
                        variant="outline"
                        className="flex-1"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      {selectedPost.status === 'draft' && (
                        <Button
                          onClick={() => handleApprove(selectedPost.id)}
                          disabled={isApproving}
                          className="flex-1"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          {isApproving ? 'Approving...' : 'Approve'}
                        </Button>
                      )}
                      <Button
                        onClick={() => handleReject(selectedPost.id, 'Rejected by admin')}
                        disabled={isRejecting}
                        variant="destructive"
                        className="flex-1"
                      >
                        <X className="h-4 w-4 mr-2" />
                        {isRejecting ? 'Rejecting...' : 'Reject'}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a Post
                  </h3>
                  <p className="text-gray-500">
                    Choose a post from the queue to review and approve
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Edit Modal */}
        {editingPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <Input
                      value={editingPost.title}
                      onChange={(e) => setEditingPost(prev => prev ? { ...prev, title: e.target.value } : null)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Summary
                    </label>
                    <Textarea
                      value={editingPost.summary}
                      onChange={(e) => setEditingPost(prev => prev ? { ...prev, summary: e.target.value } : null)}
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content
                    </label>
                    <Textarea
                      value={editingPost.content}
                      onChange={(e) => setEditingPost(prev => prev ? { ...prev, content: e.target.value } : null)}
                      rows={10}
                    />
                  </div>
                </div>
                <div className="flex space-x-4 mt-6">
                  <Button
                    onClick={() => handleEdit(editingPost.id, editingPost)}
                    className="flex-1"
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={() => setEditingPost(null)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 