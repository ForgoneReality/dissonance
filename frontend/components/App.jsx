
import React from "react";
import WelcomeContainer from "./welcome/welcome_container"

import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
  } from 'react-router-dom';

import SignupFormContainer from './session_form/signup_form_container';
import LoginFormContainer from './session_form/login_form_container';
import ConversationListContainer from "./conversations/conversation_list_container";
import ConversationContainer from "./conversations/conversation_container";

import { AuthRoute, ProtectedRoute } from "../util/route_util";


//render some stuff always when signed-in... like the users info at the bottom left
const App = () => (
    <main>
      {/* <header>
        <h1>Dissonance</h1>
      </header> */}

      <Switch>
        <Route exact path="/" component={WelcomeContainer}/>
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
       
        {/* list of servers as well as user bar */}
          <Route path="/conversations" component={ConversationListContainer}>
            <Route path="/conversations/:convoId" component={ConversationContainer} />
          </Route>

      </Switch>
{/* 
      <Router>
    <Route path="/" component={App... has user settings and servers l}>
      <Route path="dms" components={{main: Groups, sidebar: conversationsList}} />
      <Route path="servers" components={{main: Users, sidebar: UsersSidebar}}>
        <Route path="users/:userId" component={Profile} />
      </Route>
    </Route>
  </Router>

        <Router>
          <Route path="/" component={App... has user settings and servers l}>
            <Route path="dms" component={conversationsListContainer}}>
              switch
              <Route path="/home or @me" component={friendsList} />
              <Route path="/:id (??)" component={conversationContainer} />
            </Route>
            <Route path="servers" components={{main: Users, sidebar: UsersSidebar}}>
              /etc
            </Route>
          </Route>
        </Router>
       */}
    </main>
  );


export default App;