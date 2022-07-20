import { DISPLAY_FULL_MODAL, HIDE_FULL_MODAL, RESET_ALL_MODALS } from "../actions/modal_actions";
import { LOGOUT_CURRENT_USER } from "../actions/session_actions";

const FullModalReducer = (state = null, action) => {
  Object.freeze(state);
  switch (action.type) {
    case DISPLAY_FULL_MODAL:
      return action.modal;
    case HIDE_FULL_MODAL:
      return null;
    case RESET_ALL_MODALS:
      return null;
    case LOGOUT_CURRENT_USER: 
      return null;
    default:
      return state;
  }
};

export default FullModalReducer;