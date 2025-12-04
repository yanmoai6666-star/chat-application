// Logger utility - using new centralized configuration
const winston = require('winston');
const path = require('path');

// Import new centralized configuration
const config = require('../config/config');

// Create Winston logger
const logger = winston.createLogger({
    level: config.logging.level,
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        config.logging.format === 'json' ? winston.format.json() : winston.format.simple()
    ),
    defaultMeta: { service: 'chat-application' },
    transports: [
        // - Write all logs with level `error` and below to `error.log`
        new winston.transports.File({
            filename: path.join(config.logging.directory, 'error.log'),
            level: 'error',
            maxsize: config.logging.maxFileSize,
            maxFiles: config.logging.maxFiles
        }),
        // - Write all logs with level `info` and below to `combined.log`
        new winston.transports.File({
            filename: path.join(config.logging.directory, 'combined.log'),
            maxsize: config.logging.maxFileSize,
            maxFiles: config.logging.maxFiles
        })
    ]
});

// If we're not in production, log to the console with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest })`
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

// Export logger functions
module.exports = {
    logger,
    info: (message, metadata) => logger.info(message, metadata),
    warn: (message, metadata) => logger.warn(message, metadata),
    error: (message, metadata) => logger.error(message, metadata),
    debug: (message, metadata) => logger.debug(message, metadata)
};

// Log that we're using the new logger
logger.info('Logger initialized with Winston', { legacyCompatibility: true });