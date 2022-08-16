import { connect } from 'react-redux';
import React from 'react';
import { removeErrors } from '../../actions/errors_actions';
import Settings from "./settings.jsx"
import { displayModal, hideFullModal } from '../../actions/modal_actions';
import { changePFP } from '../../actions/users_actions';

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser,
    isDemo: state.session.currentUser.id <= 5
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showLogoutModal: () => dispatch(displayModal("logout")),
    showUsernameModal: () => dispatch(displayModal("editusername")),
    showEmailModal: () => dispatch(displayModal("editemail")),
    showPasswordModal: () => dispatch(displayModal("editpassword")),
    hideFullModal: () => dispatch(hideFullModal()),
    changePFP: (userId, pfp_url) => dispatch(changePFP(userId, pfp_url))

    // removeErrors: () => dispatch(removeErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
