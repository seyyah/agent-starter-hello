/**
 * Unit tests for the number range functionality
 */
import { generateNumberRange } from '../services/numberRange';
import { validateRange } from '../utils/validation';

/**
 * Simple test runner
 */
function runTests() {
  console.log('Running number range tests...');
  
  // Test validation
  testValidation();
  
  // Test number range generation
  testNumberRangeGeneration();
  
  console.log('All tests completed!');
}

/**
 * Test the validation function
 */
function testValidation() {
  console.log('\n--- Testing validation ---');
  
  // Test valid inputs
  const validTests = [
    { start: 1, end: 5, name: 'Simple valid range' },
    { start: 7, end: 7, name: 'Single number' },
    { start: -3, end: 3, name: 'Negative to positive' },
    { start: -10, end: -5, name: 'Negative range' }
  ];
  
  validTests.forEach(test => {
    const result = validateRange(test.start, test.end);
    console.log(`Test: ${test.name} - Result: ${result.isValid ? 'PASS' : 'FAIL'}`);
    if (!result.isValid) {
      console.error(`  Error: ${result.error}`);
    }
  });
  
  // Test invalid inputs
  const invalidTests = [
    { start: 5, end: 1, name: 'Start greater than end', expectedError: 'Start number (5) must be less than or equal to end number (1).' },
    { start: 1, end: 1001, name: 'Range too large', expectedError: 'Range size (1001) exceeds maximum allowed size (1000).' },
    { start: 1.5, end: 5, name: 'Non-integer start', expectedError: 'Both start and end must be integers.' }
  ];
  
  invalidTests.forEach(test => {
    const result = validateRange(test.start, test.end);
    const passed = !result.isValid && result.error?.includes(test.expectedError);
    console.log(`Test: ${test.name} - Result: ${passed ? 'PASS' : 'FAIL'}`);
    if (!passed) {
      console.error(`  Expected error containing: ${test.expectedError}`);
      console.error(`  Actual result: ${JSON.stringify(result)}`);
    }
  });
}

/**
 * Test the number range generation function
 */
function testNumberRangeGeneration() {
  console.log('\n--- Testing number range generation ---');
  
  // Test cases
  const tests = [
    { 
      start: 1, 
      end: 5, 
      name: 'Simple range', 
      expected: '1,2,3,4,5' 
    },
    { 
      start: 7, 
      end: 7, 
      name: 'Single number', 
      expected: '7' 
    },
    { 
      start: -2, 
      end: 2, 
      name: 'Negative to positive', 
      expected: '-2,-1,0,1,2' 
    },
    { 
      start: 5, 
      end: 1, 
      name: 'Invalid range (start > end)', 
      expectedError: true 
    }
  ];
  
  tests.forEach(test => {
    const result = generateNumberRange(test.start, test.end);
    
    if (test.expectedError) {
      // Should be an error
      const passed = !result.success;
      console.log(`Test: ${test.name} - Result: ${passed ? 'PASS' : 'FAIL'}`);
      if (!passed) {
        console.error(`  Expected error but got success: ${result.data}`);
      }
    } else {
      // Should be successful with expected data
      const passed = result.success && result.data === test.expected;
      console.log(`Test: ${test.name} - Result: ${passed ? 'PASS' : 'FAIL'}`);
      if (!passed) {
        if (!result.success) {
          console.error(`  Expected success but got error: ${result.error}`);
        } else {
          console.error(`  Expected: ${test.expected}`);
          console.error(`  Actual: ${result.data}`);
        }
      }
    }
  });
}

// Run the tests
runTests();
