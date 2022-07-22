import { RECEIVE_CURRENT_SERVER } from "../actions/servers_actions";

  export default (state = [], action) => {
    Object.freeze(state);
    // let newState = Object.assign({}, state)
    switch (action.type) {
      case RECEIVE_CURRENT_SERVER:
        return action.server;
      default:
        return state;
    }
  };