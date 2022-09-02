# Dissonance
_A Discord replication site built using Javascript, ReactJS, Ruby on Rails, HTML, and CSS_

## Features

_To be implemented..._

## Technologies, Libraries, and APIs
The core of the website is built using Javascript, ReactJS, HTML, CSS, and Ruby on Rails. NodeJS proxy server was used to implement Aria Bot using Cleverbot API to avoid CORS-related errors that occurred otherwise. React-Virtualized was used to implement virtual scrolling with dynamic cell heights by leveraging CellMeasurer and Autosizer. BCrypt was used for safe encryption, and the program is compiled together via Webpack.

## To-Do

SOON:
- Notifications and Pinging with Action Cable
- Finish Search 
- Aria Bot Notification Glow-up, Implement either Bot or Main Server to help introduce new users 
- Better Seeding

LATER:
- Customizable Roles with different permission accesses and priveleges
- Discover Servers Thing
- Friend Requests
- Emojis
- Invite Users should show list of friends
- Blocking/Kicking/Banning
- Animations (CSS)


## Known Bugs 
- Hover on channel to show Gear icon (forgot how to do this…) 
- Selected Channel highlight not working

- FIX CONVERSATION SWAPPING OTHERUSER 
- Last message doesn't have buttons for pins, edit, 
- Pin message icon missing
- EDIT CHANNEL MESSAGES NO WORK
- Upload images on channel
- Invite Link not working as intended if not logged in
- Dropdown short and dropdown long not reliably accurate (sometimes need refresh) 
- Action cable not working for channels -> Editing, Deleting [Synergy with React-Virtualized]
- PERFORMANCE OPTIMIZAITON (is it a nicknames backend problem? It is really slow to load the 300 page) -> LOADING THING PROBABLY MAKES IT OK
- USERS OPTIMIZATION DOESNT WORK IF THEY LEAVE THE SERVER FOR SEARCH MODAL AND USER MODAL
- Refreshing on conversations still nonfunctional
- Transfer everything necessary between channels and conversations
- Changing nickname refresh... refactor: put nickname in the state. inside the new reducer, have a hash for user_id with nickname/username depending on whether nickname exists
- 
- Refactor: DELETE USER. Should change users into deleted users, should not just wipe the user from memory but make it non-loggable, etc.

* Should automatically log-out if session token has expired

Minor Bugs: 
* Welcome Page not flexible with different screen size resolutions