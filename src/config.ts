/**
 * Application configuration
 */
import 'dotenv/config';

// Default values
const DEFAULT_PORT = 7378;
const DEFAULT_MAX_RANGE_SIZE = 1000;

// Configuration object
export const config = {
  // Server configuration
  server: {
    port: parseInt(process.env.PORT || String(DEFAULT_PORT), 10),
  },
  
  // API keys
  api: {
    openservApiKey: process.env.OPENSERV_API_KEY,
    openaiApiKey: process.env.OPENAI_API_KEY,
  },
  
  // Application settings
  app: {
    maxRangeSize: parseInt(process.env.MAX_RANGE_SIZE || String(DEFAULT_MAX_RANGE_SIZE), 10),
    logLevel: process.env.LOG_LEVEL || 'info',
  },
  
  // Validate that required environment variables are set
  validate(): void {
    if (!this.api.openservApiKey) {
      console.warn('OPENSERV_API_KEY is not set. The agent may not work correctly with the OpenServ platform.');
    }
  }
};

// Validate configuration on import
config.validate();
