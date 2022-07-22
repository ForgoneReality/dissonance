

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

export const getChannelMessages = id => dispatch => (
  APIUtil.fetchChannel(id).then( (res) => {
    return dispatch(receiveMessages(res.messages));
    // dispatch(receiveUsers(res.users));
  })
)

export const createChannel = channel => dispatch => (
  APIUtil.createChannel(channel).then( (res) => dispatch(receiveChannel(res)))
)