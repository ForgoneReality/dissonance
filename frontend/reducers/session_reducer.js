import { RECEIVE_CURRENT_USER, LOGOUT_CURRENT_USER } from "../actions/session_actions";

const SessionsReducer = (state = {}, action) => {
    Object.freeze(state);

    let newState = Object.assign({}, state);
    
    switch(action.type)
    {
        case RECEIVE_CURRENT_USER:
            let isdemo = false;
            if (action.currentUser.id <= 5)
            {
                isdemo = true
            }
            return {id: action.currentUser.id, currentUser: action.currentUser, demo: isdemo}
        case LOGOUT_CURRENT_USER:
            return { id: null };
        default: 
            return newState;
    }

}

export default SessionsReducer