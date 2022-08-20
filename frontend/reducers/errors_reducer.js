// frontend/reducers/errors_reducer.jsx

import { combineReducers } from "redux";

import sessionErrorsReducer from "./session_errors_reducer";
import messagesErrorsReducer from "./messages_errors_reducer";
import usersErrorsReducer from "./users_errors_reducer";
import serverErrorsReducer from "./servers_errors_reducer";

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  user: usersErrorsReducer,
  server: serverErrorsReducer
});

export default errorsReducer;