/**
 * Utility functions for input validation
 */

/**
 * Validates that the range parameters are valid
 * @param start The start number of the range
 * @param end The end number of the range
 * @returns An object containing validation result and error message if any
 */
export function validateRange(start: number, end: number): {
  isValid: boolean;
  error?: string;
  sanitizedStart?: number;
  sanitizedEnd?: number;
} {
  // Check if start and end are integers
  if (!Number.isInteger(start) || !Number.isInteger(end)) {
    return {
      isValid: false,
      error: `Both start and end must be integers. Received start: ${start}, end: ${end}`
    };
  }

  // Check if start is less than or equal to end
  if (start > end) {
    return {
      isValid: false,
      error: `Start number (${start}) must be less than or equal to end number (${end}).`
    };
  }

  // Check for reasonable range size to prevent DoS attacks
  const MAX_RANGE_SIZE = 1000; // Configurable maximum range size
  const rangeSize = end - start + 1; // +1 because range is inclusive
  if (rangeSize > MAX_RANGE_SIZE) {
    return {
      isValid: false,
      error: `Range size (${rangeSize}) exceeds maximum allowed size (${MAX_RANGE_SIZE}).`
    };
  }

  // Return sanitized values (in case we need to modify them in the future)
  return {
    isValid: true,
    sanitizedStart: start,
    sanitizedEnd: end
  };
}
