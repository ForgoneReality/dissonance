import React from 'react';

class Conversation extends React.Component {
  constructor(props) {
    super(props);
    
    this.renderErrors = this.renderErrors.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      usermsg: ""
    }
  }

  submitOnEnter(event){
    if(event.which === 13){
        //console.log("?", event.target.form);
        event.target.form.dispatchEvent(new Event("submit", {cancelable: true}));
        event.preventDefault(); // Prevents the addition of a new line in the text field (not needed in a lot of cases)
        event.target.value = "";
    }
        
  }

  handleSubmit(e)
  {
    e.preventDefault();
    console.log("success");
    console.log(this.state.usermsg);
    this.state.usermsg = "";
  }

  update(property) {
    return e => this.setState({ [property]: e.currentTarget.value });
  }

  componentDidMount()
  {
    document.getElementById("usermsg").addEventListener("keypress", this.submitOnEnter);
    document.getElementById("msg-form").addEventListener("submit", this.handleSubmit);
    this.props.getConvoMessages(this.props.id);
    this.props.getConversationList(this.props.currentUser.id);
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
    let msgList = <li>Empty...</li>;
    const msgs = (this.props.messages);
    if (msgs.length > 0)
    {
     msgList = Object.values(msgs).map( (msg) =>{
      return <li>{msg.author_name} says {msg.content}</li>
      })
    }
    
    return (
      <div className="convo">
        <p>Temp to see</p>
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
