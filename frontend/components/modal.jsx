import React from 'react';
import { hideModal } from '../actions/modal_actions';
import { connect } from 'react-redux';
// import LoginFormContainer from '../session_form/login_form_container';
// import SignupFormContainer from '../session_form/signup_form_container';

import LogoutModal from './modals/logout_modal';
import EditUsernameModal from './modals/edit_username_modal';
import EditEmailModal from './modals/edit_email_modal';

class Modal extends React.Component{
  constructor(props)
  {
    super(props)
    this.escFunction = this.escFunction.bind(this);
  }

  escFunction(event){
    if (event.key === "Escape") {
      this.props.hideModal();
    }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }

  render()
  {

    if (!this.props.modals) {
      return null;
    }
    let component;
    switch (this.props.modals) {
      case 'logout':
        component = <LogoutModal/>;
        break;
      case 'editusername':
        component= <EditUsernameModal/>;
        break;
      case 'editemail':
        component =<EditEmailModal/>;
        break;
      case 'createserver':
        component=<CreateServerModal/>;
        break;
      default:
        return null;
    }
    return (
      <div className="modal-background" onClick={this.props.hideModal}>
        <div className="modal-child" onClick={e => e.stopPropagation()}>
          { component }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modals: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => dispatch(hideModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);