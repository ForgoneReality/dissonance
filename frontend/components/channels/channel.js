import React from 'react';
// import ScrollComponent from '../utility/scroll_component';

import consumer from '../../consumer';
import {CellMeasurer, CellMeasurerCache, List} from 'react-virtualized';
import { AutoSizer } from 'react-virtualized';

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
      photoUrl: null
    }

    this._cache = new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 71
    })

    this.rowRenderer = this.rowRenderer.bind(this);
    this.showUsersTemp = this.showUsersTemp.bind(this);
  }

  submitOnEnter(event){
    if(event.which === 13){
        event.target.form.dispatchEvent(new Event("submit", {cancelable: true}));
        event.preventDefault(); // Prevents the addition of a new line in the text field (not needed in a lot of cases)
        event.target.value = "";
    }
        
  }

  update(property) {
    return e => this.setState({ [property]: e.currentTarget.value });
  }

  showUsersTemp()
  {
    if(this.props.modal && this.props.modal.name === "search-message")
    {
      this.props.hideModal();
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
        this.props.sendMessage( {content: this.state.usermsg, author_id: this.props.currentUser.id, location_type:"Channel", location_id: ch.id}).then((res) => {
          if(this.props.messages.length > 1)
          {
            this._cache.clear(this.props.messages.length - 2);
          }
          this._cache.clear(this.props.messages.length - 1);
        })
    }
    else
    {
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


      })) //something may be slightly off with this... see if sending an image always creates an error
      //first guess is that it's double-sending.
      //I wanna say to use only an action, no util instead of sendMessage
    }
    this.setState({usermsg: "", editmsg: "",
    editing: -1, 
    photoFile: null,
    photoUrl: null});
  }

  handleEditSubmit(e)
  {
    e.preventDefault();
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
            this.setState({editmsg: msg.content}); //needless
            this.firstTime = 1;
          }
          msgContent = (
            <form id="edit-msg-form">
              <textarea id="edit-msg-textform" value={this.state.editmsg} onChange={this.update("editmsg")}></textarea>
              <button className="invisible" type="Submit">Edit</button>
            </form>)

       
          if(this.firstTime === 1)
          {
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
          deleteButton = (<button id="delete-msg-button" onClick={() => {if(!this.state.bot){this.props.deleteMessage(msg.id)}}}>
             <img src={window.deleteicon}/>
          </button>)

          editButton = <button id="edit-msg-button" onClick={() => {
            this.firstTime = 2;
            this.setState({editing: msg.id});
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
          <div className="message">
            {mypfp}
            <div>
              {msgHeader}
              <p className="msg-content">{msg.content}</p>
              {msg.image_url ? <img onLoad={measure} className="msg-img" src={msg.image_url}></img> : ""}
            </div>
          </div>
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
        <div id="msg-form-wrapper" style={{width: "calc(100vw - 562px)"}}>
            <img src={window.uploadimg}></img>
            <div id="msg-form-bubble">
              <form id="msg-form">
                <label htmlFor="img-uploader">
                  <img src={window.upload} alt="upload-icon"/>
                </label> 
                <input type="file" id="img-uploader"  onChange={this.handleFile}></input>
                <input type="text" id="usermsg" value={this.state.usermsg} onChange={this.update("usermsg")} placeholder={`Message @${currChannelName}`}></input>
                <button className="invisible" type="Submit">Submit</button>
              </form>
            </div> 
          </div>
          
        {this.renderErrors()}
      </div>
    );
  }
}

export default Channel;
