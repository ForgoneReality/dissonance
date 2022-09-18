import React from 'react';
// import ScrollComponent from '../utility/scroll_component';

import consumer from '../../consumer';
import {CellMeasurer, CellMeasurerCache, List} from 'react-virtualized';
import { AutoSizer } from 'react-virtualized';
import { fetchAllInviteLinks } from '../../util/servers_api_util';

class Channel extends React.Component {
  constructor(props) {
    super(props);
    
    this.renderErrors = this.renderErrors.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEditSubmit = this.handleEditSubmit.bind(this)
    this.handleFile = this.handleFile.bind(this)
    this.firstTime = -1;
    this.state = {
      usermsg: "",
      editmsg: "",
      editing: -1,
      photoFile: null,
      photoUrl: '',
      lastedited: -1
    }
    this.updating = -1;

    this._cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 71
    })
    window.cc = this._cache;
    

    this.rowRenderer = this.rowRenderer.bind(this);
    this.showUsersTemp = this.showUsersTemp.bind(this);
    this.bindListRef = this.bindListRef.bind(this);
  }


  bindListRef = ref => {
    this.list = ref;
    window.listt = this.list;
  };

  submitOnEnter(event){
    if(event.which === 13){
        event.target.form.dispatchEvent(new Event("submit", {cancelable: true}));
        event.preventDefault(); // Prevents the addition of a new line in the text field (not needed in a lot of cases)
        event.target.value = "";
    }
  }

  bold(text){
    const bold = /\*\*(.*?)\*\*/gm;
    const italics = /\*(.*?)\*/gm;
    const underline = /\_\_(.*?)\_\_/gm;

    let html = text.replace(bold, '<strong>$1</strong>');   
    html = html.replace(italics, '<i>$1</i>');  
    html = html.replace(underline, '<u>$1</u>');  

    
    return {__html: html};
}


  update(property) {
    if(property === "editmsg")
    {
      this.updating = 1; 
    }
    return e => this.setState({ [property]: e.currentTarget.value });
  }

  showUsersTemp()
  {
    if(this.props.modal && this.props.modal.name === "search-message")
    {
      this.props.hideModal();
    }
  }

  handleBotMessage(usermsg)
  {
    if(!this.dinobot)
      this.dinobot = this.props.usersList.find((user) => user.username === "Dino Bot" && user.fourdigit_id === "1337")
      
    switch(usermsg)
    {
      case "!commands":
        this.props.sendMessage( {content: "**List of All Commands:**", author_id: this.dinobot.id, location_type:"Channel", location_id: this.props.channelId}).then((res) => {
          this.props.sendMessage( {content: "*!commands:* Lists out all available commands", author_id: this.dinobot.id, location_type:"Channel", location_id: this.props.channelId}).then(() => {
          this.props.sendMessage( {content: "*!walkthrough:* Walks through the basic core CRUD functionality of Dissonance of servers, users, and DMs", author_id: this.dinobot.id, location_type:"Channel", location_id: this.props.channelId}).then(() => {
          this.props.sendMessage( {content: "*!features:* Displays the features of Dissonance that make it unique from other Discord clones", author_id: this.dinobot.id, location_type:"Channel", location_id: this.props.channelId}).then(() => {
          this.props.sendMessage( {content: "*!serverlist:* Lists invite links for all existing servers in the database", author_id: this.dinobot.id, location_type:"Channel", location_id: this.props.channelId}).then(() => {
          this.props.sendMessage( {content: "*!socials:* Links the socials of the author!", author_id: this.dinobot.id, location_type:"Channel", location_id: this.props.channelId}).then(() => {
            this._cache.clear(this.props.messages.length - 7);
            this._cache.clear(this.props.messages.length - 6);
            this._cache.clear(this.props.messages.length - 5);
            this._cache.clear(this.props.messages.length - 4);
            this._cache.clear(this.props.messages.length - 3);
            this._cache.clear(this.props.messages.length - 2);
            this._cache.clear(this.props.messages.length - 1);
          });
          });
          });
          });
          });
        });
        break;
      case "!serverlist":
        fetchAllInviteLinks().then((res) => {
          let count = res.length;
          let i;
          for(i = 0; i<count - 1; i++)
          {
            this.props.sendMessage( {content: `${res[i][0]}: ${window.location.origin + "/#/invite/" + res[i][1]}`, author_id: this.dinobot.id, location_type:"Channel", location_id: this.props.channelId})
            this.props.sendMessage( {content: `${res[i][0]}: ${window.location.origin + "/#/invite/" + res[i][1]}`, author_id: this.dinobot.id, location_type:"Channel", location_id: this.props.channelId})
          }
          this.props.sendMessage( {content: `${res[i][0]}: ${window.location.origin + "/#/invite/" + res[i][1]}`, author_id: this.dinobot.id, location_type:"Channel", location_id: this.props.channelId}).then(() => {
            for(let j = res.length - 1; res > 0; res--)
            {
              this._cache.clear(j);
            }
          })
          
        })
        break;
      case "!socials":
        this.props.sendMessage( {content: "**Meet the Author**", author_id: this.dinobot.id, location_type:"Channel", location_id: this.props.channelId}).then((res) => {
          this.props.sendMessage( {content: "*Github:* https://github.com/forgonereality", author_id: this.dinobot.id, location_type:"Channel", location_id: this.props.channelId}).then(() => {
          this.props.sendMessage( {content: "*Linkedin:* https://shorturl.at/cDJW5", author_id: this.dinobot.id, location_type:"Channel", location_id: this.props.channelId}).then(() => {
          this.props.sendMessage( {content: "*Angelist:* https://shorturl.at/begV9", author_id: this.dinobot.id, location_type:"Channel", location_id: this.props.channelId}).then(() => {
            this._cache.clear(this.props.messages.length - 5);
            this._cache.clear(this.props.messages.length - 4);
            this._cache.clear(this.props.messages.length - 3);
            this._cache.clear(this.props.messages.length - 2);
            this._cache.clear(this.props.messages.length - 1);
          });
          });
          });
          });
        break;  
      default:
        break;
    }
  }

  enterRoom() {
    // ...
    this.subscription = consumer.subscriptions.create(
      { channel: 'ChannelsChannel', id: this.props.channelId},
      {received: ({type, message, id}) => {
        switch (type) {
          case 'RECEIVE_MESSAGE':
            this.props.receiveMessage(message);
            this._cache.clear(this.props.messages.length - 2);
            this._cache.clear(this.props.messages.length - 1);
            break;
          case 'DELETE_MESSAGE':
            this.props.removeMessage(id);
            break;
          default:
            console.log('Unhandled broadcast: ', type);
            break;
        }
      }
    }
    
    );
  }

  handleSubmit(e)
  {
    e.preventDefault();
    let ch = this.props.channels[this.props.channelId];

    if(!this.state.photoFile)
    {
        const orimsg = this.state.usermsg;
        this.props.sendMessage( {content: this.state.usermsg, author_id: this.props.currentUser.id, location_type:"Channel", location_id: ch.id}).then((res) => {
          if(this.props.messages.length > 1)
          {
            this._cache.clear(this.props.messages.length - 2);
          }
          this._cache.clear(this.props.messages.length - 1);
          if(this.props.channels[this.props.channelId].temp === 2)
          {
            this.handleBotMessage(orimsg);
          }
        })
    }
    else
    {
      const orimsg = this.state.usermsg;

      const formData = new FormData();
      formData.append("message[content]", this.state.usermsg);
      formData.append("message[author_id]", this.props.currentUser.id);
      formData.append("message[location_type]", "Channel");
      formData.append("message[location_id]", ch.id);
      formData.append("message[image])", this.state.photoFile);
      $.ajax({
        url: "/api/messages",
        method: "POST",
        data: formData,
        contentType: false,
        processData: false
      }).then( (response) => this.props.sendMessage(response).then(()=> {
        if(this.props.messages.length > 1)
        {
          this._cache.clear(this.props.messages.length - 2);
        }
        this._cache.clear(this.props.messages.length - 1);
        if(this.props.channels[this.props.channelId].temp === 2)
          {
            this.handleBotMessage(orimsg);
          }

      })) //something may be slightly off with this... see if sending an image always creates an error
      //first guess is that it's double-sending.
      //I wanna say to use only an action, no util instead of sendMessage
    }
    this.setState({usermsg: "", editmsg: "",
    editing: -1, 
    photoFile: null,
    photoUrl: ''});
  }

  handleEditSubmit(e)
  {
    e.preventDefault();
    this.updating = 4;
    this.props.editMessage( {id: this.state.editing, content: this.state.editmsg});
    // this.props.editMessage(this.state.editmsg, this.state.editing);
    this.setState({editmsg: "", editing: -1});
    this.firstTime = -1;
    this.props.removeErrors();
  }

  handleFile(e)
  {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({photoFile: file, photoUrl: fileReader.result});
    }

    if (file){
      fileReader.readAsDataURL(file);
    }   
  }

  componentDidMount()
  {
    document.getElementById("usermsg").addEventListener("keypress", this.submitOnEnter);
    document.getElementById("msg-form").addEventListener("submit", this.handleSubmit);
    this.props.getChannelMessages(this.props.channelId);
    this.enterRoom();
    this.props.removeErrors();
    this.props.removeModals();
  }

  componentDidUpdate(prevProps) {
    const prevConvoId = prevProps.channelId;
    if (prevConvoId !== this.props.channelId) {
      this._cache.clearAll();
      this.props.getChannelMessages(this.props.channelId);
      this.subscription?.unsubscribe();
      this.enterRoom();
    }
    if (this.list && this.updating > 0) {
      this.list.forceUpdateGrid();
      this._cache.clear(this.state.lastedited);
      this.list.recomputeRowHeights(this.state.lastedited);
      this.updating -= 1;
    }
  }

  componentWillUnmount()
  {
    //removeEventListeners?
    this.subscription?.unsubscribe();
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

  noRowsRenderer()
  {
    return(<div id="pain4">Nothing here yet, be the first one to send a message!</div>)
  }

  rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
    parent
  }) {
    // let formatted_msg = <div></div>;
    console.log("trin")
    let msg;
    let deleteButton = null;
    let editButton = null;
    let pinButton = null;
    let datemsg = null;
    // let myimg = null;
    let mypfp = <div className="no-pfp-filler"> </div>;
    let msgHeader = null;
    let filler = null;
    let lastfiller = null;
    let msgContent = null;


    if (this.props.messages.length > 0)
    {
      msg = this.props.messages[index]
  
    
      if(index === this.props.messages.length - 1)
      {
        lastfiller = <div id="msgfiller"> </div>
        
      }
      if(index === 0 || msg.author_id !== this.props.messages[index-1].author_id)
      {
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
        let the_name = msg.nickname ? msg.nickname : msg.author_name

        msgHeader = (<h2>
          <span className="message-username" onClick={() => {
          let user = this.props.usersList.find((u) => 
            u.id === msg.author_id
          );
          this.props.displayModal("user-modal", user);
        }}>{the_name}</span>
          <span className="message-date">{datemsg}</span>
        </h2>)

        mypfp = <img className="dm-pfp" onClick={() => {
          let user = this.props.usersList.find((u) => 
            u.id === msg.author_id
          );
          this.props.displayModal("user-modal", user);
        }} src={msg.pfp_url} alt={msg.pfp_url}/>
        filler = <div id="msgfiller"> </div>
      }

      
      // if (msg.image_url)
      // {
      //   myimg = <img onLoad={measure} className="msg-img" src={msg.image_url}></img>
      // }

      // let msgContent = <div className="message">
      //   {mypfp}
      //   <div>
      //     {msgHeader}
      //     <p className="msg-content">{msg.content}</p>
      //     {myimg}
      //   </div>
      // </div>

      if(this.props.currentUser.id === this.props.currentServer.owner_id) //CHANGE TO ROLE PERMISSIONS WHEN I GET 
      {
        pinButton = <button id="pin-msg-button" onClick={() => this.props.pinMessage(msg.id)}>
        <img src={window.pinicon}/>
     </button>
      }

      if(msg.author_id === this.props.currentUser.id)
      {
        if(this.state.editing === msg.id)
        {
          if(this.firstTime === 2)
          {
            this.updating = 1;
            this.setState({editmsg: msg.content}); //needless
            this.firstTime = 1;
          }
          msgContent = (
            <form id="edit-msg-form">
              <textarea style={{width: "calc(100vw - 690px)"}} id="edit-msg-textform" value={this.state.editmsg} onChange={this.update("editmsg")}></textarea>
              <button className="invisible" type="Submit">Edit</button>
            </form>)

       
          if(this.firstTime === 1)
          {
            this.updating = 1;
            let edittxt = document.getElementById("edit-msg-textform");
            if(edittxt)
            {
              let temp = edittxt.value;
              edittxt.value = "";
              edittxt.value = temp;
              edittxt.focus();

              edittxt.addEventListener("keypress", this.submitOnEnter);
              document.getElementById("edit-msg-form").addEventListener("submit", this.handleEditSubmit);
              this.firstTime = 0;
            }
          }
        }
        else
        {
          console.log("first", msg.id);
          console.log(this.state.editing);
          deleteButton = (<button id="delete-msg-button" onClick={() => {if(!this.state.bot){this.props.deleteMessage(msg.id)}}}>
             <img src={window.deleteicon}/>
          </button>)

          editButton = <button id="edit-msg-button" onClick={() => {
            this.updating = 1;
            this.firstTime = 2;
            this.setState({editing: msg.id, lastedited: index});
          }
          }>
            <img src={window.editmessage}/>
          </button>
          
        }
      }
      // formatted_msg = (<div >
      //   {filler}
      //   {msgContent}
      //   {lastfiller}
      //   <div className="msgbuttons">
      //     {pinButton}
      //     {editButton}
      //     {deleteButton}
      //   </div>
      // </div>)
    }

    return (
      <CellMeasurer key={key} cache={this._cache} parent={parent} columnIndex={0} rowIndex={index}>
        {({measure, registerChild}) => 
        (<div style={style} ref={registerChild} id="single-message" >
          <div >
          {filler}
          { msgContent === null ? <div className="message">
            {mypfp}
            <div>
              {msgHeader}
              <p className="msg-content" dangerouslySetInnerHTML={this.bold(msg.content)}></p>
              {msg.image_url ? <img onLoad={measure} className="msg-img" src={msg.image_url}></img> : ""}
            </div>
          </div> : msgContent
          }
          <div className="msgbuttons">
            {pinButton}
            {editButton}
            {deleteButton}
          </div>
          {lastfiller}
        </div>
         
        </div>)
        }
      </CellMeasurer>

    );

  }

  

  render() {
    console.log("render");

    let currChannelName = "";
    let currChannelDescription = "";
    if(this.props.channelId)
    {
        currChannelName = this.props.channels[this.props.channelId].name;
        if(this.props.channels[this.props.channelId].description)
        {
          currChannelDescription = this.props.channels[this.props.channelId].description;
        }
    }

    let divider = this.props.channels[this.props.channelId].description ? <div className="divider-q3P9HC"></div> : ""
  
    let pinnie = this.props.modal && this.props.modal.name === "pins" ? <svg onClick={() => this.props.displayModal("pins")} x="0" y="0" class="icon-2xnN2Y" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="#FFFFFF" d="M22 12L12.101 2.10101L10.686 3.51401L12.101 4.92901L7.15096 9.87801V9.88001L5.73596 8.46501L4.32196 9.88001L8.56496 14.122L2.90796 19.778L4.32196 21.192L9.97896 15.536L14.222 19.778L15.636 18.364L14.222 16.95L19.171 12H19.172L20.586 13.414L22 12Z"></path></svg> : <svg onClick={() => this.props.displayModal("pins")} x="0" y="0" class="icon-2xnN2Y" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="#B9BBBE" d="M22 12L12.101 2.10101L10.686 3.51401L12.101 4.92901L7.15096 9.87801V9.88001L5.73596 8.46501L4.32196 9.88001L8.56496 14.122L2.90796 19.778L4.32196 21.192L9.97896 15.536L14.222 19.778L15.636 18.364L14.222 16.95L19.171 12H19.172L20.586 13.414L22 12Z"></path></svg>
    console.log("Heybuddy", this.props.channels[this.props.channelId].temp)
    return (
      <div className="channel">
        <div id="channel-header">
          <div style={{display: "flex", alignItems: "center"}}>
            <img id="header-hashtag" src={window.hashtag}></img>
            <h1>{currChannelName}</h1>
            {divider}
            <h2>{currChannelDescription}</h2>
          </div>
          <div style={{display: "flex", paddingRight: "16px", gap: "16px"}}>
            {pinnie}
            <svg onClick={() => this.showUsersTemp()} x="0" y="0" class="icon-2xnN2Y" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="#FFFFFF" fillRule="evenodd" clipRule="evenodd" d="M14 8.00598C14 10.211 12.206 12.006 10 12.006C7.795 12.006 6 10.211 6 8.00598C6 5.80098 7.794 4.00598 10 4.00598C12.206 4.00598 14 5.80098 14 8.00598ZM2 19.006C2 15.473 5.29 13.006 10 13.006C14.711 13.006 18 15.473 18 19.006V20.006H2V19.006Z"></path><path fill="#FFFFFF" fillRule="evenodd" clipRule="evenodd" d="M14 8.00598C14 10.211 12.206 12.006 10 12.006C7.795 12.006 6 10.211 6 8.00598C6 5.80098 7.794 4.00598 10 4.00598C12.206 4.00598 14 5.80098 14 8.00598ZM2 19.006C2 15.473 5.29 13.006 10 13.006C14.711 13.006 18 15.473 18 19.006V20.006H2V19.006Z"></path><path fill="#FFFFFF" d="M20.0001 20.006H22.0001V19.006C22.0001 16.4433 20.2697 14.4415 17.5213 13.5352C19.0621 14.9127 20.0001 16.8059 20.0001 19.006V20.006Z"></path><path fill="#FFFFFF" d="M14.8834 11.9077C16.6657 11.5044 18.0001 9.9077 18.0001 8.00598C18.0001 5.96916 16.4693 4.28218 14.4971 4.0367C15.4322 5.09511 16.0001 6.48524 16.0001 8.00598C16.0001 9.44888 15.4889 10.7742 14.6378 11.8102C14.7203 11.8418 14.8022 11.8743 14.8834 11.9077Z"></path></svg>
          </div>  
        </div>
          <div style={{height: "calc(100vh - 119px)"}}>
            <AutoSizer>
            {({height, width}) => (
              <List
                ref={this.bindListRef}
                id="server-msg-list"
                width={width}
                height={height}
                deferredMeasurementCache={this._cache}
                noRowsRenderer={this.noRowsRenderer}
                rowCount={this.props.messages.length}
                rowHeight={this._cache.rowHeight}
                rowRenderer={this.rowRenderer}
                overscanRowCount={3}//change this later
                scrollToIndex={this.props.messages.length-1}
              />)}
            </AutoSizer>
          </div>
          {this.props.channels[this.props.channelId].temp === 1 ? (<div id="msg-form-wrapper" style={{width: "calc(100vw - 562px)"}}>
            <div id="msg-form-bubble">
              <form id="msg-form">
                <input type="text" readonly disabled id="usermsg" value={this.state.usermsg} onChange={this.update("usermsg")} placeholder={`You cannot send messages in @${currChannelName}`}></input>
              </form>
            </div>
          </div>)
            : (<div id="msg-form-wrapper" style={{width: "calc(100vw - 562px)"}}>
            <img src={window.uploadimg}></img>
            <div id="msg-form-bubble">
              {this.state.photoUrl.length > 0 && (
                <div className='display-image-wrapper-parent'>
                  <div className='display-image-wrapper'>
                    <img
                      class='display-image'
                      src={this.state.photoUrl}
                      alt='upload-icon'
                    ></img>
                    <p className='display-image-url'>{this.state.photoUrl}</p>
                  </div>
                </div>
              )}
              <form id="msg-form">
                <label htmlFor="img-uploader">
                  <img src={window.upload} alt="upload-icon"/>
                </label> 
                <input type="file" id="img-uploader"  onChange={this.handleFile}></input>
                <input type="text" id="usermsg" value={this.state.usermsg} onChange={this.update("usermsg")} placeholder={`Message @${currChannelName}`}></input>
                <button className="invisible" type="Submit">Submit</button>
              </form>
            </div> 
          </div>)
          }
          
        {this.renderErrors()}
      </div>
    );
  }
}

export default Channel;
