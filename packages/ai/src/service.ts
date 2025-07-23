import { 
  AIContentGenerationRequest, 
  AIContentGenerationResponse, 
  ImageGenerationRequest, 
  ImageGenerationResponse,
  AIGenerationHistory 
} from '@affiliate/shared-types';
import { OpenAIService } from './providers/openai';
import { ClaudeService } from './providers/claude';
import { LeonardoService } from './providers/leonardo';

export class AIService {
  private openai: OpenAIService;
  private claude: ClaudeService;
  private leonardo: LeonardoService;

  constructor() {
    this.openai = new OpenAIService();
    this.claude = new ClaudeService();
    this.leonardo = new LeonardoService();
  }

  async generateContent(request: AIContentGenerationRequest): Promise<AIContentGenerationResponse> {
    try {
      let response: AIContentGenerationResponse;

      switch (request.provider) {
        case 'openai':
          response = await this.openai.generateContent(request);
          break;
        case 'claude':
          response = await this.claude.generateContent(request);
          break;
        default:
          throw new Error(`Unsupported content generation provider: ${request.provider}`);
      }

      return response;
    } catch (error) {
      throw new Error(`Content generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async generateImage(request: ImageGenerationRequest): Promise<ImageGenerationResponse> {
    try {
      let response: ImageGenerationResponse;

      switch (request.provider) {
        case 'openai':
          response = await this.openai.generateImage(request);
          break;
        case 'leonardo':
          response = await this.leonardo.generateImage(request);
          break;
        default:
          throw new Error(`Unsupported image generation provider: ${request.provider}`);
      }

      return response;
    } catch (error) {
      throw new Error(`Image generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async generateContentWithHistory(
    request: AIContentGenerationRequest,
    userId: string,
    siteId: string
  ): Promise<{ response: AIContentGenerationResponse; history: AIGenerationHistory }> {
    const response = await this.generateContent(request);
    
    const history: AIGenerationHistory = {
      id: crypto.randomUUID(),
      userId,
      siteId,
      request,
      response,
      createdAt: new Date(),
      cost: this.calculateCost(response),
    };

    return { response, history };
  }

  async generateImageWithHistory(
    request: ImageGenerationRequest,
    userId: string,
    siteId: string
  ): Promise<{ response: ImageGenerationResponse; history: AIGenerationHistory }> {
    const response = await this.generateImage(request);
    
    const history: AIGenerationHistory = {
      id: crypto.randomUUID(),
      userId,
      siteId,
      request,
      response,
      createdAt: new Date(),
      cost: this.calculateCost(response),
    };

    return { response, history };
  }

  private calculateCost(response: AIContentGenerationResponse | ImageGenerationResponse): number {
    // Simplified cost calculation - in production, this would be more sophisticated
    if ('usage' in response) {
      // Content generation cost
      const totalTokens = response.usage?.totalTokens || 0;
      const costPer1kTokens = response.provider === 'openai' ? 0.002 : 0.0015; // Claude is cheaper
      return (totalTokens / 1000) * costPer1kTokens;
    } else {
      // Image generation cost
      const costPerImage = response.provider === 'openai' ? 0.04 : 0.02; // Leonardo is cheaper
      return costPerImage;
    }
  }

  getAvailableProviders() {
    return {
      content: ['openai', 'claude'] as const,
      image: ['openai', 'leonardo'] as const,
    };
  }

  async testConnection(provider: 'openai' | 'claude' | 'leonardo'): Promise<boolean> {
    try {
      switch (provider) {
        case 'openai':
          await this.openai.generateContent({
            prompt: 'Test connection',
            provider: 'openai',
            contentType: 'blog_post',
          });
          break;
        case 'claude':
          await this.claude.generateContent({
            prompt: 'Test connection',
            provider: 'claude',
            contentType: 'blog_post',
          });
          break;
        case 'leonardo':
          await this.leonardo.generateImage({
            prompt: 'Test connection',
            provider: 'leonardo',
          });
          break;
      }
      return true;
    } catch (error) {
      console.error(`Connection test failed for ${provider}:`, error);
      return false;
    }
  }
} 