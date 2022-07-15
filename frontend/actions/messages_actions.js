
import * as APIUtil from "../util/messages_api_util.jsx"
import * as ConversationUtil from "../util/conversations_api_util.jsx"
// import { receiveErrors } from "./error_actions.js";
import { receiveConvo } from "./conversations_actions.js";


export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';
export const RECEIVE_MESSAGE_ERRORS = "RECEIVE_MESSAGE_ERRORS";




export const receiveMessages = (messages) => {
    return {
      type: RECEIVE_MESSAGES,
      messages,
    };
  };

export const receiveMessage = ({message}) =>({
    type:RECEIVE_MESSAGE,
    message,
  }  
);

export const otherReceiveMessage  = (message) =>{
  return {
  type:RECEIVE_MESSAGE,
  message,
}} //bad code,should refactor

export const removeMessage = (msgId) => ({
    type:REMOVE_MESSAGE,
    msgId
})

export const receiveMessageErrors = errors => ({
  type: RECEIVE_MESSAGE_ERRORS,
  errors
});

// export const fetchMessages = ()=> d => (
//     APIUtil.fetchMessages().then( (result) => d(receiveMessages(result)))
//   )



export const createMessage = message => {
return dispatch => {
    if(message.location_type === "Conversation")
    {
      ConversationUtil.updateConversation(message.location_id, {last_updated: new Date() / 1000}).then( (res) => 
      {
        dispatch(receiveConvo(res))
      })
    }
    //need other half eventually

    return APIUtil.createMessage(message).then((res) => 
      { 
        return dispatch(receiveMessage(res))
      }
    )
}
};

export const updateMessage = (msg)=> d => {
// APIUtil.updateMessage(msg).then( (result) => d(receiveTodos(result)), (err) => d(receiveErrors(err.responseJSON)))
  return APIUtil.updateMessage(msg).then( (result) => d(receiveMessage(result)))
}

export const deleteMessage = (msg)=> d => (
// APIUtil.deleteTodo(todo).then( (result) => d(removeMessage(result)), (err) => d(receiveErrors(err.responseJSON)))
APIUtil.deleteMessage(msg).then( (result) => d(removeMessage(result.id)), (err) => d(receiveMessageErrors(err.responseJSON)))
) 
