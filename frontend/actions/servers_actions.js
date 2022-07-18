import * as APIUtil from "../util/servers_api_util"
import { fetchChannel } from "../util/channels_api_util";

import {receiveChannels} from "./channels_actions"
import { receiveUsers } from "./users_actions";

export const RECEIVE_SERVERS = "RECEIVE_SERVERS";
export const RECEIVE_SERVER = "RECEIVE_SERVER";
export const DELETE_SERVER = "DELETE_SERVER";


export const receiveServers = (servers) => {
    return {
      type: RECEIVE_SERVERS,
      servers
    };
  };

export const receiveServer = (server) =>({
    type:RECEIVE_SERVER,
    server
  }  
);

export const deleteServer = (server) =>({
  type:DELETE_SERVER,
  server
}  
);

export const getServersList = userId => dispatch => (
    APIUtil.getServersList(userId).then( (res) => dispatch(receiveServers(res)))
)

export const fetchServer = id => dispatch => {
  return (APIUtil.fetchServer(id).then( (res) => {
    dispatch(receiveChannels(res.channels))
    dispatch(receiveUsers(res.users));
    //return dispatch(receiveServer(res.server));
  }))
}

export const getServerID = channelId  => (
  fetchChannel(channelId)
)
