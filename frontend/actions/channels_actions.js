

import * as APIUtil from "../util/channels_api_util.jsx"

import { receiveMessages } from "./messages_actions.js";

export const RECEIVE_CHANNELS = "RECEIVE_CHANNELS";
export const RECEIVE_CHANNEL = "RECEIVE_CHANNEL";
export const DELETE_CHANNEL = "DELETE_CHANNEL";



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

export const deleteChannel = (channel) => ({
  type: DELETE_CHANNEL,
  channel
})

export const getChannelMessages = id => dispatch => (
  APIUtil.fetchChannel(id).then( (res) => {
    if(res.messages)
    {
    return dispatch(receiveMessages(res.messages));
    }
    else
    {
      return dispatch(receiveMessages({}))
    }
    // dispatch(receiveUsers(res.users));
  })
)

export const createChannel = channel => dispatch => (
  APIUtil.createChannel(channel).then( (res) => dispatch(receiveChannel(res)))
)

export const removeChannel = channel_id => dispatch =>(
  APIUtil.removeChannel(channel_id).then((res) => dispatch(deleteChannel(res)))
)