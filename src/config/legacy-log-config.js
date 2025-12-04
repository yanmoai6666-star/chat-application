// Legacy log configuration file - NO LONGER USED
// This file contains outdated logging configuration that has been replaced
// by the new centralized logging system (Winston)

const path = require('path');

// Hardcoded log paths (outdated)
const LOG_PATHS = {
    APP: path.join(__dirname, '../../logs/app.log'),
    ERROR: path.join(__dirname, '../../logs/error.log'),
    ACCESS: path.join(__dirname, '../../logs/access.log'),
    DEBUG: path.join(__dirname, '../../logs/debug.log')
};

// Old formatting settings
const LOG_FORMATS = {
    CONSOLE: '[%date%] [%level%] %message%',
    FILE: '[%date%] [%level%] [%user%] %message%',
    JSON: JSON.stringify({
        timestamp: '%date%',
        level: '%level%',
        message: '%message%',
        metadata: '%metadata%'
    })
};

// Log levels (deprecated)
const LOG_LEVELS = {
    DEBUG: 0,
    INFO: 1,
    WARNING: 2,
    ERROR: 3,
    FATAL: 4
};

// Rotation settings (obsolete)
const ROTATION_SETTINGS = {
    MAX_FILE_SIZE: '10MB',
    MAX_FILES: 5,
    COMPRESS: true
};

// Export the old configuration
module.exports = {
    LOG_PATHS,
    LOG_FORMATS,
    LOG_LEVELS,
    ROTATION_SETTINGS,
    // This is a legacy export that might still be referenced in old code
    DEFAULT_CONFIG: {
        level: 'INFO',
        format: LOG_FORMATS.FILE,
        path: LOG_PATHS.APP
    }
};

console.warn('WARNING: legacy-log-config.js is deprecated and will be removed. Use the new logging system instead.');