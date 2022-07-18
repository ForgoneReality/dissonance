import { RECEIVE_SEARCH_RESULT } from "../actions/users_actions";

const SearchReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type)
    {
        case RECEIVE_SEARCH_RESULT:
            return action.result;
        default: 
            return  Object.assign({}, state);
    }
}

export default SearchReducer