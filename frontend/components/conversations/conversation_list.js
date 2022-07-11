import React from 'react';
import {
    Link
  } from 'react-router-dom';

class ConversationList extends React.Component {
  constructor(props) {
    super(props);
   
    this.renderErrors = this.renderErrors.bind(this)
    
  }

  componentDidMount()
  {
    this.props.removeErrors();
    this.props.getConversationList(this.props.currentUser.id);//MIGHT BE IN CONSTRUCTOR OR OTHER PLACE LIKE MOUNTED
    document.body.style = 'background: white;'
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
    let msgList;
    //console.log(this.props);

    if (this.props.convoList.length > 0)
    {
        msgList = this.props.convoList.map( (convo) => {
        return <li><Link to={`/conversations/${convo.id}`}>{convo.otherUser.username}</Link></li>;
        })        
    }
    else
    {
        msgList= <li>It's empty here...</li>
    }
    return (
      <div className="conversations-list">
        <h2>Welcome back {this.props.currentUser.username}!</h2>
        
        <label for="c-list">List of Conversations</label>
        <ul id="c-list">
            {msgList}
        </ul>
        {this.renderErrors()}
      </div>
    );
  }
}

export default ConversationList;
