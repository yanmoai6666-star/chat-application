// Authentication middleware
const jwt = require('jsonwebtoken');
const logger = require('../../utils/logger');
const config = require('../../config/config');

// Mock users data
const users = [
    { id: '1', username: 'admin' }
];

const authMiddleware = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            logger.warn('No token provided');
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }
        
        const decoded = jwt.verify(token, config.security.secretKey);
        const user = users.find(u => u.id === decoded.id);
        
        if (!user) {
            logger.warn('Invalid token - user not found');
            return res.status(401).json({ error: 'Access denied. Invalid token.' });
        }
        
        req.user = user;
        next();
    } catch (error) {
        logger.error(`Authentication error: ${error.message}`);
        res.status(401).json({ error: 'Access denied. Invalid token.' });
    }
};

module.exports = authMiddleware;