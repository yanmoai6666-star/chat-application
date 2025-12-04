// Error handling middleware
const logger = require('../../utils/logger');

const errorHandler = (err, req, res, next) => {
    logger.error(`Error: ${err.message}`, { stack: err.stack });
    
    // Default error response
    let statusCode = 500;
    let errorMessage = 'Internal Server Error';
    
    // Handle specific error types
    if (err.name === 'ValidationError') {
        statusCode = 400;
        errorMessage = Object.values(err.errors).map(val => val.message).join(', ');
    } else if (err.name === 'UnauthorizedError') {
        statusCode = 401;
        errorMessage = 'Unauthorized';
    } else if (err.name === 'NotFoundError') {
        statusCode = 404;
        errorMessage = 'Resource not found';
    } else if (err.name === 'ConflictError') {
        statusCode = 409;
        errorMessage = 'Conflict detected';
    }
    
    // Send response
    res.status(statusCode).json({
        error: errorMessage,
        // Include stack trace in development
        ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {})
    });
};

module.exports = errorHandler;