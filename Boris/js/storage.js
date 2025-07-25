/* Storage management functionality

   This module handles the storage and retrieval of data within the chatting app,
   including user settings, chat history, and contact information.

   For now, it uses a simple array to store data, with some default values.
   The data will be stored in the browser's local storage, allowing for persistence across sessions.

   Contacts and Group chats are identified by a unique ID. This ID is, for now, an arbitrary number set by the user.
   For now, contacts only have a name and an ID. Each contact has a base path (a folder path) for displaying purposes, set by the user.

   Reserved IDs:
   - 0: testing and default purposes. Should never be accessed by the user.
   - 1: "admin" or "system" contact, a special contact meant for system messages, notifications and a safe fallback.
*/

let contacts = [];
let chatHistory = [];
let userSettings = {};

/* Some default values for testing purposes
const defaultContact = {
    id: 0,
    name: "Default Contact",
    basePath: "/",
    isGroup: false, 
    groupMembers: [] // Empty for individual contacts
};
const defaultContact2 = {
    id: 1,
    name: "System Contact",
    basePath: "/System",
    isGroup: false,
    groupMembers: [] // Empty for individual contacts
};
const defaultMessage = {
    id: 0, // Unique within the chat
    senderId: 0,
    content: "message text",
    timestamp: Date.now(),
    type: "text", // or "image", "file", etc.
    status: "sent" // "sent", "delivered", "read"
};
const defaultChat = {
    id: 0, // Id of the contact this chat is with
    messages: [defaultMessage]
};

const defaultUserSettings = {
    theme: "dark",
    language: "en",
    notificationsEnabled: true,
    contactDisplay: "folder", // Can be "folder", by default, or "list", for a more traditional list view
    userID: 0,
};
*/

// Storage management functions
const Storage = {
    // Contact management
    addContact(contact) {
        // (TODO): Validate contact before adding
        contacts.push(contact);
        this.saveToLocalStorage();
    },
    
    getContact(id) {
        return contacts.find(contact => contact.id === id);
    },
    
    getAllContacts() {
        return [...contacts]; // Return copy to prevent direct mutation
    },

    filterContactsByName(name) {
        // (TODO): Implement path-based filtering as well
        return contacts.filter(contact => contact.name.toLowerCase().includes(name.toLowerCase()));
    },
    
    // Chat management
    addMessage(contactId, message) {
        let chat = chatHistory.find(chat => chat.id === contactId);
        if (!chat) {
            chat = { id: contactId, messages: [] };
            chatHistory.push(chat);
        }
        chat.messages.push(message);
        this.saveToLocalStorage();
    },
    
    getChatHistory(contactId) {
        const chat = chatHistory.find(chat => chat.id === contactId);
        return chat ? [...chat.messages] : [];
    },
    
    // Local storage persistence
    saveToLocalStorage() {
        localStorage.setItem('chatApp_contacts', JSON.stringify(contacts));
        localStorage.setItem('chatApp_chatHistory', JSON.stringify(chatHistory));
        localStorage.setItem('chatApp_userSettings', JSON.stringify(userSettings));
    },
    
    loadFromLocalStorage() {
        try {
            const savedContacts = localStorage.getItem('chatApp_contacts');
            const savedHistory = localStorage.getItem('chatApp_chatHistory');
            const savedSettings = localStorage.getItem('chatApp_userSettings');
            
            if (savedContacts) contacts.push(...JSON.parse(savedContacts));
            if (savedHistory) chatHistory.push(...JSON.parse(savedHistory));
            if (savedSettings) Object.assign(userSettings, JSON.parse(savedSettings));
        } catch (error) {
            console.warn('Failed to load from localStorage:', error);
        }
    }
};