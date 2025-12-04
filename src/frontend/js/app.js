// Main application logic
class ChatApp {
    constructor() {
        this.socket = null;
        this.username = localStorage.getItem('username') || 'Guest';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateUsernameDisplay();
        this.connectToServer();
    }

    setupEventListeners() {
        // Logout button event
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.logout();
        });

        // Message input event
        document.getElementById('message-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Send button event
        document.getElementById('send-btn').addEventListener('click', () => {
            this.sendMessage();
        });
    }

    updateUsernameDisplay() {
        document.getElementById('username').textContent = this.username;
    }

    connectToServer() {
        // In a real app, this would connect to the WebSocket server
        console.log('Connecting to chat server...');
        // Simulate connection
        setTimeout(() => {
            console.log('Connected to chat server');
            this.addSystemMessage('Connected to chat server');
        }, 500);
    }

    sendMessage() {
        const input = document.getElementById('message-input');
        const message = input.value.trim();
        
        if (message) {
            // In a real app, this would send via WebSocket
            console.log(`Sending message: ${message}`);
            this.addMessage(message, this.username, 'user');
            input.value = '';
            
            // Simulate receiving a response
            setTimeout(() => {
                this.addMessage('This is a simulated response', 'Server', 'other');
            }, 1000);
        }
    }

    addMessage(content, sender, type) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        const messageInfo = document.createElement('div');
        messageInfo.className = 'message-info';
        messageInfo.textContent = `${sender} - ${new Date().toLocaleTimeString()}`;
        
        const messageContent = document.createElement('div');
        messageContent.textContent = content;
        
        messageDiv.appendChild(messageInfo);
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    addSystemMessage(content) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message system';
        messageDiv.style.textAlign = 'center';
        messageDiv.style.backgroundColor = '#e9ecef';
        messageDiv.style.color = '#6c757d';
        messageDiv.style.fontStyle = 'italic';
        messageDiv.style.maxWidth = '100%';
        messageDiv.textContent = content;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    logout() {
        localStorage.removeItem('username');
        this.username = 'Guest';
        this.updateUsernameDisplay();
        this.addSystemMessage('Logged out');
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChatApp();
});