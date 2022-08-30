import { combineReducers } from 'redux';

import currentServerReducer from "./current_server_reducer.js"
import currentSearchReducer from "./current_search_reducer.js"

export default combineReducers({
  server: currentServerReducer,
  search: currentSearchReducer
});
