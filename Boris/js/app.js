/* Main application logic

	This module serves as the entry point for the chatting app.
	It initializes the app, sets up event listeners, and manages the overall application state.
*/

// Initialize the app on load & Set up event listeners for UI elements
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
		const contactBasePath = prompt("Enter contact base path (optional):", "/");
		if (!contactID) {
			alert("Contact ID is required.");
			return;
		} else if (!contactName) {
			alert("Contact name is required.");
			return;
		} else {
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
			// (TODO): Handle opening chat with the selected contact
			console.log(`Opening chat with contact ID: ${contactId}`);
		} else {
			const folderElement = event.target.closest(".contact-folder");
			if (folderElement) {
				folderElement.classList.toggle("expanded");
			}
		}
	});
});