/* Storage management functionality

   This module handles the storage and retrieval of data within the chatting app,
   including user settings, chat history, and contact information.

   For now, it uses a simple array to store data, with some default values.
   The data will be stored in the browser's local storage, allowing for persistence across sessions.

   this.contacts and Group chats are identified by a unique ID. This ID is, for now, an arbitrary number set by the user.
   For now, this.contacts only have a name and an ID. Each contact has a base path (a folder path) for displaying purposes, set by the user.

   Reserved IDs:
   - 0: testing and default purposes. Should never be accessed by the user.
   - 1: "admin" or "system" contact, a special contact meant for system messages, notifications and a safe fallback.
*/
/* Some default values for testing purposes
const defaultContact = {
    id: 0,
    name: "Default Contact",
    basePath: "/",
    isGroup: false, 
    groupMembers: [] // Empty for individual this.contacts
};
const defaultContact2 = {
    id: 1,
    name: "System Contact",
    basePath: "/System",
    isGroup: false,
    groupMembers: [] // Empty for individual this.contacts
};
const defaultMessage = {
    id: 0, // Unique within the chat
    senderID: 0,
    content: "message text",
    timestamp: Date.now(),
    type: "text", // or "image", "file", etc.
    status: "notDelivered" // "notDelivered", "delivered", "read"
};
const defaultChat = {
    id: 0, // ID of the contact this chat is with
    messages: [defaultMessage]
};

const defaultthis.userSettings = {
    theme: "dark",
    language: "en",
    notificationsEnabled: true,
    contactDisplay: "folder", // Can be "folder", by default, or "list", for a more traditional list view
    userID: 0,
};
*/

// Storage management functions
const Storage = {
	contacts: [],
	chatHistory: [],
	userSettings: {},
	// User settings
	getUserID() {
		return this.userSettings.userID || 0; // Default to 0 for testing purposes
	},

    // Contact management
    addContact(contact) {
        // (TODO): Validate contact before adding
        this.contacts.push(contact);
        this.saveToLocalStorage();
    },
    
    getContact(id) {
        return this.contacts.find(contact => contact.id === id);
    },

    getAllContacts() {
        return [...this.contacts]; // Return copy to prevent direct mutation
    },

    filterContactsByName(name) {
        // (TODO): Implement path-based filtering as well
        return this.contacts.filter(contact => contact.name.toLowerCase().includes(name.toLowerCase()));
    },
    
    // Chat management
    addMessage(contactID, message) {
        let chat = this.chatHistory.find(chat => chat.id === String(contactID));
        if (!chat) {
            chat = { id: String(contactID), messages: [] };
            this.chatHistory.push(chat);
        }
        chat.messages.push(message);
        this.saveToLocalStorage();
    },

    getChatHistory(contactID) {
        const chat = this.chatHistory.find(chat => chat.id === contactID);
        return chat ? [...chat.messages] : [];
    },
    
    // Local storage persistence
    saveToLocalStorage() {
        localStorage.setItem('chatApp_contacts', JSON.stringify(this.contacts));
        localStorage.setItem('chatApp_chatHistory', JSON.stringify(this.chatHistory));
        localStorage.setItem('chatApp_userSettings', JSON.stringify(this.userSettings));
    },
    
    loadFromLocalStorage() {
        try {
            const savedContacts = localStorage.getItem('chatApp_contacts');
            const savedHistory = localStorage.getItem('chatApp_chatHistory');
            const savedSettings = localStorage.getItem('chatApp_userSettings');

            if (savedContacts) this.contacts.push(...JSON.parse(savedContacts));
            if (savedHistory) this.chatHistory.push(...JSON.parse(savedHistory));
            if (savedSettings) Object.assign(this.userSettings, JSON.parse(savedSettings));
        } catch (error) {
            console.warn('Failed to load from localStorage:', error);
        }
    }
};