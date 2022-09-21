# Dissonance
_A Discord replication site built using Javascript, ReactJS, Ruby on Rails, HTML, and CSS_

** This Project Is Under Active Construction!!! Features may be bugged or unimplemented, and are constantly being broken and repaired everyday **

## Features

### Scalable Virtual Scrolling
- Features virtual scrolling, which unpollutes the DOM by rendering and unrendering messages on an as-needed basis
- Preloads 2 messages to simulate smooth, natural scrolling, and makes backend calls to fetch more messages in large, rare intervals instead of receiving all of them at once
- Improved scalability by reducing initial load times of large channels by over 98% according to Chrome profiler

### 


### Complete Discord Functionality 
- CRUD Implementations of Users, Servers, Channels, and Conversations
- Soon to implement customized roles with selectable colors and permissions 

## Technologies, Libraries, and APIs
The core of the website is built using Javascript, ReactJS, HTML, CSS, and Ruby on Rails. NodeJS proxy server was used to implement Aria Bot using Cleverbot API to avoid CORS-related errors that occurred otherwise. React-Virtualized was used to implement virtual scrolling with dynamic cell heights by leveraging CellMeasurer and Autosizer. BCrypt was used for safe encryption, and the program is compiled together via Webpack.

## To-Do

SOON:
- Test all functionalities on Heroku even if it works on Live
- Pinging with Action Cable
- Finish Search 
- Aria Bot Notification Glow-up, Implement either Bot or Main Server to help introduce new users -> Also stop the hardcoded id = 6 thing (heroku)
- Image preview
- Better Seeding
- BETTER READMES (both projects)
- Pinging and Channel Linking

LATER:
- Customizable Roles with different permission accesses and priveleges
- Discover Servers Thing
- Friend Requests
- Emojis
- Invite Users should show list of friends
- Blocking/Kicking/Banning
- Animations (CSS)


## Known Bugs 
- user not allowed to message not workign when swapped into
- messages not updated when same number
- create user has the footer bug still

- Editing messgaes might not be live (Action Cable)
- PERFORMANCE OPTIMIZAITON (is it a nicknames backend problem? It is really slow to load the 300 page) -> LOADING THING PROBABLY MAKES IT OK
- USERS OPTIMIZATION DOESNT WORK IF THEY LEAVE THE SERVER FOR SEARCH MODAL AND USER MODAL
- Minor: Massive space under images?
- Minor?: Notifications sometimes doubles or fails to show up
- When coming from a convo, channel messages might have weird spacing messed up from react-virtuzliaed. try either clear caching everything on load, or force refresh
- Delete server causes glitch when press on other server after
- Transfer everything necessary between channels and conversations
- Changing nickname refresh... refactor: put nickname in the state. inside the new reducer, have a hash for user_id with nickname/username depending on whether nickname exists
- Refactor: DELETE USER. Should change users into deleted users, should not just wipe the user from memory but make it non-loggable, etc.
- Remove the dangerouslySetInnerHTML code. Refactor into somehow not using it (100% doable)
