import { combineReducers } from 'redux';

import usersReducer from './users_reducer';
import messagesReducer from './messages_reducer';
import conversationsReducer from './conversations_reducer';
import serversReducer from './servers_reducer';
import channelsReducer from "./channels_reducer"

export default combineReducers({
  users: usersReducer,
  messages: messagesReducer,
  conversations: conversationsReducer,
  servers: serversReducer,
  channels: channelsReducer
});
