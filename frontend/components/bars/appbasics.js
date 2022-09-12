import React from 'react';
import ConversationsListContainer from "../conversations/conversation_list_container"
import FriendListContainer from '../conversations/friend_list_container.jsx';
import ChannelContainer from "../channels/channel_container.jsx";
import ServerContainer from "../servers/servers_container.jsx"
import { Link } from 'react-router-dom';
import {ProtectedRoute} from "../../util/route_util"
import consumer from '../../consumer';

import SettingsContainer from "../settings/settings_container.js"
import Modal from "../modal.jsx"
import FullModal from "../fullmodal.jsx"
import notif from '../../../app/assets/sounds/notification.mp3'
import { readConversation } from '../../util/conversations_api_util';

// import TempServerContainer from "../servers/temp_server_container.jsx"

import {
  Route
} from 'react-router-dom';
import Footerr from './footer';
import DropdownModal from '../modals/dropdown_modal';
import SearchModal from '../modals/search_modal';

class AppBasics extends React.Component {
  constructor(props) {
    super(props);
    
    this.openSettings = this.openSettings.bind(this);
    this.response = null;
    this.audio = new Audio(notif);
  }

  componentDidMount()
  {
    this.props.getServersList(this.props.currentUser.id);
    this.props.getConversationList(this.props.currentUser.id); //POSSIBLY EXTRANEOUS!! might need to remove elsewhere because now it's at such a high level in appbasics
    this.enterRoom();
  }

  componentWillUnmount() {
    //removeEventListeners? s
    this.subscription?.unsubscribe();
  }

  enterRoom() {
    // ...
    this.subscription = consumer.subscriptions.create(
      { channel: 'ConversationsNotifChannel'},
      {received: ({type, conversation}) => {
        switch (type) {
          case 'RECEIVE_CONVERSATION_NOTIF':
            if(`#/conversations/${conversation.id}` !== window.location.hash)
            {
              this.props.newUnreadMessage(conversation);
              this.audio.play();
            }
            else
            {
              readConversation(conversation.id, this.props.currentUser.id);
            }
            break;
          default:
            console.log('Unhandled broadcast: ', type);
            break;
        }
      }
    }
    
    );
  }

  openSettings()
  {
    this.props.openSettings()
  }

  render()
  {
    console.log(this.props.unreadConvos, "inksiee")
    let {username, status, fourdigit_id, pfp_url} = this.props.currentUser;
    console.log("AFLDSF", this.props.serversList);
    console.log(this.props.serversList.length);

    let serverList = this.props.serversList.map( (server, index) => {
      if(!server.image_url)
      {
        if(index === this.props.serversList.length - 1)
        {
          return <li><Link className="server-link-top" to={`/servers/${server.id}`}><div>{server.name[0].toUpperCase()}</div></Link></li>
        }
        return <li><Link className="server-link" to={`/servers/${server.id}`}><div>{server.name[0].toUpperCase()}</div></Link></li>
      }
      else
      {
        if(index === this.props.serversList.length - 1)
        {
          return <li><Link className="server-link-top" to={`/servers/${server.id}`}><img src={server.image_url}></img></Link></li>
        }
        return <li><Link className="server-link" to={`/servers/${server.id}`}><img src={server.image_url}></img></Link></li>
      }

    }).reverse()

    let urmom = this.props.unreadConvos.map((convo) => {
      return <li><Link to={`/conversations/${convo.id}`} style={{position: "absolute", textDecoration: "none"}}>
      <img src={convo.otherUser.pfp_url}></img>
        <aside>
        <p>{Math.min(convo.unread, 99)}</p>
        <svg id="bruh4444" height="27" width="27"><circle cx="13.5" cy="13.5" r="10" stroke="#202225" strokeWidth="3.5" fill="#D83C3E"></circle> </svg>
        </aside>
      </Link></li>
    })

    let useronlinestatus = null;
    if(status === "online")
    {
      useronlinestatus = <svg height="15" width="15"><circle cx="7.5" cy="7.5" r="6" stroke="#2f3136" strokeWidth="2.25" fill="#3ba55d" /> </svg> 
    }
    else if (status === "offline")
    {
      useronlinestatus = <svg height="15" width="15"><circle cx="7.5" cy="7.5" r="3.75" stroke="#96989d" strokeWidth="2.25" fill="#2f3136" /> <circle cx="7.5" cy="7.5" r="6" stroke="#2f3136" strokeWidth="2.25" fill="none" /> </svg> 
    }
    else if (status === "busy")
    {
      useronlinestatus = <svg height="15" width="15"><circle cx="7.5" cy="7.5" r="6" stroke="#2f3136" strokeWidth="2.25" fill="#D83C3E" /> </svg> 
      
    }
    else if (status === "idle")
    {
      useronlinestatus = <svg height="15" width="15"><circle cx="7.5" cy="7.5" r="6" stroke="#2f3136" strokeWidth="2.25" fill="#faa81b" /> </svg> 
    }

    let searchMaybe = "";
    if(this.props.modal && this.props.modal.namee === "search-message")
    {
      searchMaybe = <SearchModal></SearchModal>
    }
    
    return(
        <main>
            {/* <h1>Servers</h1> */}
            <nav id="server-sidebar">
              <ul className="server-icons">
                <li style={{height: "44px"}}>
                  <Link to="/conversations">
                    <img id="" src={window.homeicon}/>
                  </Link>
                </li>
                {urmom}
                {serverList /*below is temp*/ }
                <li>
                  <button id="add-server-button" onClick={() => this.props.displayCreateServerModal()}>
                    <img src={window.addserver} alt="Add a Server"/>
                  </button>
                </li>
              </ul>
            </nav>
            <div>
            <Footerr username={username} fourdigit_id={fourdigit_id} openSettings={this.openSettings} useronlinestatus={useronlinestatus} pfp_url={pfp_url} displayModal={this.props.displayModal}/>
            </div>
            <Route path="/channels/:channelId" component={ServerContainer} /> 
            <Route path="/conversations" component={ConversationsListContainer} />
            <Route exact path="/conversations" component={FriendListContainer} />
            <FullModal/>
            <Modal/>
            <DropdownModal/>
            {searchMaybe}
      </main> 
    )
  }
}

export default AppBasics;
