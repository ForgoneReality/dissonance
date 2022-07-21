import React from 'react';
import ConversationsListContainer from "../conversations/conversation_list_container"
import FriendListContainer from '../conversations/friend_list_container.jsx';
import ChannelContainer from "../channels/channel_container.jsx";
import ServerContainer from "../servers/servers_container.jsx"
import { Link } from 'react-router-dom';
import {ProtectedRoute} from "../../util/route_util"

import SettingsContainer from "../settings/settings_container.js"
import Modal from "../modal.jsx"
import FullModal from "../fullmodal.jsx"

// import TempServerContainer from "../servers/temp_server_container.jsx"

import {
  Route
} from 'react-router-dom';
import Footerr from './footer';

class AppBasics extends React.Component {
  constructor(props) {
    super(props);
    
    this.openSettings = this.openSettings.bind(this);
    this.response = null;
  }

  componentDidMount()
  {
    this.props.getServersList(this.props.currentUser.id);
    this.props.getChannel
  }

  openSettings()
  {
    this.props.openSettings()
  }

  render()
  {
    let {username, status, fourdigit_id, pfp_url} = this.props.currentUser;
    let serverList = this.props.serversList.map( (server) => {
      if(!server.image_url)
      
        return <li><Link className="server-link" to={`/servers/${server.id}`}><div>{server.name[0].toUpperCase()}</div></Link></li>
      else
        return <li><Link className="server-link" to={`/servers/${server.id}`}><img src={server.image_url}></img></Link></li>

    }).reverse()

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
    
    console.log(this.response);
    return(
        <main>
            {/* <h1>Servers</h1> */}
            <nav id="server-sidebar">
              <ul className="server-icons">
                
                <li>
                  <Link to="/conversations">
                    <img id="" src={window.homeicon}/>
                  </Link>
                </li>
                {serverList /*below is temp*/ }
                <li>
                  <button id="add-server-button" onClick={() => this.props.displayCreateServerModal()}>
                    <img src={window.addserver} alt="Add a Server"/>
                  </button>
                </li>
              </ul>
            </nav>
            <div>
            <Footerr username={username} fourdigit_id={fourdigit_id} openSettings={this.openSettings} useronlinestatus={useronlinestatus} pfp_url={pfp_url}/>
            </div>
            <Route path="/channels/:channelId" component={ServerContainer} /> 
            <Route path="/conversations" component={ConversationsListContainer} />
            <Route exact path="/conversations" component={FriendListContainer} />
            <FullModal/>
            <Modal/>
        </main> 
    )
  }
}

export default AppBasics;
