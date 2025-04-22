/**
 * Enhanced logging utility
 */

// Log levels
export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3
}

// Current log level from environment or default to INFO
const currentLogLevel = process.env.LOG_LEVEL 
  ? getLogLevelFromString(process.env.LOG_LEVEL) 
  : LogLevel.INFO;

/**
 * Converts a string log level to enum value
 */
function getLogLevelFromString(level: string): LogLevel {
  switch (level.toLowerCase()) {
    case 'error': return LogLevel.ERROR;
    case 'warn': return LogLevel.WARN;
    case 'info': return LogLevel.INFO;
    case 'debug': return LogLevel.DEBUG;
    default: return LogLevel.INFO;
  }
}

/**
 * Formats the current timestamp for logging
 */
function getTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Logger class with methods for different log levels
 */
class Logger {
  private context: string;

  constructor(context: string = 'App') {
    this.context = context;
  }

  /**
   * Logs an error message
   */
  error(message: string, ...args: any[]): void {
    if (currentLogLevel >= LogLevel.ERROR) {
      console.error(`[${getTimestamp()}] [ERROR] [${this.context}] ${message}`, ...args);
    }
  }

  /**
   * Logs a warning message
   */
  warn(message: string, ...args: any[]): void {
    if (currentLogLevel >= LogLevel.WARN) {
      console.warn(`[${getTimestamp()}] [WARN] [${this.context}] ${message}`, ...args);
    }
  }

  /**
   * Logs an info message
   */
  info(message: string, ...args: any[]): void {
    if (currentLogLevel >= LogLevel.INFO) {
      console.info(`[${getTimestamp()}] [INFO] [${this.context}] ${message}`, ...args);
    }
  }

  /**
   * Logs a debug message
   */
  debug(message: string, ...args: any[]): void {
    if (currentLogLevel >= LogLevel.DEBUG) {
      console.debug(`[${getTimestamp()}] [DEBUG] [${this.context}] ${message}`, ...args);
    }
  }
}

/**
 * Creates a new logger with the given context
 */
export function createLogger(context: string): Logger {
  return new Logger(context);
}

// Default logger
export default new Logger();
