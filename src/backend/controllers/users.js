// User controller
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const logger = require('../../utils/logger');
const config = require('../../config/config');

// Mock data
let users = [
    { id: '1', username: 'admin', password: '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW', email: 'admin@example.com' }
];

let activeSessions = [];

// Register a new user
const register = async (req, res) => {
    const { username, password, email } = req.body;
    
    // Check if user exists
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ error: 'Username already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(config.security.bcryptRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const user = {
        id: Date.now().toString(),
        username,
        password: hashedPassword,
        email,
        createdAt: new Date().toISOString()
    };
    
    users.push(user);
    logger.info(`New user registered: ${username}`);
    
    res.status(201).json({ message: 'User registered successfully' });
};

// Login user
const login = async (req, res) => {
    const { username, password } = req.body;
    
    // Check if user exists
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign({ id: user.id, username: user.username }, config.security.secretKey, { expiresIn: config.security.jwtExpiration });
    
    // Save session
    activeSessions.push({ userId: user.id, token });
    
    logger.info(`User logged in: ${username}`);
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
};

// Get current user
const getCurrentUser = (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    const { password, ...userWithoutPassword } = user;
    logger.info(`Retrieved current user: ${user.username}`);
    res.json({ user: userWithoutPassword });
};

// Update user profile
const updateProfile = async (req, res) => {
    const { email } = req.body;
    const userId = req.user.id;
    
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    user.email = email;
    logger.info(`Updated profile for user: ${user.username}`);
    
    const { password, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
};

// Get user list
const getUserList = (req, res) => {
    const userList = users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
    
    logger.info(`Retrieved user list (${userList.length} users)`);
    res.json({ users: userList });
};

// Logout user
const logout = (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (token) {
        activeSessions = activeSessions.filter(session => session.token !== token);
    }
    
    logger.info(`User logged out: ${req.user.username}`);
    res.json({ message: 'Logged out successfully' });
};

module.exports = {
    register,
    login,
    getCurrentUser,
    updateProfile,
    getUserList,
    logout
};