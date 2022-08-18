import { DISPLAY_MODAL, HIDE_MODAL, RESET_ALL_MODALS } from "../actions/modal_actions";
import { LOGOUT_CURRENT_USER } from "../actions/session_actions";

const ModalReducer = (state = null, action) => {
  Object.freeze(state);
  switch (action.type) {
    case DISPLAY_MODAL:
      return Object.assign({},{name: action.name, payload: action.payload} );
    case HIDE_MODAL:
      return null;
    case RESET_ALL_MODALS:
      return null;
    case LOGOUT_CURRENT_USER: 
      return null;
    default:
      return state;
  }
};

export default ModalReducer;