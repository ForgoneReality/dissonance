import React from 'react';
import ConversationsListContainer from "../conversations/conversation_list_container"
import FriendListContainer from '../conversations/friend_list_container.jsx';
import ChannelContainer from "../channels/channel_container.jsx";
import ServerContainer from "../servers/servers_container.jsx"
import { Link } from 'react-router-dom';
import {ProtectedRoute} from "../../util/route_util"

import home_button from "../../../app/assets/images/home.png"
import SettingsContainer from "../settings/settings_container.js"
import Modal from "../modal.jsx"
import FullModal from "../fullmodal.jsx"



// import TempServerContainer from "../servers/temp_server_container.jsx"

import {
  Route
} from 'react-router-dom';

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
      return <li><Link className="server-link" to={`/servers/${server.id}`}><div>{server.name[0].toUpperCase()}</div></Link></li>
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
    
    console.log(this.response);
    return(
        <div>
        <FullModal/>
        <Modal/>
        <main>
            {/* <h1>Servers</h1> */}
            <nav id="server-sidebar">
              <ul className="server-icons">
                
                <li>
                  <Link to="/conversations">
                    <img src={home_button}/>
                  </Link>
                </li>
                {serverList /*below is temp*/ }
              </ul>
            </nav>
            <div>
              <footer className="userFooter">
                <div className="bruh001">
                  <img id="footerpfp" className="sidepfp" src={pfp_url} alt="currentUserPFP"></img>
                  <div className="useronlinestatusicon">
                    {useronlinestatus}
                  </div>
                </div>
                <div>
                  <h2>{username}</h2>
                  <p>#{fourdigit_id}</p>
                </div>
                <button onClick={this.openSettings} id="settings-button">
                  <img id="settings-icon" src={window.settingsicon} alt="settings-icon"></img>
                </button>
              </footer>

            </div>
            <Route path="/channels/:channelId" component={ServerContainer} /> 
            <Route path="/conversations" component={ConversationsListContainer} />
            <Route exact path="/conversations" component={FriendListContainer} />

        </main>
        </div>
    )
  }
}

export default AppBasics;
