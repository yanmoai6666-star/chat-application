# Chat Application

A real-time chat application built with Node.js, Express, and Socket.io, featuring a modern web interface and robust backend architecture.

## Features

- ✅ Real-time messaging with Socket.io
- ✅ User authentication and registration
- ✅ Multiple chat rooms
- ✅ Message history
- ✅ Responsive web design
- ✅ Modern logging system with Winston
- ✅ RESTful API
- ✅ Error handling and validation
- ✅ Environment configuration

## Installation

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chat-application
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file with your configuration:
   ```
   PORT=3000
   NODE_ENV=development
   LOG_LEVEL=info
   JWT_SECRET=your-secret-key-here
   ```

4. **Create log directory**
   ```bash
   mkdir logs
   ```

5. **Start the server**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## Usage

### API Endpoints

#### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/me` - Get current user info
- `POST /api/users/logout` - Logout user

#### Chat
- `GET /api/chat/rooms` - Get all chat rooms
- `POST /api/chat/rooms` - Create a new chat room
- `GET /api/chat/rooms/:roomId/messages` - Get messages in a room
- `POST /api/chat/rooms/:roomId/messages` - Send a message to a room

## Project Structure

```
chat-application/
├── src/
│   ├── config/
│   ├── frontend/
│   │   ├── html/
│   │   │   └── index.html         # Main HTML file
│   │   ├── css/
│   │   │   └── style.css          # Main CSS file
│   │   └── js/
│   │       ├── app.js             # Main application logic
│   │       ├── chat.js            # Chat functionality
│   │       └── user.js            # User management
│   ├── backend/
│   │   ├── server.js              # Main server file
│   │   ├── routes/
│   │   │   ├── chat.js            # Chat routes
│   │   │   └── users.js           # User routes
│   │   ├── controllers/
│   │   │   ├── chat.js            # Chat controller
│   │   │   └── users.js           # User controller
│   │   └── middleware/
│   │       ├── auth.js            # Authentication middleware
│   │       └── errorHandler.js    # Error handling middleware
│   └── utils/
│       └── logger.js              # Logger utility (Winston)
├── logs/                          # Log files directory
├── .env                           # Environment variables
├── .env.example                   # Environment variables template
├── package.json                   # Project configuration
├── README.md                      # This file
└── .gitignore                     # Git ignore file
```

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **Socket.io** - Real-time communication
- **Winston** - Logging library
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling
- **Vanilla JavaScript** - Client-side logic

## Logging System

The application uses **Winston** for centralized logging. The legacy log configuration file) is **deprecated** and will be removed in future versions.

### Log Files
- `logs/combined.log` - All log levels
- `logs/error.log` - Error logs only

## Migration Notes

### Logging System Migration
We are currently transitioning from the old logging system to Winston. During this transition:

2. All new code should use the Winston logger from `utils/logger.js`
3. The legacy configuration will be removed in a future update

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Socket.io documentation
- Express.js documentation
- Winston logging library
