'use client';

import { useState } from 'react';
import { ImageGenerationRequest } from '@affiliate/shared-types';

interface ImageGeneratorProps {
  onImageGenerated?: (imageUrl: string) => void;
  onError?: (error: string) => void;
}

export function ImageGenerator({ onImageGenerated, onError }: ImageGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    prompt: '',
    provider: 'leonardo' as const,
    size: '1024x1024' as const,
    style: '',
    aspectRatio: '1:1' as const,
    quality: 'standard' as const,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const request: ImageGenerationRequest = {
        prompt: formData.prompt,
        provider: formData.provider,
        size: formData.size,
        style: formData.style || undefined,
        aspectRatio: formData.aspectRatio,
        quality: formData.quality,
      };

      const response = await fetch('/api/ai/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Image generation failed');
      }

      const result = await response.json();
      const imageUrl = result.data.imageUrl;

      setGeneratedImage(imageUrl);
      onImageGenerated?.(imageUrl);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Image generation failed';
      onError?.(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">AI Image Generator</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image Description/Prompt *
          </label>
          <textarea
            value={formData.prompt}
            onChange={(e) => handleInputChange('prompt', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="Describe the image you want to generate..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              AI Provider
            </label>
            <select
              value={formData.provider}
              onChange={(e) => handleInputChange('provider', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="leonardo">Leonardo.AI</option>
              <option value="openai">OpenAI (DALL-E)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Size
            </label>
            <select
              value={formData.size}
              onChange={(e) => handleInputChange('size', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="1024x1024">1024x1024 (Square)</option>
              <option value="1792x1024">1792x1024 (Landscape)</option>
              <option value="1024x1792">1024x1792 (Portrait)</option>
              <option value="512x512">512x512 (Small Square)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Style (Optional)
            </label>
            <input
              type="text"
              value={formData.style}
              onChange={(e) => handleInputChange('style', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., photorealistic, artistic, minimalist"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quality
            </label>
            <select
              value={formData.quality}
              onChange={(e) => handleInputChange('quality', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="standard">Standard</option>
              <option value="hd">HD</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating || !formData.prompt}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isGenerating ? 'Generating Image...' : 'Generate Image'}
        </button>
      </form>

      {generatedImage && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Generated Image</h3>
          <div className="border rounded-lg p-4 bg-gray-50">
            <img
              src={generatedImage}
              alt="Generated image"
              className="w-full h-auto rounded-lg shadow-sm"
            />
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = generatedImage;
                  link.download = 'generated-image.png';
                  link.click();
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Download
              </button>
              <button
                onClick={() => setGeneratedImage(null)}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 