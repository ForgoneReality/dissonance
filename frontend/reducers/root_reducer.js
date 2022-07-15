import { combineReducers } from 'redux';

import entities from './entities_reducer';
// import ui from './ui_reducer';
import session from './session_reducer';
import errors from './errors_reducer';
import search from "./search_reducer.js";

const rootReducer = combineReducers({
  entities,
  session,
  search,
  errors
});

export default rootReducer;
