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
    // console.log("YYO", Object.values(this.props.search))
    if(Array.isArray(this.props.search) && this.props.search.length > 0)
    {
      stuff = this.props.search.map((msg) => {
        let datemsg;
        // let user = this.props.users.find((user) => user.id === msg.author_id);
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
        let ch = this.props.channels.find((channel) => channel.id === msg.location_id);
        let channelHeader = <div id="bruh4133">{`# ${ch.name}`}</div>
        let maybeImage = msg.image_url ? <img src={msg.image_url} style={{maxWidth: "294px", height: "auto"}}></img> : ""
        return(
          <div>
            <div id="msgfiller"></div>
            {channelHeader}
            <div className="message2">
              <img class="dm-pfp" src={msg.pfp_url}/>
              <div>
                <h2>
                  <span class="message-username">{msg.author_name}</span>
                  <span class="message-date">{datemsg}</span>
                </h2>
                <p class="msg-content"  style={{width: "294px"}}>{msg.content}</p>
                {maybeImage}
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
  console.log("$$$", state.current.search)
  return {
    modal: state.ui.modal,
    search: Object.values(state.current.search), //bad code... non-inituitive state but search is currently occupied by something else and I'd rather not refactor atm
    server_id: state.current.server.id,
    users: Object.values(state.entities.users),
    channels: Object.values(state.entities.channels)
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
