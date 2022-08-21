import React from "react";
import { connect } from 'react-redux';
import { displayModal, hideModal, displayFullModal } from "../../actions/modal_actions";

class DropdownModal extends React.Component{
constructor(props) {
    super(props);
    this.modalOpen = this.modalOpen.bind(this)
  }


  // componentDidMount()
  // {

  // }

  // componentDidUpdate(){

  // }

  modalOpen(modalname)
  {
    this.props.displayModal(modalname);
  }

  render() {

    if (!this.props.modals) {
      return null;
      
    }
    let component;

    if (this.props.modals.name === "server-settings" && this.props.isOwner)
    {
        component = 
         <div className="modal-background-transparent" onClick={this.props.hideModal}>
          <div id="dropdown" onClick={(e) => e.stopPropagation()}>
          <ul className="dropdown-list1">
            <li>
              <button className="invbutt" onClick={() => this.modalOpen("invite-users")}>Invite Users</button>
            </li>
            <li>
              {/* <button className="otherbutt" onClick={() => this.modalOpen("serversettings")}>Server Settings</button> */}
              <button className="otherbutt" onClick={() => this.props.displayFullModal("serversettings")}>Server Settings</button>

            </li>
            <li>
              {/* <button className="otherbutt">Create Channel</button> */}
              <button className="otherbutt" onClick={() => this.modalOpen("createchannel")}>Create Channel</button>

            </li>
            <li>
              <button className="otherbutt" >Notification Settings</button>

              {/* <button className="otherbutt" onClick={() => this.modalOpen("notifications")}>Notification Settings</button> */}
            </li>
            <li>
              <button className="otherbutt" onClick={() => this.modalOpen("nickname")}>Edit Server Nickname</button>
            </li>
            <li>
              <button className="leavebutt" onClick={() => this.modalOpen("deleteserver")}>Delete Server</button>

              {/* <button className="leavebutt">Delete Server</button> */}
              {/*dont forget below stuff too*/}
            </li>
          </ul>
        </div>
        </div>
    }
    else if (this.props.modals.name === "server-settings")
    {
      component = 
    <div className="modal-background-transparent" onClick={this.props.hideModal}>
      <div id="dropdown" onClick={(e) => e.stopPropagation()}>
          <ul className="dropdown-list1">
            <li>
              <button className="invbutt" onClick={() => this.modalOpen("invite-users")}>Invite Users</button>
            </li>
            <li>
              <button className="otherbutt">Notification Settings</button>
            </li>
            <li>
              <button className="otherbutt" onClick={() => this.modalOpen("nickname")}>Edit Server Nickname</button>
            </li>
            <li>
              <button className="leavebutt" onClick={()=> this.modalOpen("leave-server")}>Leave Server</button>
            </li>
          </ul>
        </div>
      </div>
    }
    else{
      component = <div></div>
    }

    return(
      component
    )}
}




const mapStateToProps = (state) => {
  let owner = false;
  if(Object.keys(state.entities.channels).length > 0)
  {
    const server_id = state.current.server.id
    owner = (state.session.id === state.entities.servers[server_id].owner_id);
  }
  return {
    modals: state.ui.modal,
    isOwner: owner
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => dispatch(hideModal()),
    displayModal: (modal) => dispatch(displayModal(modal)),
    displayFullModal: (modal) => dispatch(displayFullModal(modal))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DropdownModal);
