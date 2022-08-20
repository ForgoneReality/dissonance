import { CLEAR_ERRORS } from '../actions/errors_actions.js';
import {
    RECEIVE_SERVER_ERROR
  } from '../actions/servers_actions.js';


  export default (state = [], action) => {
    Object.freeze(state);
    // let newState = Object.assign({}, state)
    switch (action.type) {
      case RECEIVE_SERVER_ERROR:
        return [action.error];
      case CLEAR_ERRORS:
        return [];
      default:
        return state;
    }
  };