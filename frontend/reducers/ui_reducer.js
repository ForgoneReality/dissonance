// frontend/reducers/errors_reducer.jsx

import { combineReducers } from "redux";
import modalReducer from "./modal_reducer.js"
import fullModalReducer from "./fullmodal_reducer.js"

const UIReducer = combineReducers({
  modal: modalReducer, 
  fullmodal: fullModalReducer
});

export default UIReducer;