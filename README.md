# Dissonance
_A Discord replication site built using Javascript, ReactJS, Ruby on Rails, HTML, and CSS_

Live: https://dissonance.herokuapp.com/

## Features

### Scalable Virtual Scrolling
- Features virtual scrolling, which unpollutes the DOM by rendering and unrendering messages on an as-needed basis
- Preloads 2 messages to simulate smooth, natural scrolling, and makes backend calls to fetch more messages in large, rare intervals instead of receiving all of them at once
- Improved scalability by reducing initial load times of large channels by over 98% according to Chrome profiler

![](https://github.com/ForgoneReality/gif_dump/blob/master/Dissonance%20-%2020%20September%202022%20(2).gif)

### Instant Messaging and Notifications
- Real-time messaging and notifications via ActionCable
- Sending, editing, and deleting messages will be seen by all users simultaneously
- Does not create redundant notifications if the user happens to have the conversation already open

![](https://github.com/ForgoneReality/gif_dump/blob/master/Dissonance%20-%2020%20September%202022.gif)

### Chat Bots
- Multiple chat bots implemented to increase user retention in the empty 
- Aria Bot which simulates a real-person and engages in converations with users
- Dino Bot which helps new users navigate themselves through the app
- Created a Node.js proxy server to bypass CORS-related restrictions for a particular bot API

![](https://github.com/ForgoneReality/gif_dump/blob/master/Dissonance%20-%2020%20September%202022%20(3).gif)


### Complex Search Engine
- Search engine that supports multiple tags such as channel location, author, and message contents
- Support combining multiple tags in any order through regular expression manipulation

![](https://github.com/ForgoneReality/gif_dump/blob/master/video-convert-1663735240395%20(1)%20(1).gif)

```javascript
  handleSubmit()
  {
    let msg = this.state.searchmsg;
    //below is non-optimal code which I wouldn't have done on a coding challenge but more than suffices for the purpose of the project
    const re1 = / ?from:.+#[0-9]{4} ?/g; //from:blah#1234
    const re2 = / ?in:[A-Za-z0-9_-]+ ?/g; //in:general
    const re3 = / ?has:[A-Za-z]+ ?/g; //has:image
    const re4 = / ?pinned: ?/g; //pinned:

    let user = "";
    let channel = "";
    let has_image = false;
    let has_link = false;
    let pinned = false;

    let ans = re1.exec(msg);
    if(ans)
    {
      msg = msg.split(ans[0]).join("");
      user = ans[0].trim().slice(5);
    }

    let ans2 = re2.exec(msg);
    if(ans2)
    {
      msg = msg.split(ans2[0]).join("");
      channel = ans2[0].trim().slice(3);

    }
    
    let ans3 = re3.exec(msg);
    if(ans3)
    {
      let a = ans3[0].trim().slice(4).toLowerCase();

      if(a === "image")
      {
        msg = msg.split(ans3[0]).join("")
        has_image = true;
      }
      else if (a === "link")
      {
        msg = msg.split(ans3[0]).join("")
        has_link = true;
      }
    }
    
    let ans4 = re4.exec(msg);
    if(ans4)
    {
      msg = msg.split(ans4[0]).join("");
      pinned = true;
    }
  this.props.displayModal("search-message", {msg: msg, channel: channel, has_image: has_image, has_link: has_link, pinned: pinned, user: user})
  this.setState({searchlisting: 0});
  }
```

### Complete Discord Functionality 
- CRUD Implementations of Users, Servers, Channels, and Conversations
- Soon to implement customized roles with selectable colors and permissions 

## Technologies, Libraries, and APIs
The core of the website is built using **Javascript, ReactJS, HTML, CSS, and Ruby on Rails. NodeJS** proxy server was used to implement Aria Bot using Cleverbot API to avoid CORS-related errors that occurred otherwise. **React-Virtualized** was used to implement virtual scrolling with dynamic cell heights by leveraging CellMeasurer and Autosizer. **BCrypt** was used for safe encryption, and the program is compiled together via **Webpack.** ActiveRecord and ActiveStorage was used in conjunction with Ruby on Rails for the backend.

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
