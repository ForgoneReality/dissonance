import {RECEIVE_CONVERSATIONS, RECEIVE_CONVERSATION, CREATE_CONVERSATION} from "../actions/conversations_actions"

const conversationsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch(action.type) {
    case RECEIVE_CONVERSATIONS:
        return action.conversations;
    case RECEIVE_CONVERSATION:
        return action.conversation
    case CREATE_CONVERSATION:
        newState = Object.assign({}, state);
        newState[action.conversation.id] = action.conversation;
        return newState;
    default:
      return state;
  }
};

export default conversationsReducer;
