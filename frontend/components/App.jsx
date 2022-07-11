
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
    <div>
      {/* <header>
        <h1>Dissonance</h1>
      </header> */}

      
      <Switch>
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
        <ProtectedRoute exact path="/home" component={ConversationListContainer} />
        <ProtectedRoute path="/conversations/:convoId" component={ConversationContainer} />
        <Route exact path="/" component={WelcomeContainer}/>
        {/* Some Default Path? path="/" */}
      </Switch>
    </div>
  );


export default App;