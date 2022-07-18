import {RECEIVE_SERVERS, RECEIVE_SERVER, DELETE_SERVER} from "../actions/servers_actions"

const serversReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch(action.type) {
    case RECEIVE_SERVERS:
        return action.servers;
    case RECEIVE_SERVER:
        newState = Object.assign({}, state);
        newState[action.server.id] = action.server;
        return newState;
    default:
      return state;
  }
};

export default serversReducer;
