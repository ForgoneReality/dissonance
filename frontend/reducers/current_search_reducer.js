import { RECEIVE_CURRENT_SEARCH, CLEAR_CURRENT_SEARCH } from "../actions/servers_actions";

  export default (state = [], action) => {
    Object.freeze(state);
    // let newState = Object.assign({}, state)
    switch (action.type) {
      case RECEIVE_CURRENT_SEARCH:
        return action.search;
      case CLEAR_CURRENT_SEARCH:
        return null;
      default:
        return state;
    }
  };