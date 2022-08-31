import {RECEIVE_CHANNEL, RECEIVE_CHANNELS, DELETE_CHANNEL} from "../actions/channels_actions"
import { LOGOUT_CURRENT_USER } from "../actions/session_actions";

const channelsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch(action.type) {
    case LOGOUT_CURRENT_USER:
        return {};
    case RECEIVE_CHANNELS:
        return action.channels;
    case RECEIVE_CHANNEL:
        newState = Object.assign({}, state);
        newState[action.channel.id] = action.channel;
        return newState;
    case DELETE_CHANNEL: 
        newState = Object.assign({}, state);
        delete newState[action.channel.id];
        return newState;
    default:
      return state;
  }
};

export default channelsReducer;
