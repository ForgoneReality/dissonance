// Before we get to the reducer, let's write and export the following action creators in a new file actions/session_actions.js:

// login(user) (thunk action creator)
// logout() (thunk action creator)
// signup(user) (thunk action creator)
// receiveCurrentUser(currentUser) (regular action creator)
// logoutCurrentUser() (regular action creator)
// receiveErrors(errors) (regular action creator)
// Don't forget to define and export the corresponding action types as well (e.g., export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER').

// Neither logout nor logoutCurrentUser will accept an argument. receiveErrors will take an array. All other action creators accept a user object.

import * as sessionAPIUtil from "../util/session_api_util"

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS'


export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
  });
  
export const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
});

export const receiveSessionErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});


export const login = (user) =>(dispatch) => (
    sessionAPIUtil.login(user)
    .then( (user) => dispatch(receiveCurrentUser(user)),  errs => dispatch(receiveSessionErrors(errs.responseJSON)))
)

export const demo = () =>(dispatch) => (
    sessionAPIUtil.demo()
    .then( (user) => dispatch(receiveCurrentUser(user)))
)

export const logout = () => (dispatch) => (
    sessionAPIUtil.logout()
    .then( () => dispatch(logoutCurrentUser()), errs => (dispatch(receiveSessionErrors(errs.responseJSON)))
))

export const signup = (user)=> (dispatch) => (
    sessionAPIUtil.signup(user)
    .then( (user) => dispatch(receiveCurrentUser(user)), errs => (dispatch(receiveSessionErrors(errs.responseJSON)))
))

