// Main server file
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const cors = require('cors');

// Import routes and middleware
const chatRoutes = require('./routes/chat');
const userRoutes = require('./routes/users');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

// Import logger and configuration
const logger = require('../utils/logger');
const config = require('../config/config');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, config.socket);

// Middleware
app.use(cors({ origin: config.security.corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/static', express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/api/chat', authMiddleware, chatRoutes);
app.use('/api/users', userRoutes);

// Default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/html/index.html'));
});

// Error handling middleware
app.use(errorHandler);

// Socket.io configuration
io.on('connection', (socket) => {
    logger.info(`New client connected: ${socket.id}`);
    
    // Chat events
    socket.on('joinRoom', (room) => {
        socket.join(room);
        logger.info(`User joined room: ${room}`);
    });
    
    socket.on('chatMessage', (data) => {
        io.to(data.room).emit('message', data);
        logger.info(`Message in ${data.room}: ${data.content}`);
    });
    
    socket.on('disconnect', () => {
        logger.info(`Client disconnected: ${socket.id}`);
    });
});

// Server configuration
const PORT = config.app.port;

server.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
    logger.info(`Frontend available at ${config.app.baseUrl}`);
    logger.info(`API available at ${config.app.baseUrl}/api`);
});

module.exports = app;