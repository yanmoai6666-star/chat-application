// Chat routes
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat');

// Get all messages in a room
router.get('/rooms/:roomId/messages', chatController.getMessages);

// Send a message to a room
router.post('/rooms/:roomId/messages', chatController.sendMessage);

// Get all available rooms
router.get('/rooms', chatController.getRooms);

// Create a new room
router.post('/rooms', chatController.createRoom);

// Join a room
router.post('/rooms/:roomId/join', chatController.joinRoom);

// Leave a room
router.post('/rooms/:roomId/leave', chatController.leaveRoom);

module.exports = router;