import { CLEAR_ERRORS } from '../actions/errors_actions';
import {
    RECEIVE_SESSION_ERRORS,
    RECEIVE_CURRENT_USER,
    LOGOUT_CURRENT_USER
  } from '../actions/session_actions';


  export default (state = [], action) => {
    Object.freeze(state);
    // let newState = Object.assign({}, state)
    switch (action.type) {
      case RECEIVE_SESSION_ERRORS:
        return action.errors;
      case RECEIVE_CURRENT_USER:
        return [];
      case CLEAR_ERRORS:
        return [];
      case LOGOUT_CURRENT_USER: 
        return [];
      default:
        return state;
    }
  };
