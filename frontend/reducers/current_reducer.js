import { combineReducers } from 'redux';

import currentServerReducer from "./current_server_reducer.js"

export default combineReducers({
  server: currentServerReducer
});
