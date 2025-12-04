// User management module
class User {
    constructor() {
        this.currentUser = null;
        this.isAuthenticated = false;
    }

    login(username, password) {
        // In a real app, this would authenticate with server
        console.log(`Logging in user: ${username}`);
        this.currentUser = {
            username: username,
            id: Math.random().toString(36).substring(2, 10),
            joinedAt: new Date()
        };
        this.isAuthenticated = true;
        localStorage.setItem('username', username);
        return Promise.resolve(this.currentUser);
    }

    logout() {
        console.log('Logging out user');
        this.currentUser = null;
        this.isAuthenticated = false;
        localStorage.removeItem('username');
        return Promise.resolve();
    }

    getCurrentUser() {
        return this.currentUser;
    }

    updateProfile(profileData) {
        if (!this.isAuthenticated) {
            throw new Error('User not authenticated');
        }
        
        console.log('Updating profile:', profileData);
        this.currentUser = { ...this.currentUser, ...profileData };
        return Promise.resolve(this.currentUser);
    }

    isLoggedIn() {
        return this.isAuthenticated;
    }

    // Simulate fetching user list
    getUserList() {
        return Promise.resolve([
            { username: 'Alice', id: '1', status: 'online' },
            { username: 'Bob', id: '2', status: 'away' },
            { username: 'Charlie', id: '3', status: 'online' },
            { username: 'David', id: '4', status: 'offline' }
        ]);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = User;
}