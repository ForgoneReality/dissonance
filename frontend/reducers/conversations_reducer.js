import {RECEIVE_CONVERSATIONS, RECEIVE_CONVERSATION, CREATE_CONVERSATION, NEW_UNREAD_CONVERSATION_MESSAGE} from "../actions/conversations_actions"
import { LOGOUT_CURRENT_USER } from "../actions/session_actions";

const conversationsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch(action.type) {
    case RECEIVE_CONVERSATIONS:
        return action.conversations;
    case RECEIVE_CONVERSATION:
        newState = Object.assign({}, state);
        newState[action.conversation.id] = action.conversation;
        return newState;
    case CREATE_CONVERSATION:
        newState = Object.assign({}, state);
        newState[action.conversation.id] = action.conversation;
        return newState;
    case NEW_UNREAD_CONVERSATION_MESSAGE:
        newState = Object.assign({}, state);
        newState[action.convoId].unread += 1;
        return newState;
    case LOGOUT_CURRENT_USER:
        return {};
    default:
      return state;
  }
};

export default conversationsReducer;
