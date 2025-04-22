/**
 * Number range capability for the agent
 */
import { z } from 'zod';
import { Agent } from '@openserv-labs/sdk';
import { generateNumberRange } from '../services/numberRange';
import { createLogger } from '../utils/logger';

// Create a logger for this module
const logger = createLogger('NumberRangeCapability');

/**
 * Adds the number range capability to the agent
 * @param agent The agent instance to add the capability to
 */
export function addNumberRangeCapability(agent: Agent): void {
  logger.info('Adding number range capability to agent');
  
  agent.addCapability({
    name: 'getNumberRange',
    description: 'Returns a string of numbers between two given numbers, separated by commas',
    schema: z.object({
      start: z.number().int().describe('The starting number of the range (inclusive)'),
      end: z.number().int().describe('The ending number of the range (inclusive)')
    }),
    async run({ args }) {
      const { start, end } = args;
      
      logger.debug(`Received request for range from ${start} to ${end}`);
      
      // Generate the number range
      const result = generateNumberRange(start, end);
      
      // Handle success or error
      if (result.success) {
        logger.debug(`Generated result: ${result.data}`);
        return result.data;
      } else {
        logger.warn(`Error generating number range: ${result.error}`);
        return result.error;
      }
    }
  });
  
  logger.info('Number range capability added successfully');
}
