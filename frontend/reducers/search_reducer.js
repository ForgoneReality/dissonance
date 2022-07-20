import { LOGOUT_CURRENT_USER } from "../actions/session_actions";
import { RECEIVE_SEARCH_RESULT } from "../actions/users_actions";

const SearchReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type)
    {
        case RECEIVE_SEARCH_RESULT:
            return action.result;
        case LOGOUT_CURRENT_USER: 
            return {};
        default: 
            return  Object.assign({}, state);
    }
}

export default SearchReducer