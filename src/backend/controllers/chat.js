// Chat controller
const logger = require('../../utils/logger');

// Mock data
let rooms = [
    { id: '1', name: 'general', description: 'General chat room' },
    { id: '2', name: 'tech', description: 'Technology discussions' },
    { id: '3', name: 'random', description: 'Random topics' }
];

let messages = [];

// Get all messages in a room
const getMessages = (req, res) => {
    const { roomId } = req.params;
    const roomMessages = messages.filter(msg => msg.roomId === roomId);
    logger.info(`Retrieved ${roomMessages.length} messages for room ${roomId}`);
    res.json({ messages: roomMessages });
};

// Send a message to a room
const sendMessage = (req, res) => {
    const { roomId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;
    const username = req.user.username;
    
    const message = {
        id: Date.now().toString(),
        content,
        userId,
        username,
        roomId,
        timestamp: new Date().toISOString()
    };
    
    messages.push(message);
    logger.info(`Message sent to room ${roomId} by user ${username}`);
    res.status(201).json({ message });
};

// Get all available rooms
const getRooms = (req, res) => {
    logger.info('Retrieved all rooms');
    res.json({ rooms });
};

// Create a new room
const createRoom = (req, res) => {
    const { name, description } = req.body;
    
    const room = {
        id: Date.now().toString(),
        name,
        description
    };
    
    rooms.push(room);
    logger.info(`Created new room: ${name}`);
    res.status(201).json({ room });
};

// Join a room
const joinRoom = (req, res) => {
    const { roomId } = req.params;
    const userId = req.user.id;
    const username = req.user.username;
    
    // In a real app, this would update a database
    logger.info(`User ${username} joined room ${roomId}`);
    res.json({ message: `Joined room ${roomId}` });
};

// Leave a room
const leaveRoom = (req, res) => {
    const { roomId } = req.params;
    const userId = req.user.id;
    const username = req.user.username;
    
    // In a real app, this would update a database
    logger.info(`User ${username} left room ${roomId}`);
    res.json({ message: `Left room ${roomId}` });
};

module.exports = {
    getMessages,
    sendMessage,
    getRooms,
    createRoom,
    joinRoom,
    leaveRoom
};