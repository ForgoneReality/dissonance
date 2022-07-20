import React from 'react';
import {
    Link, Route
  } from 'react-router-dom';

import Channel from "../channels/channel.js"
import ChannelContainer from '../channels/channel_container.jsx';

import { fetchChannel } from '../../util/channels_api_util.jsx';

class Server extends React.Component {
  constructor(props) {
    super(props);
   
    this.renderErrors = this.renderErrors.bind(this)
    
  }

  componentDidMount()
  { 
    fetchChannel(this.props.channelId).then( (res) => {
      this.props.fetchServer(res.channel.server_id);
    });
    this.props.removeErrors();
  }

  renderErrors() {

    if(this.props.errors.length > 0)
    {
      return(
        <ul>
          {this.props.errors.map((error, i) => (
            <li key={`error-${i}`}>
              {error}
            </li>
          ))}
        </ul>
      )
    }
    else
    {
      return null;
    }
  }

  render() {
    let usersList = this.props.usersList.map( (user) => {
      let useronlinestatus = null;
      if(user.status === "online")
      {
        useronlinestatus = <svg height="15" width="15"><circle cx="7.5" cy="7.5" r="6" stroke="#2f3136" strokeWidth="2.25" fill="#3ba55d" /> </svg> 
      }
      else if (user.status === "offline")
      {
        useronlinestatus = <svg height="15" width="15"><circle cx="7.5" cy="7.5" r="3.75" stroke="#96989d" strokeWidth="2.25" fill="#2f3136" /> <circle cx="7.5" cy="7.5" r="6" stroke="#2f3136" strokeWidth="2.25" fill="none" /> </svg> 
      }
      else if (user.status === "busy")
      {
        useronlinestatus = <svg height="15" width="15"><circle cx="7.5" cy="7.5" r="6" stroke="#2f3136" strokeWidth="2.25" fill="#D83C3E" /> </svg> 
        
      }
      else if (user.status === "idle")
      {
        useronlinestatus = <svg height="15" width="15"><circle cx="7.5" cy="7.5" r="6" stroke="#2f3136" strokeWidth="2.25" fill="#faa81b" /> </svg> 
      }


      return <li key={user.id}>
      <div>
        <div className="convolisting">
            <div className="bruh001">

            <img className="sidepfp" src={user.pfp_url}></img>
            <div className="useronlinestatusicon">
              {useronlinestatus}
            </div>
          </div>
          <div>
            <p>{user.username}</p>
            {/* put user status in here way later */}
          </div>
          
        </div>
      </div>
      </li>
    })

    let channelsList = this.props.channelsList.map( (channel) => {
      return <Link to={`/channels/${channel.id}`}><li key={channel.id}>
        <img src={window.hashtag} alt="hashtag-icon"></img>
        <p>{channel.name}</p>
        </li>
      </Link>
    })

    let serverName;
    let channelContent;
    if(Object.keys(this.props.channels).length > 0 && Object.keys(this.props.channels).includes(this.props.channelId.toString()))
    {

      channelContent = <ChannelContainer channelId={this.props.channelId}/>;
      serverName = this.props.servers[this.props.channels[this.props.channelId].server_id].name;
    }

    return (
       <section className="server">
          <div id="serverlisty">
            <div id="server-name">
              <h1 >{serverName}</h1>
            </div>
            <ul className = "ChannelsList">
              {channelsList}
            </ul>
          </div>

        {channelContent}
        <div className = "UsersList">
            <div id="channel-users-list-header">

            </div>
            <ul id="channel-users-list">
              {usersList}
            </ul>
        </div>

      </section>
    );
  }
}

export default Server;
