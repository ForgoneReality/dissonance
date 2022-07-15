import React from 'react';

import consumer from '../../consumer';

class Conversation extends React.Component {
  constructor(props) {
    super(props);
    
    this.renderErrors = this.renderErrors.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEditSubmit = this.handleEditSubmit.bind(this)
    this.firstTime = -1;
    this.state = {
      usermsg: "",
      editmsg: "",
      editing: -1
    }
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
    this.props.sendMessage( {content: this.state.usermsg, author_id: this.props.currentUser.id, location_type:"Conversation", location_id: this.props.convo.id});
    this.setState({usermsg: ""});
  }

  handleEditSubmit(e)
  {
    e.preventDefault();
    this.props.editMessage( {id: this.state.editing, content: this.state.editmsg});
    // this.props.editMessage(this.state.editmsg, this.state.editing);
    this.setState({editmsg: "", editing: -1});
    this.firstTime = -1;
  }

 w
  componentDidMount()
  {
    document.getElementById("usermsg").addEventListener("keypress", this.submitOnEnter);
    document.getElementById("msg-form").addEventListener("submit", this.handleSubmit);
    this.props.getConvoMessages(this.props.id);
    this.props.getConversationList(this.props.currentUser.id);
    this.enterRoom();
    this.props.removeErrors();
  }

  componentDidUpdate(prevProps) {
    
    const prevConvoId = prevProps.convo.id;
    if (prevConvoId !== this.props.convo.id) {
      this.props.getConvoMessages(this.props.id);
      this.subscription?.unsubscribe();
      this.enterRoom();
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
    let msgList = <li>Empty...</li>;
    if (this.props.messages.length > 0)
    {

     msgList = Object.values(this.props.messages).map( (msg) =>{
      let deleteButton = null;
      let editButton = null;
      let msgContent = <p>{msg.author_name} says {msg.content}</p>;

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
          deleteButton = (<button id="delete-msg-button" onClick={() => {this.props.deleteMessage(msg.id)}}>Delete</button>)

          editButton = <button id="edit-msg-button" onClick={() => {
            this.firstTime = 2;
            this.setState({editing: msg.id});
          }
          }>Edit</button>
        }



      }
      return (<li key={msg.id}>

        {msgContent}
         {editButton}
         {deleteButton}
      
      </li>)
      })
    }

    return (
      <div className="convo">
        <p>{this.props.convo.otherUser.username}: {this.props.convo.otherUser.status}</p>
        <ul>
          {msgList}
        </ul>
        <form id="msg-form">
          <textarea id="usermsg" value={this.state.usermsg} onChange={this.update("usermsg")}></textarea>
          <button className="invisible" type="Submit">Submit</button>
        </form>
        {this.renderErrors()}
      </div>
    );
  }
}

export default Conversation;
