// frontend/reducers/errors_reducer.jsx

import { combineReducers } from "redux";

import sessionErrorsReducer from "./session_errors_reducer";
import messagesErrorsReducer from "./messages_errors_reducer";

const errorsReducer = combineReducers({
  session: sessionErrorsReducer
  // message: messagesErrorsReducer
});

export default errorsReducer;