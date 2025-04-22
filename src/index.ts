/**
 * Number Range Agent - Main Entry Point
 *
 * This agent returns a string of numbers between two given numbers, separated by commas.
 */
import { Agent } from '@openserv-labs/sdk';
import { config } from './config';
import { addNumberRangeCapability } from './capabilities/numberRange';
import { generateNumberRange } from './services/numberRange';
import { createLogger } from './utils/logger';

// Create the main application logger
const logger = createLogger('App');

/**
 * Initialize and start the agent
 */
async function startAgent() {
  logger.info('Initializing number range agent');

  // Create the agent with system prompt
  const agent = new Agent({
    systemPrompt: 'You are an agent that returns a string of numbers between two given numbers, separated by commas.'
  });

  // Add capabilities
  addNumberRangeCapability(agent);

  // Start the agent's HTTP server
  const port = config.server.port;
  try {
    await agent.start(port);
    logger.info(`Agent started successfully on port ${port}`);
  } catch (error) {
    logger.error(`Failed to start agent: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }

  // Set up graceful shutdown
  setupGracefulShutdown(agent);

  // Run tests if in development mode
  if (process.env.NODE_ENV === 'development') {
    runManualTests();
  }
}

/**
 * Set up handlers for graceful shutdown
 */
function setupGracefulShutdown(agent: Agent) {
  const shutdown = async () => {
    logger.info('Shutting down agent...');
    try {
      await agent.stop();
      logger.info('Agent stopped successfully');
      process.exit(0);
    } catch (error) {
      logger.error(`Error during shutdown: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    }
  };

  // Handle termination signals
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
  process.on('uncaughtException', (error) => {
    logger.error(`Uncaught exception: ${error.message}`);
    logger.error(error.stack || 'No stack trace available');
    shutdown();
  });
}

/**
 * Run manual tests for development purposes
 */
function runManualTests() {
  logger.info('Running manual tests');

  // Test cases
  const testCases = [
    { start: 3, end: 8, label: 'Simple range' },
    { start: 7, end: 7, label: 'Single number' },
    { start: -3, end: 3, label: 'Negative numbers' }
  ];

  // Run each test case
  testCases.forEach(({ start, end, label }) => {
    logger.info(`Test: ${label} - Range from ${start} to ${end}`);
    const result = generateNumberRange(start, end);

    if (result.success) {
      logger.info(`Result: ${result.data}`);
    } else {
      logger.warn(`Error: ${result.error}`);
    }
  });

  logger.info('Manual tests completed');
}

// Start the agent
startAgent().catch(error => {
  logger.error(`Failed to start agent: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
