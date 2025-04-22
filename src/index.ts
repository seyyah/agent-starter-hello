import { z } from 'zod'
import { Agent } from '@openserv-labs/sdk'
import 'dotenv/config'

// Enable more verbose logging
process.env.LOG_LEVEL = 'debug';

// Create the agent
const agent = new Agent({
  systemPrompt: 'You are an agent that returns a string of numbers between two given numbers, separated by commas.'
})

// Log when requests are received
console.log('Agent created and ready to receive requests')

// Add number range capability
agent.addCapability({
  name: 'getNumberRange',
  description: 'Returns a string of numbers between two given numbers, separated by commas',
  schema: z.object({
    start: z.number().int().describe('The starting number of the range (inclusive)'),
    end: z.number().int().describe('The ending number of the range (inclusive)')
  }),
  run({ args }) {
    const { start, end } = args

    console.log(`[getNumberRange] Received request for range from ${start} to ${end}`)

    // Validate that start is less than or equal to end
    if (start > end) {
      console.log(`[getNumberRange] Error: Start number (${start}) is greater than end number (${end})`)
      return `Error: Start number (${start}) must be less than or equal to end number (${end}).`
    }

    // Check for reasonable range size to prevent DoS attacks
    const MAX_RANGE_SIZE = 1000;
    const rangeSize = end - start + 1;
    if (rangeSize > MAX_RANGE_SIZE) {
      console.log(`[getNumberRange] Error: Range size (${rangeSize}) exceeds maximum allowed size (${MAX_RANGE_SIZE})`)
      return `Error: Range size (${rangeSize}) exceeds maximum allowed size (${MAX_RANGE_SIZE}).`
    }

    // Generate the range of numbers
    let numbers;
    const THRESHOLD = 100;

    if (end - start < THRESHOLD) {
      // Simple loop for small ranges
      numbers = [];
      for (let i = start; i <= end; i++) {
        numbers.push(i)
      }
    } else {
      // Array.from with mapping for larger ranges (more efficient)
      numbers = Array.from(
        { length: end - start + 1 },
        (_, i) => start + i
      );
    }

    // Join the numbers with commas and return as a string
    const result = numbers.join(',')
    console.log(`[getNumberRange] Generated result: ${result}`)
    return result
  }
})

// Start the agent's HTTP server
agent.start()

// For local testing with OpenAI API (commented out due to quota issues)
/*
async function main() {
  // Test case 1: Simple range
  const test1 = await agent.process({
    messages: [
      {
        role: 'user',
        content: 'Give me all numbers between 5 and 10'
      }
    ]
  })
  console.log('Test 1:', test1.choices[0].message.content)

  // Test case 2: Different phrasing
  const test2 = await agent.process({
    messages: [
      {
        role: 'user',
        content: 'What are the numbers from 1 to 5?'
      }
    ]
  })
  console.log('Test 2:', test2.choices[0].message.content)

  // Test case 3: Edge case - same number
  const test3 = await agent.process({
    messages: [
      {
        role: 'user',
        content: 'List numbers between 7 and 7'
      }
    ]
  })
  console.log('Test 3:', test3.choices[0].message.content)
}

main().catch(console.error)
*/

// Manual test of the capability
const testStart = 3;
const testEnd = 8;
console.log(`Manual test - Range from ${testStart} to ${testEnd}:`);

// Direct test of the capability logic
const numbers = [];
for (let i = testStart; i <= testEnd; i++) {
  numbers.push(i);
}
console.log(numbers.join(','));
