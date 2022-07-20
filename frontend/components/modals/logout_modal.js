import React from 'react';
import { connect } from 'react-redux';
import { removeErrors } from '../../actions/errors_actions';
import { hideModal, resetModal } from '../../actions/modal_actions';
import { logout } from "../../actions/session_actions"

class LogoutModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="logout-modal">
        <div id="logout-modal-top">
          <h1>Logout</h1>
          <h2>Are you sure you want to logout?</h2>
        </div>
        <div id="logout-modal-bottom">
          <button className="cancel1" onClick={() => this.props.hideModal()}>Cancel</button>
          <button id="logout1" onClick={() => this.props.logout()}>Log Out</button>
        </div>
      </div>
    );
  }
}



const mapStateToProps = state => {
  return {
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => dispatch(hideModal()),
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutModal);
