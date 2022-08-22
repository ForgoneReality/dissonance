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
              <button className="invbutt" onClick={() => this.modalOpen("invite-users")}>
              Invite Users
              <svg class="icon-E4cW1l" aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24"><path fill="#949CF7" fill-rule="evenodd" clip-rule="evenodd" d="M21 3H24V5H21V8H19V5H16V3H19V0H21V3ZM10 12C12.205 12 14 10.205 14 8C14 5.795 12.205 4 10 4C7.795 4 6 5.795 6 8C6 10.205 7.795 12 10 12ZM10 13C5.289 13 2 15.467 2 19V20H18V19C18 15.467 14.711 13 10 13Z"></path></svg>
              </button>
            </li>
            <li>
              {/* <button className="otherbutt" onClick={() => this.modalOpen("serversettings")}>Server Settings</button> */}
              <button className="otherbutt" onClick={() => this.props.displayFullModal("serversettings")}>Server Settings
              <svg class="icon-E4cW1l" aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24"><path fill="#B9BBBE" fill-rule="evenodd" clip-rule="evenodd" d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"></path></svg>
              </button>

            </li>
            <li>
              {/* <button className="otherbutt">Create Channel</button> */}
              <button className="otherbutt" onClick={() => this.modalOpen("createchannel")}>Create Channel
              <svg class="icon-E4cW1l" width="20" height="20" viewBox="0 0 24 24"><path fill="#B9BBBE" d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"></path></svg>
              </button>

            </li>
            <li>
              <button className="otherbutt" >Notification Settings
              <svg class="icon-E4cW1l" aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24" fill="none"><path fill="#B9BBBE" fill-rule="evenodd" clip-rule="evenodd" d="M18 9V14C18 15.657 19.344 17 21 17V18H3V17C4.656 17 6 15.657 6 14V9C6 5.686 8.686 3 12 3C15.314 3 18 5.686 18 9ZM11.9999 21C10.5239 21 9.24793 20.19 8.55493 19H15.4449C14.7519 20.19 13.4759 21 11.9999 21Z"></path></svg>
              </button>

              {/* <button className="otherbutt" onClick={() => this.modalOpen("notifications")}>Notification Settings</button> */}
            </li>
            <li>
              <button className="otherbutt" onClick={() => this.modalOpen("nickname")}>Edit Server Nickname
              <svg class="icon-E4cW1l" aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z" fill="#B9BBBE"></path></svg>
              </button>
            </li>
            <li>
              <button className="leavebutt" onClick={() => this.modalOpen("deleteserver")}>Delete Server
              <svg aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24"><path fill="#ED4245" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path><path fill="#ED4245" d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z"></path></svg>
              </button>

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
              <button className="invbutt" onClick={() => this.modalOpen("invite-users")}>
              Invite Users
              <svg class="icon-E4cW1l" aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24"><path fill="#949CF7" fill-rule="evenodd" clip-rule="evenodd" d="M21 3H24V5H21V8H19V5H16V3H19V0H21V3ZM10 12C12.205 12 14 10.205 14 8C14 5.795 12.205 4 10 4C7.795 4 6 5.795 6 8C6 10.205 7.795 12 10 12ZM10 13C5.289 13 2 15.467 2 19V20H18V19C18 15.467 14.711 13 10 13Z"></path></svg>
              </button>
            </li>
            <li>
              <button className="otherbutt">
              Notification Settings
              <svg class="icon-E4cW1l" aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24" fill="none"><path fill="#B9BBBE" fill-rule="evenodd" clip-rule="evenodd" d="M18 9V14C18 15.657 19.344 17 21 17V18H3V17C4.656 17 6 15.657 6 14V9C6 5.686 8.686 3 12 3C15.314 3 18 5.686 18 9ZM11.9999 21C10.5239 21 9.24793 20.19 8.55493 19H15.4449C14.7519 20.19 13.4759 21 11.9999 21Z"></path></svg>
              </button>
            </li>
            <li>
              <button className="otherbutt" onClick={() => this.modalOpen("nickname")}>Edit Server Nickname
              <svg class="icon-E4cW1l" aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z" fill="#B9BBBE"></path></svg>
              </button>
            </li>
            <li>
              <button className="leavebutt" onClick={()=> this.modalOpen("leave-server")}>
              Leave Server
              <svg class="icon-E4cW1l" aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24"><path fill="#ED4245" d="M10.418 13L12.708 15.294L11.292 16.706L6.586 11.991L11.294 7.292L12.707 8.708L10.41 11H21.949C21.446 5.955 17.177 2 12 2C6.486 2 2 6.487 2 12C2 17.513 6.486 22 12 22C17.177 22 21.446 18.046 21.949 13H10.418Z"></path></svg>
              </button>
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
