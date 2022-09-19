import * as APIUtil from "../util/conversations_api_util.jsx"


import { RECEIVE_MESSAGES } from "./messages_actions.js";
import { receiveMessages } from "./messages_actions.js";
import { receiveUsers } from "./users_actions.js";

export const RECEIVE_CONVERSATIONS = "RECEIVE_CONVERSATIONS";
export const RECEIVE_CONVERSATION = "RECEIVE_CONVERSATION";
export const CREATE_CONVERSATION = "CREATE_CONVERSATION";
export const NEW_UNREAD_CONVERSATION_MESSAGE = "NEW_UNREAD_CONVERSATION_MESSAGE";
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
});


//INCOMING BAD CODE
export const newUnreadMessage = (convoId) =>({
  type: NEW_UNREAD_CONVERSATION_MESSAGE,
  convoId
})

// export const updateConversation = (convo) => ({
//   type: UPDATE_CONVERSATION,
//   convo
// })

export const createConversation = (user1_id, user2_id) => {
    return dispatch => {
        return APIUtil.createConversation(user1_id, user2_id)
        .then(res => {
            return dispatch(receiveConvo(res))
          } //,
            // err => dispatch(receiveErrors(err.responseJSON))
        )
    }
};

export const getConvoMessages = (id, userid) => dispatch => {
  APIUtil.fetchConversation(id).then( (res) => {
    if(res.messages)
    {
      dispatch(receiveMessages(res.messages));
    }
    else{
      dispatch(receiveMessages({}));
    }
    dispatch(receiveUsers(res.users));
  })
  APIUtil.readConversation(id, userid).then((res) => {
    dispatch(receiveConvo(res))
  })
}

export const getConversationList = userId => dispatch => (
  APIUtil.getConversationList(userId).then( (res) => dispatch(receiveConvos(res)))
)

export const otherCreateConversation = (user1_id, user2_id) => {
  return dispatch => {
      return APIUtil.otherCreateConversation(user1_id, user2_id)
      .then(res => {
          return dispatch(receiveConvo(res))
        } //,
          // err => dispatch(receiveErrors(err.responseJSON))
      )
  }
};
