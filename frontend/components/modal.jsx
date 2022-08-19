import React from 'react';
import { hideModal } from '../actions/modal_actions';
import { connect } from 'react-redux';
// import LoginFormContainer from '../session_form/login_form_container';
// import SignupFormContainer from '../session_form/signup_form_container';

import LogoutModal from './modals/logout_modal';
import EditUsernameModal from './modals/edit_username_modal';
import EditEmailModal from './modals/edit_email_modal';
import CreateServerModal from './modals/create_server_modal';
import CreateChannelModal from './modals/create_channel_modal';
import EditPasswordModal from './modals/edit_password_modal';
import EditNicknameModal from "./modals/edit_nickname_modal";
import InviteUsersModal from "./modals/invite_users_modal";
import EditBioModal from "./modals/edit_bio_modal"
import DeleteServerModal from "./modals/delete_server_modal"

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

    if (this.props.modals === null || Object.values(this.props.modals).length === 0) {
      return null;
    }
    let component;
    switch (this.props.modals.name) {
      //this code could be refactored to be significantly more modular and DRY
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
      case 'createchannel':
        component=<CreateChannelModal/>
        break;
      case 'editpassword':
        component=<EditPasswordModal/>
        break;
      case 'nickname':
        component=<EditNicknameModal server_id={this.props.modals.payload}/>
        break;
      case 'invite-users':
        component=<InviteUsersModal/>
        break;
      case 'editbio':
        component=<EditBioModal/>
        break;
      case 'deleteserver':
        component=<DeleteServerModal/>
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
    hideModal: () => dispatch(hideModal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);