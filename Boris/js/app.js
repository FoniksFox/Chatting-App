/* Main application logic

	This module serves as the entry point for the chatting app.
	It initializes the app, sets up event listeners, and manages the overall application state.
*/

document.addEventListener("DOMContentLoaded", () => {
	Storage.loadFromLocalStorage();
	Contacts.updateContactList();

	const searchInput = document.getElementById("search-input");
	searchInput.addEventListener("input", (event) => {
		const query = event.target.value.toLowerCase();
		Contacts.filterContacts(query);
	});

	const addContactButton = document.getElementById("new-chat-button");
	addContactButton.addEventListener("click", () => {
		const contactID = prompt("Enter contact ID:");
		const contactName = prompt("Enter contact name:");
		let contactBasePath = prompt("Enter contact base path (optional):", "/");
		if (!contactID) {
			alert("Contact ID is required.");
			return;
		} else if (!contactName) {
			alert("Contact name is required.");
			return;
		} else {
			if (contactBasePath[0] !== '/') {
				contactBasePath = '/' + contactBasePath; // Ensure base path starts with '/'
			}
			const contact = {
				id: contactID,
				name: contactName,
				basePath: contactBasePath
			};
			Contacts.addContact(contact);
			alert(`Contact ${contactName} added successfully.`);
		}
	});

	const contactsListElement = document.getElementById("contacts-list");
	contactsListElement.addEventListener("click", (event) => {
		const contactElement = event.target.closest(".contact");
		if (contactElement) {
			const contactId = contactElement.dataset.id;
			Chat.openChat(contactId);
			// (TODO) Highlight the selected contact
			//console.log(`Opening chat with contact ID: ${contactId}`);
		} else {
			const folderElement = event.target.closest(".contact-folder");
			if (folderElement) {
				folderElement.classList.toggle("expanded");
			}
		}
	});

	const chatForm = document.getElementById("message-form");
	const chatInput = document.getElementById('chat-input');
	
	/* Auto-resize chat input field fallback for older browsers that do not support CSS 'field-sizing'
	Takes more vertical space, because of the default textarea height of 48px, but it works */
	const resizeChatInput = () => {
		// Only resize if browser doesn't support field-sizing, fallback for older browsers. Otherwise, the CSS will handle it
		const supportsFieldSizing = CSS.supports('field-sizing', 'content');
		if (!supportsFieldSizing) {
			chatInput.style.height = 'auto';
			const newHeight = Math.max(chatInput.scrollHeight, 32); // 2rem minimum to match CSS
			chatInput.style.height = Math.min(newHeight, 128) + 'px'; // 8rem max
		}
	};
	const submitMessage = (event) => {
		event.preventDefault();
		const messageInput = document.getElementById("chat-input");
		const messageContent = messageInput.value.trim();
		if (messageContent) {
			Chat.sendMessage(messageContent);
			messageInput.value = ""; // Clear input after sending
			resizeChatInput();
		}
	};
	chatForm.addEventListener("submit", submitMessage);
	chatForm.addEventListener("keydown", (event) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			submitMessage(event);
		}
	});
	chatInput.addEventListener('input', resizeChatInput);
});