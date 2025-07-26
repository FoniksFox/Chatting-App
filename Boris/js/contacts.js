/* Contact management functionality

   This module handles the management of contacts within the chatting app.
   It interacts with the storage module to retrieve and store contact information.
*/

const Contacts = {
	addContact(contact) {
		Storage.addContact(contact);
		Contacts.updateContactList();
	},

	updateContactList(contactList = Storage.getAllContacts()) {
		const contactListElement = document.getElementById("contacts-list");
		contactListElement.innerHTML = ""; // Clear existing contacts
		let contactsTree = [];
		contactList.forEach(contact => {
			if (contact.basePath !== '/' && contact.basePath) {
				const pathParts = contact.basePath.split('/');
				let currentLevel = contactsTree;
				pathParts.forEach(part => {
				if (part) {
					let folder = currentLevel.find(f => f.name === part);
					if (!folder) {
						folder = { name: part, contacts: [] };
						currentLevel.push(folder);
					}
					currentLevel = folder.contacts;
				}
				});
				currentLevel.push(contact);
			} else {
				contactsTree.push(contact);
			}
		});
		Contacts.renderContacts(contactsTree);
	},

	renderContacts(contactsTree, parentElement = document.getElementById("contacts-list")) {
		contactsTree.forEach(contact => {
			if (contact.contacts && contact.contacts.length > 0) {
				const folder = contact;
				const folderElement = document.createElement("div");
				folderElement.classList.add("contact-folder");
				folderElement.innerHTML = `<p>${folder.name}</p>`;
				const subList = document.createElement("ul");
				subList.classList.add("foldered-contacts");
				Contacts.renderContacts(contact.contacts, subList);
				folderElement.appendChild(subList);
				parentElement.appendChild(folderElement);
			} else {
				const contactElement = document.createElement("li");
				contactElement.classList.add("contact", "hover-effect");
				contactElement.textContent = contact.name;
				contactElement.dataset.id = contact.id;
				parentElement.appendChild(contactElement);
			}
		});
	},

	filterContacts(query) {
		const contacts = Storage.filterContactsByName(query);
		Contacts.updateContactList(contacts);
	}
}