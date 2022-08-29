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

      let displayed_name = user.nickname ? user.nickname : user.username;
      return <li key={user.id} onClick={() => this.props.displayModal("user-modal", user)}>
      <div>
        <div className="convolisting">
            <div className="bruh001">

            <img className="sidepfp" src={user.pfp_url}></img>
            <div className="useronlinestatusicon">
              {useronlinestatus}
            </div>
          </div>
          <div>
            <p>{displayed_name}</p>
            {/* put user status in here way later */}
          </div>
          
        </div>
      </div>
      </li>
    })
   
    let channelButton = this.props.isOwner ? <button id="bruh04581" onClick={() => this.props.displayFullModal("channelsettings")}>
    <svg className="actionIcon-2sw4Sl" aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 16 16"><path fill="#96989D" fillRule="evenodd" clipRule="evenodd" d="M14 7V9C14 9 12.5867 9 12.5733 9.00667C12.42 9.58667 12.1733 10.1267 11.84 10.6067L12.74 11.5067L11.4933 12.7533L10.5933 11.8533C10.1133 12.1867 9.57334 12.44 8.99334 12.5867V14H6.99334V12.58C6.41334 12.4333 5.87334 12.18 5.39334 11.8467L4.49333 12.7467L3.24667 11.5L4.14667 10.6C3.81333 10.1267 3.56 9.58 3.41333 9H2V7H3.41333C3.56 6.42 3.81333 5.88 4.14667 5.4L3.24667 4.5L4.5 3.24667L5.4 4.14667C5.87334 3.81333 6.42 3.56 7 3.41333V2H9V3.41333C9.58 3.56667 10.12 3.81333 10.6 4.14667L11.5067 3.25333L12.7533 4.5L11.8533 5.4C12.1867 5.87334 12.44 6.42 12.5867 7H14ZM8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"></path></svg>
  </button> : ""

  let channelsList = this.props.channelsList.map( (channel) => {
      return channel.id === this.props.channelId ? <Link to={`/channels/${channel.id}`}><li id="bruh3095" key={channel.id}>
        <div style={{display: "flex", gap: "5px"}}>
          <img src={window.hashtag} alt="hashtag-icon"></img>
          <p>{channel.name}</p>
        </div>
        {channelButton}
        </li> </Link> : <Link to={`/channels/${channel.id}`}><li id="bruh3094" key={channel.id}>
        <div style={{display: "flex", gap: "5px"}}>
          <img src={window.hashtag} alt="hashtag-icon"></img>
          <p>{channel.name}</p>
        </div>
        {channelButton}
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
              <button onClick={() => this.props.displayModal("server-settings")}>
                <img src={window.dropdown} alt="dropdown-icon" />
              </button>

            </div>
            <ul className = "ChannelsList">
              {channelsList}
            </ul>
          </div>
        
        {channelContent}
        <div className = "UsersList">
            <div id="channel-users-list-header">
              <div id="search-bar">
                <input type="text" placeholder="Search"></input>
                <svg class="icon-18rqoe visible-2yTnyW" aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24"><path fill="#A3A6AA" d="M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.11 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.11 14.242 14.243C13.109 15.376 11.603 16 10 16Z"></path></svg>
              </div>
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
