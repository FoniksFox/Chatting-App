/* Chat functionality

   This module handles the chat interface and message sending/receiving within the chatting app.
   It interacts with the storage module to retrieve and store chat messages and contact information.
*/

/* Example receiveMessage usage (for testing purposes until messaging is implemented):
Chat.receiveMessage({
	id: Date.now(),
	senderID: 1,
	content: "Hello from the other side!",
	timestamp: Date.now(),
	type: "text",
	status: "delivered"
});
*/

const Chat = {
	openChat(contactID) {
		const contact = Storage.getContact(contactID);
		if (!contact) { // Should never happen on normal operation
			alert("Contact not found.");
			return;
		}

		const chatPartnerHeaderName = document.getElementById("chat-partner-name");
		chatPartnerHeaderName.textContent = contact.name;
		chatPartnerHeaderName.dataset.contactID = contactID;

		this.loadMessages();
	},

	loadMessages(contactID = document.getElementById("chat-partner-name").dataset.contactID) {
		const messages = Storage.getChatHistory(String(contactID));
		const chatMessagesContainer = document.getElementById("chat-messages");
		chatMessagesContainer.innerHTML = ""; // Clear existing messages

		messages.forEach(message => {
			// (TODO) Add distinction for different days
			// (TODO) Add a limit to the number of messages loaded
			this.addMessage(message);
		});

		const chatContent = document.getElementById("chat-content");
		setTimeout(() => { // Use setTimeout to ensure DOM is updated
			chatContent.scrollTop = chatContent.scrollHeight;
		}, 0);
	},

	addMessage(message) {
		const chatMessagesContainer = document.getElementById("chat-messages");
		const chatContent = document.getElementById("chat-content");
		const isNearBottom = chatContent.scrollTop + chatContent.clientHeight >= chatContent.scrollHeight - 50; // 50px threshold
		
		const messageElement = document.createElement("li");
		if (message.senderID === Storage.getUserID()) {
			messageElement.classList.add("message", "sent", message.status);
		} else {
			messageElement.classList.add("message", "received");
		}
		messageElement.textContent = message.content;
		messageElement.dataset.id = message.id;
		const messageTimestamp = document.createElement("span");
		messageTimestamp.classList.add("timestamp");
		messageTimestamp.textContent = new Date(message.timestamp).toLocaleTimeString();
		messageElement.appendChild(messageTimestamp);

		chatMessagesContainer.appendChild(messageElement);
		
		if (isNearBottom || message.senderID === Storage.getUserID()) {
			chatContent.scrollTop = chatContent.scrollHeight;
		}
	},

	sendMessage(content, contactID = document.getElementById("chat-partner-name").dataset.contactID) {
		if (!content.trim()) {
			return; // Do not send empty messages
		}

		const message = {
			id: Date.now(), // Unique ID based on timestamp
			senderID: Storage.getUserID(),
			content: content,
			timestamp: Date.now(),
			type: "text",
			status: "notDelivered"
		};

		Storage.addMessage(contactID, message);
		this.addMessage(message);
	},

	receiveMessage(message) {
		Storage.addMessage(message.senderID, message);
		if (document.getElementById("chat-partner-name").dataset.contactID === message.senderID.toString()) {
			this.addMessage(message);
		}
	}
}