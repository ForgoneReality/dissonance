

import * as APIUtil from "../util/channels_api_util.jsx"

import { receiveMessages } from "./messages_actions.js";

export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";



export const receiveChannels = (channels) => {
    return {
      type: RECEIVE_CHANNELS,
      channels
    };
  };

export const receiveChannel = (channel) =>({
    type:RECEIVE_CHANNEL,
    channel
  }  
);


// export const addChannel = channel => {
//     return dispatch => {
//         return APIUtil.createChannel(channel)
//         .then(
//             res => dispatch(receiveChannel(res)) //,
//             // err => dispatch(receiveErrors(err.responseJSON))
//         )
//     }
// };

export const getChannelMessages = id => dispatch => (
  APIUtil.fetchChannel(id).then( (res) => {
      if(res.messages)
      {
        return dispatch(receiveMessages(res.messages));
      }
      else
      {
        return dispatch(receiveMessages({}));
      }
    // dispatch(receiveUsers(res.users));
  })
)