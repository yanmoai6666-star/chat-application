// Main application configuration file
// This file contains all centralized configuration settings for the application

require('dotenv').config();
const path = require('path');

// Application settings
const appConfig = {
    name: process.env.APP_NAME || 'Chat Application',
    version: '1.0.0',
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    secretKey: process.env.JWT_SECRET || 'your-secret-key-here',
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
};

// Database configuration
const databaseConfig = {
    // For future database implementation
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'chat_application',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
};

// Logging configuration
const loggingConfig = {
    level: process.env.LOG_LEVEL || 'info',
    directory: path.join(__dirname, '../../logs'),
    maxFileSize: process.env.LOG_MAX_SIZE || '20m',
    maxFiles: process.env.LOG_MAX_FILES || '14d',
    format: process.env.LOG_FORMAT || 'json'
};

// Security configuration
const securityConfig = {
    jwtExpiration: process.env.JWT_EXPIRATION || '24h',
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 10,
    corsOrigin: process.env.CORS_ORIGIN || '*',
    rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    }
};

// Socket.IO configuration
const socketConfig = {
    path: '/socket.io',
    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST']
    }
};

// Export all configurations
module.exports = {
    app: appConfig,
    database: databaseConfig,
    logging: loggingConfig,
    security: securityConfig,
    socket: socketConfig
};
