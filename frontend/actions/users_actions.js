
import * as APIUtil from "../util/users_api_util"
import { receiveCurrentUser } from "./session_actions";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USER_ERROR = "RECEIVE_USER_ERROR";
export const RECEIVE_SEARCH_RESULT = "RECEIVE_SEARCH_RESULT";


export const receiveUsers = (users) =>({
    type:RECEIVE_USERS,
    users
  }  
);

export const receiveUser = (user) => ({
  type: RECEIVE_USER, 
  user
})

export const receiveError = (error) => ({
  type: RECEIVE_USER_ERROR, 
  error
})

export const receiveSearchResult = (result) => ({
  type: RECEIVE_SEARCH_RESULT,
  result
})

export const fetchFriendsList = userId => dispatch => (
  APIUtil.getFriendList(userId).then( (res) => dispatch(receiveUsers(res)))
)

export const updateUser = (userId, user) => dispatch => (
  APIUtil.updateUser(userId, user).then( ((res) => 
  {
    dispatch(receiveUser(res));
    dispatch(receiveCurrentUser(res));
  }), (errs) => dispatch(receiveError(errs.responseJSON)))
)

export const findUser = (username, four_id) => dispatch => (
  APIUtil.findUser(username, four_id).then(((res) => {
    return dispatch(receiveSearchResult(res));
  }), (err) => dispatch(addUserError("No Such User exists")))
)

export const addUserError = (error) => dispatch => (
  dispatch(receiveError(error))
)

export const createFriendship = (user_id, friend_id) => {
  APIUtil.addFriend(user_id, friend_id)
  APIUtil.addFriend(friend_id, user_id)
}