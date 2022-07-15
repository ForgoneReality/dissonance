import React from 'react';
import ConversationsListContainer from "../conversations/conversation_list_container"
import FriendListContainer from '../conversations/friend_list_container.jsx';
import ChannelContainer from "../channels/channel_container.jsx";
import ServerContainer from "../servers/servers_container.jsx"
import { Link } from 'react-router-dom';
import {ProtectedRoute} from "../../util/route_util"

// import TempServerContainer from "../servers/temp_server_container.jsx"

import {
  Route
} from 'react-router-dom';

class AppBasics extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount()
  {
    document.body.style = 'background: white; overflow: visible;'
    this.props.getServersList(this.props.currentUser.id);
    this.props.getChannel
  }

  render()
  {

    let {username, status, fourdigit_id} = this.props.currentUser;
    let serverList = this.props.serversList.map( (server) => {
      return <li><Link to={`/servers/${server.id}`}>{server.name}</Link></li>
    })
    
    return(
        <main>
            <h1>Servers</h1>
            {serverList /*below is temp*/ }
            <Route path="/channels/:channelId" component={ServerContainer} /> 
            <Route path="/conversations" component={ConversationsListContainer} />
            <Route exact path="/conversations" component={FriendListContainer} />
            <footer className="userFooter">
                <h2>{username}</h2>
                <h3>{status}</h3>
                <p>{fourdigit_id}</p>
            </footer>
        </main>
    )
  }
}

export default AppBasics;
