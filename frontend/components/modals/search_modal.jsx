import React from "react";
import { connect } from 'react-redux';
import { displayModal, hideModal, displayFullModal } from "../../actions/modal_actions";
import {searchServer} from "../../actions/servers_actions"

class SearchModal extends React.Component{
constructor(props) {
    super(props);
    this.modalOpen = this.modalOpen.bind(this)

  }


  componentDidMount()
  {
    this.props.searchServer(this.props.server_id, {content: this.props.modal.payload});
  }

  componentDidUpdate(prevProps)
  {
    if(prevProps.modal.payload !== this.props.modal.payload)
    {
      this.props.searchServer(this.props.server_id, {content: this.props.modal.payload});
    }
  }

  modalOpen(modalname) //no idea why i have this
  {
    this.props.displayModal(modalname);
  }



  render() {
    let count;
    let stuff = "";
    if(Array.isArray(this.props.search) && this.props.search.length > 0)
    {
      stuff = this.props.search.map((msg) => {
        let datemsg;
        console.log(user, "UFPIVPO");
        console.log(this.props.users)
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
            <div className="message">
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
      count = `${this.props.search.length} Results`;
    }
    else
    {
      count = "No Results";
    }

   return(
    <div id="search-results" onClick={(e) => e.stopPropagation()}>
      <div id="bruh4941">
        {count}
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
    search: state.current.search, //bad code... non-inituitive state but search is currently occupied by something else and I'd rather not refactor atm
    server_id: state.current.server.id,
    users: Object.values(state.entities.users)
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
