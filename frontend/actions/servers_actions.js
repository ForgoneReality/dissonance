import * as APIUtil from "../util/servers_api_util"
import { fetchChannel } from "../util/channels_api_util";

import {receiveChannels} from "./channels_actions"
import { receiveUsers } from "./users_actions";

export const RECEIVE_SERVERS = "RECEIVE_SERVERS";
export const RECEIVE_SERVER = "RECEIVE_SERVER";
export const DELETE_SERVER = "DELETE_SERVER";
export const RECEIVE_CURRENT_SERVER = "RECEIVE_CURRENT_SERVER";
export const RECEIVE_SERVER_ERROR = "RECEIVE_SERVER_ERROR";
export const RECEIVE_CURRENT_SEARCH = "RECEIVE_CURRENT_SEARCH";
export const CLEAR_CURRENT_SEARCH = "CLEAR_CURRENT_SEARCH";

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

export const deleteServer = (id) =>({
  type:DELETE_SERVER,
  id
}  
);

export const receiveCurrentServer = (server) =>({
  type:RECEIVE_CURRENT_SERVER,
  server
});

export const receiveServerError = (error) => ({
  type: RECEIVE_SERVER_ERROR,
  error
})

export const receiveCurrentSearch = (search) =>({
  type:RECEIVE_CURRENT_SEARCH,
  search
});


export const getServersList = userId => dispatch => (
    APIUtil.getServersList(userId).then( (res) => dispatch(receiveServers(res)))
)

export const fetchServer = id => dispatch => {
  return (APIUtil.fetchServer(id).then( (res) => {
    dispatch(receiveChannels(res.channels))
    dispatch(receiveUsers(res.users));
    dispatch(receiveServer(res.server));
    dispatch(receiveCurrentServer(res.server));
  }))
}

export const getServerID = channelId  => (
  fetchChannel(channelId)
)

export const updateServer = (server) => dispatch => {
    dispatch(receiveServer(server));
    dispatch(receiveCurrentServer(server));
}

export const getServerFromLink = server_link => dispatch =>(
  APIUtil.getServerFromLink(server_link).then((res) => {
    dispatch(receiveCurrentServer(res));
  })
)

export const removeServer = id => dispatch => {
  return APIUtil.removeServer(id).then((res) => {
    dispatch(deleteServer(id));
  })
}

export const leaveServer = (user_id, server_id) => dispatch => {
  return APIUtil.leaveServer(user_id, server_id).then((res) => {
    dispatch(deleteServer(server_id));//technically can also do currentServer dispatch, but it should be non-consequential  
  })
}

export const searchServer = (server_id, query) => dispatch => {
  return APIUtil.searchServer(server_id, query).then((res) => {
    console.log("RRR", res);
    dispatch(receiveCurrentSearch(res));
  })
}

export const updateServerLink = (server_id, invite_link) => dispatch => {
  return APIUtil.updateServerLink(server_id, invite_link).then((res) => {
    dispatch(receiveCurrentServer(res));
  })
}

// export const generateServer = server => dispatch => {
//   console.log("server", server);
//   return APIUtil.createServer(server).then((res) => dispatch(receiveServer(res)))
// }