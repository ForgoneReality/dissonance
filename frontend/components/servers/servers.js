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
      console.log("result", res);
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
      return <li key={user.id}>{user.username} : {user.status}</li>
    })

    let channelsList = this.props.channelsList.map( (channel) => {
      return <li key={channel.id}><Link to={`/channels/${channel.id}`}>{channel.name}</Link></li>;
    })

    let serverName;
    let channelContent;
    if(Object.keys(this.props.channels).length > 0 && Object.keys(this.props.channels).includes(this.props.channelId.toString()))
    {
      console.log("all props: ", this.props);

      channelContent = <ChannelContainer channelId={this.props.channelId}/>;
      serverName = this.props.servers[this.props.channels[this.props.channelId].server_id].name;
    }

    return (
       <section className="server">
          <h1>Server: {serverName}</h1>
          <div className = "UsersList">
            <h2>Users</h2>
            {usersList}
          </div>
          <div className = "ChannelsList">
            <h2>Channels</h2>
            {channelsList}
          </div>

        {channelContent}
          
      </section>
    );
  }
}

export default Server;
