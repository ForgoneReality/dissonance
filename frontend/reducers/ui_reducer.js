// frontend/reducers/errors_reducer.jsx

import { combineReducers } from "redux";
import modalReducer from "./modal_reducer.js"

const UIReducer = combineReducers({
  modal: modalReducer
});

export default UIReducer;