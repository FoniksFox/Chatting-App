# Boris's Chatting App Implementation

## My Approach

This is my personal implementation of the chatting application project. I'll be focusing on creating a clean, intuitive interface with smooth user experience. The messages will be directly sent from browser to browser, without any backend intervention, laying the grounds for a later enforcement of cibersecurity.

## Design Philosophy

- **Minimalist UI**: Clean and simple interface that focuses on the conversation
- **User-Friendly**: Intuitive interactions and clear visual feedback
- **Performance**: Efficient DOM manipulation and optimized local storage usage
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Direct messaging:** Messages are directly sent from browser to browser
- **Mobile and Desktop:** Aim to work on both platforms

## Technical Approach

### Architecture

- Modular JavaScript structure with separate files for different concerns
- Progressive enhancement for better compatibility

### Key Features I'll Implement

#### Core Features

- [X] Clean chat interface
- [X] Contacts "folder-like" browsing
- [X] Real-time message input with enter key support
- [X] Message timestamps
- [X] Local storage for chat history and contacts
- [ ] Responsive layout for mobile usage
- [ ] New messages indicator
- [ ] Peer-to-peer messaging (with webRTC)

#### Advanced Features (If time permits)

- [ ] Dark/light theme toggle + Accent color selector
- [ ] Message editing (double-click to edit)
- [ ] Message deletion
- [ ] Basic emoji picker
- [ ] Chat export functionality
- [ ] Typing indicators simulation
- [ ] Sound notifications
- [ ] Markdown style text editor, with right-click options (using external libraries)
- [ ] Enhanced security and privacy
- [ ] Drag & Drop in contacts folders

## Project Structure

```
Boris/
├── index.html          # Main HTML structure
├── css/
│   ├── styles.css      # Main stylesheet
│   ├── themes.css      # Theme variables
│   └── responsive.css  # Media queries
├── js/
│   ├── app.js          # Main application logic
│   ├── chat.js         # Chat functionality
│   ├── contacts.js     # Contacts functionality
│   ├── storage.js      # Local storage management
│   └── utils.js        # Utility functions
├── assets/
│   ├── docs/           # Documentation images (wireframes, etc.)
│   ├── icons/          # Custom icons
│   └── sounds/         # Notification sounds
└── README.md           # This file
```

## Design Decisions

### Wireframe

![Chat App Wireframe](assets/docs/wireframe.png)

*Initial wireframe showing the basic layout, mobile layout would consist on two separate sections based on the desktop version: a contacts section and a messaging section.*

*Might consider adding a tabs top menu, like a browser or file explorer, for the messaging section. Might as well consider adding a quick-switch action to toggle, in the contacts section, between a folders view and a more traditional "recents" view, or maybe even a bookmarks view.*

### Color Scheme

- Accent: Set to a shade of blue for now, but the intentios is to later let the user pick it (or use the browser's accent color)
- Message bubbles: Differentiated colors for sent/received
- Emphasis on readability and eye comfort

### Typography

- System fonts are prefered, with safe fallbacks
- Proper font weights for hierarchy
- Optimal font sizes for readability

### Layout

- Two-panels
  - Contacts panel
    - Header with app name and action buttons
    - Search bar for filtering contacts
    - Contacts list with a folder view
  - Chatting panel
    - Header with contact name and options button
    - Chat area, where all the messages are displayed
    - Input bar at the bottom
- Scrollable message and contacts areas
- Responsive design for mobile devices *to be added*

### HTML Structure

The app uses semantic HTML5 elements to create an accessible and well-structured foundation:

- **Two-panel layout**: `<main>` contains two `<section>` elements (contacts and chat) representing distinct functional areas
- **Heading hierarchy**: `<h1>` for app title, `<h2>` for chat partner name, `<h3>` for "landmarks" in the chat (maybe for different days, to be decided)
- **Semantic lists**: `<ul>` for contacts, `<ol>` for chat messages (chronological order)
- **Navigation elements**: `<nav>` wraps action buttons for better accessibility
- **Form semantics**: Message input uses proper `<form>`, `<label>`, and form controls
- **Contacts list:** Each contact is a `<li>`, while each folder is a `<div>` with a `<p>` element for it's name and a `<ul>` element for the contacts within the group.
- **Messages:** Each message is a `<li>` with a variety of classes that comunicates information to be displayed by the UI, and a data-id so that each message is identifiable within the list.

This structure prioritizes semantic meaning, making the app more accessible and maintainable.

### CSS Structure

The app aims to use the best css practices possible, and for that the following structure emerges:

- **Styles:** Contains the global variables, configurations, the layout of the "main" component, default styles for elements and utility classes.
- **Themes:** Contains the css in charge of all the colors and a light and dark color scheme. It is planned to add support for system colors in the future, for a more native appearance.
- **Responsive:** Will contain the css in charge of making the app responsive, especially on the screen width. It is supposed - in the future - to change from the two-panel layout to a single-panel layout when the screen is too narrow.
- **Chat and Contacts:** Separate css files each meant to handle it's panel.

This structure ensures a clear hierarchy and order.

### JS Structure

The JS files are separated according to their concerns, following this structure:

- Storage: Responsible for the save and retrieval of all the stored data. It uses local storage, since the app aims to not have a backend and be peer-to-peer.
- App: Responsible for all the interactions within the UI. Uses event handlers and redirects all interactions to the corresponding function. This way, it acts as the entry point of all interactions, but it shouldn't do any of the logic.
- Contacts: Handles the contact list, mainly the rendering and the addition of contacts. Calls to storage for changes and retrieval of contacts.
- Chat: Handles the chat rendering and logic (sending, recieving and auto-scrolling). Calls to storage for chat-history.
- Utils: In case there is a need for a function available everywhere

With this structure, each script has only one responsibility and concern. It is yet to be decided whether the peer-to-peer logic will go into the chat file, or in a separate file.

## Learning Goals

- Master CSS Grid and Flexbox for complex layouts
- Implement efficient local storage patterns
- Practice modern JavaScript ES6+ features
- Improve accessibility and semantic HTML skills
- Explore CSS animations and transitions

## Notes and Reflections

**July 21, 2025 - Semantic HTML Foundation**
Completed the initial HTML structure with a focus on semantic elements and accessibility. The two-panel layout uses sections to clearly separate contacts and chat functionality. This foundation will make CSS styling and JavaScript interactions much cleaner to implement, as well as identify the areas that still need work.

**July 23, 2025 - CSS Foundation**
Established the CSS structure with a separation of concerns between the files, to make the project as easy as possible to maintain, while being easily customizable. The top-level layout is complete, just lacking in the more complex areas, meaning the *contacts list* and the *chat content*.

**July 25, 2025 - JS Storage and Contacts functionalities**
Set the structure for all the memory-related components, so that no incompatibility arises in the future. Established different JS files to separate responsibilities. This way, the app becomes pretty modular and way easier to debug. Added contacts management as well, with contacts folders (a key difference between this app and others). There are multiple possible improvements on these systems, but they work for now, so there's no need to hurry and change them prematurely.

**July 26, 2025 - JS Chat functionality**
Made the chat functionality, both the UI and storage logics. Focused on a seamles UX for this section, since it is the one where the users will spend most of the tyme in. There are still many enhancements left to do for a truly good expierence, but the base has been set, ant it is just a matter of adding functions.
Due to time constraints, the peer-to-peer messaging will be impossible to add, so I will plan an architecture and leave it at that, maybe recover the project some other time.

*This section will be updated throughout the development process with insights, challenges, and solutions discovered during implementation.*

---

**Started:** July 18, 2025
**Developer:** Boris
**Project:** Weekly-Projects Chatting App
