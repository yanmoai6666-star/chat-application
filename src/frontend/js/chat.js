// Chat functionality module
class Chat {
    constructor() {
        this.messages = [];
        this.currentRoom = 'general';
    }

    loadMessages() {
        // In a real app, this would fetch messages from server
        console.log('Loading messages...');
        return Promise.resolve([]);
    }

    saveMessage(message) {
        this.messages.push(message);
        // In a real app, this would save to server
        console.log('Message saved:', message);
    }

    switchRoom(roomName) {
        this.currentRoom = roomName;
        console.log(`Switched to room: ${roomName}`);
        // In a real app, this would load messages for the new room
    }

    getMessages() {
        return this.messages;
    }

    clearMessages() {
        this.messages = [];
        console.log('Messages cleared');
    }

    searchMessages(query) {
        return this.messages.filter(message => 
            message.content.toLowerCase().includes(query.toLowerCase())
        );
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Chat;
}