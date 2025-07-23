export { AIService } from './service';
export { OpenAIService } from './providers/openai';
export { ClaudeService } from './providers/claude';
export { LeonardoService } from './providers/leonardo';
export { AmazonAssociatesService, amazonService } from './providers/amazon';
export { aiConfig, getAIConfig } from './config';

// Re-export types for convenience
export type {
  AIProvider,
  AIContentGenerationRequest,
  AIContentGenerationResponse,
  ImageGenerationRequest,
  ImageGenerationResponse,
  AIServiceConfig,
  ContentTemplate,
  AIGenerationHistory,
} from '@affiliate/shared-types';

// Export manual Amazon link management
export { manualAmazonLinkManager, type ManualAmazonLink, type AmazonTrackingId } from './providers/amazon-manual'; 