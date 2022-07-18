import {RECEIVE_CHANNEL, RECEIVE_CHANNELS} from "../actions/channels_actions"

const channelsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch(action.type) {
    case RECEIVE_CHANNELS:
        return action.channels;
    case RECEIVE_CHANNEL:
        newState = Object.assign({}, state);
        newState[action.channel.id] = action.channel;
        return newState;
    default:
      return state;
  }
};

export default channelsReducer;
