import React from 'react';
import ConversationsListContainer from "../conversations/conversation_list_container"
import FriendListContainer from '../conversations/friend_list_container.jsx';
import ChannelContainer from "../channels/channel_container.jsx";
import ServerContainer from "../servers/servers_container.jsx"
import { Link } from 'react-router-dom';
import {ProtectedRoute} from "../../util/route_util"

import home_button from "../../../app/assets/images/home.png"

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
    document.body.style = 'background: white;'
    this.props.getServersList(this.props.currentUser.id);
    this.props.getChannel
  }

  render()
  {

    let {username, status, fourdigit_id} = this.props.currentUser;
    let serverList = this.props.serversList.map( (server) => {
      return <li><Link className="server-link" to={`/servers/${server.id}`}><div>{server.name[0].toUpperCase()}</div></Link></li>
    })
    
    return(
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
              <Route path="/channels/:channelId" component={ServerContainer} /> 
              <Route path="/conversations" component={ConversationsListContainer} />
              <footer className="userFooter">
                <div>
                  <h2>{username}</h2>
                  <p>#{fourdigit_id}</p>
                </div>
                <h3>{status}</h3>
              </footer>
            </div>
            <Route exact path="/conversations" component={FriendListContainer} />
           
        </main>
    )
  }
}

export default AppBasics;
