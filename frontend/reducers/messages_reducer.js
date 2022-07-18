import { RECEIVE_MESSAGES, RECEIVE_MESSAGE, REMOVE_MESSAGE} from "../actions/messages_actions"

const messagesReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch(action.type) {
    case RECEIVE_MESSAGES:
      return action.messages;
    case RECEIVE_MESSAGE:
        newState = Object.assign({}, state);
        newState[action.message.id] = action.message;
        return newState;
    case REMOVE_MESSAGE:
        newState = Object.assign({}, state);
        delete newState[action.msgId]
        return newState;
    default:
      return state;
  }
};

export default messagesReducer;
