'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Textarea, Select, Input, Badge } from '@affiliate/ui';
import { ContentGenerator } from '@/components/ai/ContentGenerator';
import { ImageGenerator } from '@/components/ai/ImageGenerator';
import { Loader2, FileText, Image, Save, Eye } from 'lucide-react';

interface GeneratedPost {
  title: string;
  content: string;
  summary: string;
  keyTakeaways: string[];
  featuredImageUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  status: 'draft' | 'pending_approval' | 'published';
}

export default function GeneratePostPage() {
  const [step, setStep] = useState<'topic' | 'outline' | 'content' | 'image' | 'review'>('topic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(null);
  const [topic, setTopic] = useState('');
  const [outline, setOutline] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const generateOutline = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Create a detailed outline for a blog post about: ${topic}. Include main sections, subsections, and key points to cover.`,
          provider: 'openai',
          contentType: 'blog_post',
          tone: 'professional',
          length: 'medium',
        }),
      });

      if (!response.ok) throw new Error('Failed to generate outline');
      
      const result = await response.json();
      setOutline(result.data.content);
      setStep('outline');
    } catch (error) {
      console.error('Outline generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateContent = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Write a complete blog post based on this outline: ${outline}. Topic: ${topic}. Include a compelling title, introduction, detailed content sections, conclusion, and 3-5 key takeaways.`,
          provider: 'openai',
          contentType: 'blog_post',
          tone: 'professional',
          length: 'long',
        }),
      });

      if (!response.ok) throw new Error('Failed to generate content');
      
      const result = await response.json();
      const contentText = result.data.content;
      
      // Extract title, content, and key takeaways
      const lines = contentText.split('\n').filter((line: string) => line.trim());
      const title = lines[0].replace(/^#\s*/, '');
      const content = lines.slice(1).join('\n');
      const keyTakeaways = extractKeyTakeaways(contentText);
      
      setContent(content);
      setGeneratedPost({
        title,
        content,
        summary: generateSummary(content),
        keyTakeaways,
        status: 'draft',
      });
      setStep('content');
    } catch (error) {
      console.error('Content generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateImage = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Create a professional featured image for a blog post about: ${topic}. High quality, modern design, suitable for affiliate marketing.`,
          provider: 'leonardo',
          size: '1024x1024',
          style: 'photographic',
          aspectRatio: '1:1',
          quality: 'high',
        }),
      });

      if (!response.ok) throw new Error('Failed to generate image');
      
      const result = await response.json();
      setImageUrl(result.data.imageUrl);
      setGeneratedPost(prev => prev ? { ...prev, featuredImageUrl: result.data.imageUrl } : null);
      setStep('image');
    } catch (error) {
      console.error('Image generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const saveToCMS = async () => {
    if (!generatedPost) return;
    
    setIsSaving(true);
    try {
      const response = await fetch('/api/cms/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: generatedPost.title,
          content: generatedPost.content,
          summary: generatedPost.summary,
          keyTakeaways: generatedPost.keyTakeaways,
          featuredImage: imageUrl,
          status: 'draft',
          seoTitle: generatedPost.seoTitle,
          seoDescription: generatedPost.seoDescription,
        }),
      });

      if (!response.ok) throw new Error('Failed to save to CMS');
      
      setStep('review');
    } catch (error) {
      console.error('Save to CMS failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const extractKeyTakeaways = (content: string): string[] => {
    const takeaways = content.match(/Key Takeaway[s]?[:\s]*(.*?)(?=\n|$)/gi);
    if (takeaways) {
      return takeaways.map(t => t.replace(/Key Takeaway[s]?[:\s]*/i, '').trim());
    }
    return [];
  };

  const generateSummary = (content: string): string => {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10);
    return sentences.slice(0, 3).join('. ') + '.';
  };

  const resetForm = () => {
    setStep('topic');
    setTopic('');
    setOutline('');
    setContent('');
    setImageUrl('');
    setGeneratedPost(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Generate Blog Post</h1>
          <p className="mt-2 text-gray-600">
            Create AI-powered blog posts with automated content generation
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[
              { key: 'topic', label: 'Topic', icon: FileText },
              { key: 'outline', label: 'Outline', icon: FileText },
              { key: 'content', label: 'Content', icon: FileText },
              { key: 'image', label: 'Image', icon: Image },
              { key: 'review', label: 'Review', icon: Eye },
            ].map((stepItem, index) => {
              const Icon = stepItem.icon;
              const isActive = step === stepItem.key;
              const isCompleted = ['outline', 'content', 'image', 'review'].indexOf(stepItem.key) <= ['outline', 'content', 'image', 'review'].indexOf(step);
              
              return (
                <div key={stepItem.key} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    isActive ? 'bg-blue-600 text-white' : 
                    isCompleted ? 'bg-green-600 text-white' : 
                    'bg-gray-200 text-gray-600'
                  }`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-blue-600' : 
                    isCompleted ? 'text-green-600' : 
                    'text-gray-500'
                  }`}>
                    {stepItem.label}
                  </span>
                  {index < 4 && (
                    <div className={`ml-4 w-16 h-0.5 ${
                      isCompleted ? 'bg-green-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <Card>
          <CardContent className="p-6">
            {step === 'topic' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Step 1: Define Your Topic</h2>
                  <p className="text-gray-600 mb-4">
                    Enter a topic or title for your blog post. Be specific to get better results.
                  </p>
                  <Textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., 'Top 10 Best Gaming Laptops for 2024' or 'How to Start Affiliate Marketing as a Beginner'"
                    className="w-full"
                    rows={4}
                  />
                </div>
                <Button 
                  onClick={generateOutline}
                  disabled={!topic.trim() || isGenerating}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Outline...
                    </>
                  ) : (
                    'Generate Outline'
                  )}
                </Button>
              </div>
            )}

            {step === 'outline' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Step 2: Review & Refine Outline</h2>
                  <p className="text-gray-600 mb-4">
                    Review the generated outline and make any adjustments before generating content.
                  </p>
                  <Textarea
                    value={outline}
                    onChange={(e) => setOutline(e.target.value)}
                    className="w-full"
                    rows={8}
                  />
                </div>
                <div className="flex space-x-4">
                  <Button 
                    variant="outline"
                    onClick={() => setStep('topic')}
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={generateContent}
                    disabled={isGenerating}
                    className="flex-1"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating Content...
                      </>
                    ) : (
                      'Generate Content'
                    )}
                  </Button>
                </div>
              </div>
            )}

            {step === 'content' && generatedPost && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Step 3: Review Generated Content</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{generatedPost.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{generatedPost.summary}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Key Takeaways:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {generatedPost.keyTakeaways.map((takeaway, index) => (
                          <li key={index} className="text-sm">{takeaway}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Content Preview:</h4>
                      <div className="bg-white border rounded-lg p-4 max-h-64 overflow-y-auto">
                        <div className="prose prose-sm max-w-none">
                          {generatedPost.content.split('\n').map((paragraph, index) => (
                            <p key={index} className="mb-2">{paragraph}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button 
                    variant="outline"
                    onClick={() => setStep('outline')}
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={generateImage}
                    disabled={isGenerating}
                    className="flex-1"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating Image...
                      </>
                    ) : (
                      'Generate Featured Image'
                    )}
                  </Button>
                </div>
              </div>
            )}

            {step === 'image' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Step 4: Featured Image</h2>
                  {imageUrl ? (
                    <div className="space-y-4">
                      <img 
                        src={imageUrl} 
                        alt="Generated featured image" 
                        className="w-full max-w-md mx-auto rounded-lg shadow-md"
                      />
                      <p className="text-center text-sm text-gray-600">
                        AI-generated featured image for your blog post
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Image className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600">No image generated yet</p>
                    </div>
                  )}
                </div>
                <div className="flex space-x-4">
                  <Button 
                    variant="outline"
                    onClick={() => setStep('content')}
                  >
                    Back
                  </Button>
                  <Button 
                    onClick={saveToCMS}
                    disabled={isSaving}
                    className="flex-1"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving to CMS...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save as Draft
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {step === 'review' && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Save className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">Post Saved Successfully!</h2>
                  <p className="text-gray-600 mb-6">
                    Your blog post has been saved as a draft in the CMS. You can review and edit it before publishing.
                  </p>
                  <div className="flex space-x-4 justify-center">
                    <Button onClick={resetForm}>
                      Generate Another Post
                    </Button>
                    <Button variant="outline" onClick={() => window.location.href = '/cms'}>
                      Go to CMS
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 