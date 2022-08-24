import React from 'react';

import consumer from '../../consumer';

// Without context


class Conversation extends React.Component {
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
      photoUrl: null,
      bot: false
    }
    this.responseMessage = null;
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

  enterRoom() {
    // ...
    this.subscription = consumer.subscriptions.create(
      { channel: 'ConversationsChannel', id: this.props.convo.id},
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
    console.log("CURRENT STATE:", this.state);
    let my_msg = `${this.state.usermsg}`

    if(!this.state.photoFile)
    {
      if(this.state.bot)
      {
        let currentConvoList = this.props.messages.map(ele => ele.content);
        currentConvoList.shift();
        $.ajax({
          url: 'http://localhost:3001/',
          type: 'get',
          data: {messageList: currentConvoList,
            newMessage: my_msg
          }
        }).then((resp) => {
          this.responseMessage = resp;
          return this.props.sendMessage( {content: my_msg, author_id: this.props.currentUser.id, location_type:"Conversation", location_id: this.props.convo.id})
        }).then(() =>this.props.sendMessage( {content: this.responseMessage, author_id: this.props.convo.otherUser.id, location_type:"Conversation", location_id: this.props.convo.id}),() => this.props.sendMessage( {content: this.responseMessage, author_id: this.props.convo.otherUser.id, location_type:"Conversation", location_id: this.props.convo.id}))
      }
      else{
        this.props.sendMessage( {content: my_msg, author_id: this.props.currentUser.id, location_type:"Conversation", location_id: this.props.convo.id})
      }
    }
    else
    {
      const formData = new FormData();
      formData.append("message[content]", this.state.usermsg);
      formData.append("message[author_id]", this.props.currentUser.id);
      formData.append("message[location_type]", "Conversation");
      formData.append("message[location_id]", this.props.convo.id);
      formData.append("message[image])", this.state.photoFile);
      $.ajax({
        url: "/api/messages",
        method: "POST",
        data: formData,
        contentType: false,
        processData: false
      }).then( (response) => this.props.sendMessage(response)) //something may be slightly off with this... see if sending an image always creates an error
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
    // this.props.getConversationList(this.props.currentUser.id).then(() => this.enterRoom());
    this.props.getConversationList(this.props.currentUser.id);
    this.props.getConvoMessages(this.props.id);
    
    this.enterRoom();
    this.props.removeErrors();
    this.props.removeModals();
    if(this.props.convo.otherUser.id === 6)
    {
      this.state.bot = true;
    }
  }

  componentDidUpdate(prevProps) {
    
    const prevConvoId = prevProps.convo.id;
    if (prevConvoId !== this.props.convo.id) {
      this.props.getConvoMessages(this.props.id);
      this.subscription?.unsubscribe();
      this.enterRoom();
      if(this.props.convo.otherUser.id === 6)
      {
        this.state.bot = true;
      }
      else
      {
        this.state.bot = false;
      }
    }
  }

  componentWillUnmount()
  {
    //removeEventListeners? s
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

  render() {
    let msgList = <li></li>;
   
    if (this.props.messages.length > 0)
    {
     let lastSenderID = -1;
     msgList = Object.values(this.props.messages).map( (msg) =>{
      let deleteButton = null;
      let editButton = null;
      let datemsg = null;
      let myimg = null;
      let mypfp = <div className="no-pfp-filler"> </div>;
      let msgHeader = null;
      let filler = null;
    
      
      if(msg.author_id !== lastSenderID)
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

        msgHeader = (<h2>
          <span className="message-username">{msg.author_name}</span>
          <span className="message-date">{datemsg}</span>
        </h2>)

        mypfp = <img className="dm-pfp" src={msg.pfp_url} alt={msg.pfp_url}/>
        filler = <div id="msgfiller"> </div>
        lastSenderID = msg.author_id;
      }

      
      if (msg.image_url)
      {
        myimg = <img className="msg-img" src={msg.image_url}></img>
      }

      let msgContent = <div className="message">
      
        {mypfp}
        <div>
          {msgHeader}
          <p className="msg-content">{msg.content}</p>
          {myimg}
        </div>
      </div>

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
              <button className="invisible" type="Submit">Edit
              </button>
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
            if(!this.state.bot)
            {
            this.firstTime = 2;
            this.setState({editing: msg.id});
            }
          }
          }>
            <img src={window.editmessage}/>
          </button>
        }



      }
      return (<li key={msg.id} id="single-message">
        {filler}
        {msgContent}
        <div className="msgbuttons">
          {editButton}
          {deleteButton}
        </div>
      </li>)
      })
    }

    let otheruserInfo = null;
    if (this.props.convo)
    {
      otheruserInfo = <div id="otheruserinfo">
        <img src={window.aticon} alt="at-icon"></img>
        <p>{this.props.convo.otherUser.username}: {this.props.convo.otherUser.status}</p>
      </div>
    }
    // const preview = this.state.photoUrl ? <img src={this.state.photoUrl} /> : null;
    return (
      <div className="convo">
        <header>
          {otheruserInfo}
        </header>
        
          <ul id="dm-list">
            {msgList}
          </ul>
          {/* {preview} */}
         
          <div id="msg-form-wrapper">
            <img src={window.uploadimg}></img>
            <div id="msg-form-bubble">
              <form id="msg-form">
                <label htmlFor="img-uploader">
                  <img src={window.upload} alt="upload-icon"/>
                </label> 
                <input type="file" id="img-uploader"  onChange={this.handleFile}></input>
                <input type="text" id="usermsg" value={this.state.usermsg} onChange={this.update("usermsg")} placeholder={`Message @${this.props.convo.otherUser.username}`}></input>
                <button className="invisible" type="Submit">Submit</button>
              </form>
            </div> 
          </div>
          
          {this.renderErrors()}
      </div>
    );
  }
}

export default Conversation;
