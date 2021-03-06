import { connect } from 'react-redux';
import React from 'react';
import { removeErrors } from '../../actions/errors_actions';
import Settings from "./settings.jsx"
import { displayModal, hideFullModal } from '../../actions/modal_actions';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showLogoutModal: () => dispatch(displayModal("logout")),
    showUsernameModal: () => dispatch(displayModal("editusername")),
    showEmailModal: () => dispatch(displayModal("editemail")),
    hideFullModal: () => dispatch(hideFullModal())

    // removeErrors: () => dispatch(removeErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
