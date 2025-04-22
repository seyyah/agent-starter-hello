/**
 * Service for generating number ranges
 */
import { validateRange } from '../utils/validation';

/**
 * Interface for the response from the number range service
 */
export interface NumberRangeResponse {
  success: boolean;
  data?: string;
  error?: string;
}

/**
 * Generates a string of numbers between start and end, inclusive
 * @param start The start number of the range
 * @param end The end number of the range
 * @returns A response object containing the result or error
 */
export function generateNumberRange(start: number, end: number): NumberRangeResponse {
  try {
    // Validate the input
    const validation = validateRange(start, end);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error
      };
    }

    // Use the sanitized values
    const validStart = validation.sanitizedStart!;
    const validEnd = validation.sanitizedEnd!;

    // Performance optimization for large ranges
    // For small ranges, use a simple loop
    // For large ranges, use array methods
    let result: string;
    const THRESHOLD = 100; // Threshold for switching methods
    
    if (validEnd - validStart < THRESHOLD) {
      // Simple loop for small ranges
      const numbers = [];
      for (let i = validStart; i <= validEnd; i++) {
        numbers.push(i);
      }
      result = numbers.join(',');
    } else {
      // Array.from with mapping for larger ranges (more efficient)
      result = Array.from(
        { length: validEnd - validStart + 1 },
        (_, i) => validStart + i
      ).join(',');
    }

    return {
      success: true,
      data: result
    };
  } catch (error) {
    // Catch any unexpected errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      error: `Unexpected error: ${errorMessage}`
    };
  }
}
