import * as APIUtil from "../util/conversations_api_util.jsx"


import { RECEIVE_MESSAGES } from "./messages_actions.js";
import { receiveMessages } from "./messages_actions.js";
import { receiveUsers } from "./users_actions.js";

export const RECEIVE_CONVERSATIONS = "RECEIVE_CONVERSATIONS";
export const RECEIVE_CONVERSATION = "RECEIVE_CONVERSATION";
export const CREATE_CONVERSATION = "CREATE_CONVERSATION";
// export const UPDATE_CONVERSATION = "UPDATE_CONVERSATION";



export const receiveConvos = (conversations) => {
    return {
      type: RECEIVE_CONVERSATIONS,
      conversations
    };
  };

export const receiveConvo = (conversation) =>({
    type:RECEIVE_CONVERSATION,
    conversation
  }  
);

export const createConvo = (conversation) =>({
  type:CREATE_CONVERSATION,
  conversation
}  
);

// export const updateConversation = (convo) => ({
//   type: UPDATE_CONVERSATION,
//   convo
// })

export const createConversation = convo => {
    return dispatch => {
        return APIUtil.createConversation(convo)
        .then(
            res => dispatch(receiveConvo(res)) //,
            // err => dispatch(receiveErrors(err.responseJSON))
        )
    }
};

export const getConvoMessages = id => dispatch => (
  APIUtil.fetchConversation(id).then( (res) => {
    console.log("AJAX RESULTS", res);
    dispatch(receiveMessages(res.messages));
    dispatch(receiveUsers(res.users));
  })
)

export const getConversationList = userId => dispatch => (
  APIUtil.getConversationList(userId).then( (res) => dispatch(receiveConvos(res)))
)