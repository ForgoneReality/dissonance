
import * as APIUtil from "../util/messages_api_util.jsx"

export const RECEIVE_MESSAGES = 'RECEIVE_TODOS';
export const RECEIVE_MESSAGE = 'RECEIVE_TODO';
export const REMOVE_MESSAGE = 'REMOVE_TODO';

// export const MESSAGE_ERROR = 'MESSAGE_ERROR';

// import { receiveErrors } from "./error_actions.js";


export const receiveMessages = (messages) => {
    return {
      type: RECEIVE_MESSAGES,
      messages,
    };
  };

export const receiveMessage = (message) =>({
    type:RECEIVE_MESSAGE,
    message,
  }  
);

export const removeMessage = (message) => ({
    type:REMOVE_MESSAGE,
    message,
})

// export const fetchMessages = ()=> d => (
//     APIUtil.fetchMessages().then( (result) => d(receiveMessages(result)))
//   )
  
export const createMessage = message => {
return dispatch => {
    return APIUtil.createMessage(message)
    .then(
        res => dispatch(receiveMessage(res)) //,
        // err => dispatch(receiveErrors(err.responseJSON))
    )
}
};

export const updateMessage = (msg)=> d => (
// APIUtil.updateMessage(msg).then( (result) => d(receiveTodos(result)), (err) => d(receiveErrors(err.responseJSON)))
APIUtil.updateMessage(msg).then( (result) => d(receiveMessage(result)))
)

export const deleteMessage = (msg)=> d => (
// APIUtil.deleteTodo(todo).then( (result) => d(removeMessage(result)), (err) => d(receiveErrors(err.responseJSON)))
APIUtil.deleteMessage(msg).then( (result) => d(removeMessage(result)), (err) => d(receiveErrors(err.responseJSON)))
) 
