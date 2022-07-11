import { combineReducers } from 'redux';

import usersReducer from './users_reducer';
import messagesReducer from './messages_reducer';
import conversationsReducer from './conversations_reducer';

export default combineReducers({
  users: usersReducer,
  messages: messagesReducer,
  conversations: conversationsReducer
});
