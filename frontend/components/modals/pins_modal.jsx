import React from "react";
import { connect } from 'react-redux';
import { displayModal, hideModal, displayFullModal } from "../../actions/modal_actions";
import {searchServer} from "../../actions/servers_actions"

class SearchModal extends React.Component{
constructor(props) {
    super(props);
  }

  render() {
    let stuff = "";
    if(Array.isArray(this.props.pinnedMsgs) && this.props.pinnedMsgs.length > 0)
    {
      stuff = this.props.pinnedMsgs.map((msg) => {
        let datemsg;
        let user = this.props.users.find((user) => user.id === msg.author_id);
        let date = (Date.parse(msg.created_at));
        let dmy = new Date(date);

        let today = new Date();
        if (dmy.toDateString() === today.toDateString())
        {
          datemsg = "Today at " + dmy.toLocaleTimeString("en-us", {hour: "numeric", minute: "numeric"});
        }
        else
        {
          datemsg = dmy.toDateString();
        }
        
        return(
          <div>
            <div id="msgfiller"></div>
            <div className="message2">
              <img class="dm-pfp" src={user.pfp_url}/>
              <div>
                <h2>
                  <span class="message-username">{user.username}</span>
                  <span class="message-date">{datemsg}</span>
                </h2>
                <p class="msg-content"  style={{width: "294px"}}>{msg.content}</p>
              </div> 
            </div>
          </div>
        )
      })
    }


   return(
    <div id="search-results" style={{right: "286px"}} onClick={(e) => e.stopPropagation()}>
      <div id="bruh4941">
        Pinned Messages
      </div>
      <div id="bruh4055">
        {stuff}
      </div>
    </div>
   )
    }
}

const mapStateToProps = (state) => {
  return {
    modal: state.ui.modal,
    server_id: state.current.server.id,
    users: Object.values(state.entities.users),
    pinnedMsgs: Object.values(state.entities.messages).filter((msg) => msg.pinned).reverse()

  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => dispatch(hideModal()),
    displayModal: (modal) => dispatch(displayModal(modal)),
    displayFullModal: (modal) => dispatch(displayFullModal(modal)),
    searchServer: (server_id, query) => dispatch(searchServer(server_id, query))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchModal);
