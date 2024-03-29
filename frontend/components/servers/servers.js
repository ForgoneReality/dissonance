import React from 'react';
import {
    Link, Route
  } from 'react-router-dom';

import Channel from "../channels/channel.js"
import ChannelContainer from '../channels/channel_container.jsx';

import { fetchChannel } from '../../util/channels_api_util.jsx';
import $ from 'jquery';

class Server extends React.Component {
  constructor(props) {
    super(props);
   
    this.state ={
      searchmsg: "",
      searchlisting: 0
    }
    this.renderErrors = this.renderErrors.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    
  }

  componentDidMount()
  { 
    // document.getElementById("overhere1").addEventListener('click', () => {
    //   if(this.state.searchlisting === 0)
    //   {
    //     this.setState({searchlisting: 1});
    //   }
    //   else if(this.state.searchlisting === 1)
    //   {
    //     //do nothing  
    //   }
    // })
    fetchChannel(this.props.channelId).then( (res) => {
      this.props.fetchServer(res.channel.server_id);
    });
    
    this.props.removeErrors();
  }
  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit()
  {
    let msg = this.state.searchmsg;
    //below is inefficient code which I wouldn't have done on a coding challenge but suffices for the purpose of the project
    const re1 = / ?from:.+#[0-9]{4} ?/g; //from: blah#1234
    const re2 = / ?in:[A-Za-z0-9_-]+ ?/g;
    const re3 = / ?has:[A-Za-z]+ ?/g;
    const re4 = / ?pinned: ?/g;

    let user = "";
    let channel = "";
    let has_image = false;
    let has_link = false;
    let pinned = false;

    let ans = re1.exec(msg);
    if(ans)
    {
      msg = msg.split(ans[0]).join("");
      user = ans[0].trim().slice(5);
    }

    let ans2 = re2.exec(msg);
    if(ans2)
    {
      msg = msg.split(ans2[0]).join("");
      channel = ans2[0].trim().slice(3);

    }
    
    let ans3 = re3.exec(msg);
    if(ans3)
    {
      let a = ans3[0].trim().slice(4).toLowerCase();

      if(a === "image")
      {
        msg = msg.split(ans3[0]).join("")
        has_image = true;
      }
      else if (a === "link")
      {
        msg = msg.split(ans3[0]).join("")
        has_link = true;
      }
    }

    let ans4 = re4.exec(msg);
    if(ans4)
    {
      msg = msg.split(ans4[0]).join("");
      pinned = true;
    }
  this.props.displayModal("search-message", {msg: msg, channel: channel, has_image: has_image, has_link: has_link, pinned: pinned, user: user})
  this.setState({searchlisting: 0});
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
    let templabel = <div id="bruh4111">{`MEMBERS — ${this.props.usersList.length}`}</div>;
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
      return +channel.id === +this.props.channelId ? <Link to={`/channels/${channel.id}`}><li id="bruh3095" key={channel.id}>
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
        <span className="setting-btn">{channelButton}</span>
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

    let search_img = this.state.searchmsg === "" ? <svg aria-hidden="true" role="img" width="18" height="18" viewBox="0 0 24 24"><path fill="#A3A6AA" d="M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.11 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.11 14.242 14.243C13.109 15.376 11.603 16 10 16Z"></path></svg> : 
    <svg onClick={() => {this.setState({usermsg: ""}); this.props.hideModal(); document.getElementById("overhere1").value = "";}} aria-hidden="true" role="img" width="16" height="16" viewBox="0 0 24 24"><path fill="#A3A6AA" d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"></path></svg>


    let channelListUh2 = this.state.searchlisting === 3 ? <div id ="butut">
    <p>IN CHANNEL</p>
    <ul>
    {this.props.channelsList.map((ch) => <li onClick={() => {
      let yourboy = document.getElementById("overhere1");
      yourboy.value += ` in:${ch.name}`;
      this.setState({searchlisting: 0, searchmsg: `${this.state.searchmsg} in:${ch.name}`});
      $("#overhere1").trigger("focus");
    }}># {ch.name}</li>)}
    </ul>
    </div> : null

    let extendedUserList = this.props.usersList.map((user) => [user.username + "#" + user.fourdigit_id, user.pfp_url]);
    const re5 = /from:[a-zA-Z0-9#]*$/;

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
              <form id="bruh6662" autocomplete="off" onSubmit={this.handleSubmit} onClick={() => this.setState({searchlisting: 1})}>
                <input id="overhere1" type="text" placeholder="Search" onChange={this.update("searchmsg")} ></input>
              </form>
              {search_img}
            </div>
            {this.state.searchlisting === 0 && re5.exec(this.state.searchmsg) ? 
              <div id ="butut">
              <p>FROM USER</p>
              <ul>
              {
                extendedUserList.filter((user) => user[0].includes(re5.exec(this.state.searchmsg)[0].slice(5))).map((usr) => <li style={{gap: "8px"}} onClick={() => {
                    let yourboy = document.getElementById("overhere1");
                    yourboy.value += usr[0] + " ";
                    this.setState({searchmsg: this.state.searchmsg + usr[0] + " "});
                    $("#overhere1").trigger("focus");
                }}>
                <img src={usr[1]} style={{width: "24px", height: "24px", borderRadius: "50%"}}></img>
                {usr[0]}
                </li>)
              }
              </ul>
              </div> : null
            }
            {this.state.searchlisting === 1 ? <div id="butut">
              <p>SEARCH OPTIONS</p>
              <ul>
                <li onClick={() => {
                  let yourboy = document.getElementById("overhere1");
                  yourboy.value += " from:";
                  this.setState({searchlisting: 0, searchmsg: this.state.searchmsg + " from:"});
                  $("#overhere1").trigger("focus");
                }}><span style={{fontWeight: "bold"}}>from:</span>&nbsp;&nbsp;&nbsp;user</li>
                <li onClick={
                  () =>{
                  this.setState({searchlisting: 2});
                  }
                }><span style={{fontWeight: "bold"}}>has:</span>&nbsp;&nbsp;&nbsp;link or file</li>
                <li onClick={() => this.setState({searchlisting: 3})}><span style={{fontWeight: "bold"}}>in:</span>&nbsp;&nbsp;&nbsp;channel</li>
                <li onClick={() => {
                  let yourboy = document.getElementById("overhere1");
                  yourboy.value += " pinned:";
                  this.setState({searchlisting: 0, searchmsg: this.state.searchmsg + " pinned:"});
                  $("#overhere1").trigger("focus");
                }}><span style={{fontWeight: "bold"}}>pinned:</span>&nbsp;&nbsp;&nbsp;</li>
              </ul>

            </div> 
            : null}
            {this.state.searchlisting === 2 ? <div id="butut">
            <p>SEARCH OPTIONS</p>
              <ul>
                <li onClick={() => {
                  let yourboy = document.getElementById("overhere1");
                  yourboy.value += " has:image";
                  this.setState({searchlisting: 0, searchmsg: this.state.searchmsg + " has:image"});
                  $("#overhere1").trigger("focus");
                }
                }>image</li>
                <li onClick={() => {
                  let yourboy = document.getElementById("overhere1");
                  yourboy.value += " has:link";
                  this.setState({searchlisting: 0, searchmsg: this.state.searchmsg + " has:link"});
                  $("#overhere1").trigger("focus");
                }
                }>link</li>
              </ul>
              
            </div> : null}
            {channelListUh2}
            {this.state.searchlisting !== 0 ? <div id="butut-background" onClick={() => {this.setState({searchlisting: 0});
              }}> 
            </div> 
            : null}
          </div>
          <div>
            {templabel}
            <ul id="channel-users-list">
              {usersList}
            </ul>
          </div>
        </div>

      </section>
    );
  }
}

export default Server;
