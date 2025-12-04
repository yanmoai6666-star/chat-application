// User routes
const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const authMiddleware = require('../middleware/auth');

// Register a new user
router.post('/register', userController.register);

// Login user
router.post('/login', userController.login);

// Get current user
router.get('/me', authMiddleware, userController.getCurrentUser);

// Update user profile
router.put('/me', authMiddleware, userController.updateProfile);

// Get user list
router.get('/list', authMiddleware, userController.getUserList);

// Logout user
router.post('/logout', authMiddleware, userController.logout);

module.exports = router;