
import React from "react";
import WelcomeContainer from "./welcome/welcome_container"
import { channelRedirect } from "../util/servers_api_util";

import {
    Route,
    Redirect,
    Switch,
    Link,
    HashRouter
  } from 'react-router-dom';

import SignupFormContainer from './session_form/signup_form_container';
import LoginFormContainer from './session_form/login_form_container';
// import ConversationListContainer from "./conversations/conversation_list_container";
// import ConversationContainer from "./conversations/conversation_container";
import AppBasicsContainer from "./bars/appbasics_container";

import { AuthRoute, ProtectedRoute } from "../util/route_util";
import ServerInit from "./servers/server_init.js"

//render some stuff always when signed-in... like the users info at the bottom left
const App = () => (
    <div>
      {/* <header>
        <h1>Dissonance</h1>
      </header> */}
      <Switch>
        <Route exact path="/" component={WelcomeContainer}/>
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />
        <Route path="/servers/:serverId" component={ServerInit} />
    
        <ProtectedRoute path="/" component={AppBasicsContainer}/> 
      </Switch>

    </div>
  );


export default App;