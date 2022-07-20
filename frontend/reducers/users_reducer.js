import { LOGOUT_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_USERS, RECEIVE_USER} from "../actions/users_actions";

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  switch(action.type) {
    case RECEIVE_USERS:
      return action.users;
    case RECEIVE_USER:
      newState = Object.assign({}, state);
      newState[action.user.id] = action.user;
      return newState;
    case LOGOUT_CURRENT_USER: 
      return {};
    default:
      return state;
  }
};

export default usersReducer;
