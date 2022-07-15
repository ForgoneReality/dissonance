import React from 'react';
import {
    Link, Route
  } from 'react-router-dom';

import ConversationsContainer from "./conversation_container"

class ConversationList extends React.Component {
  constructor(props) {
    super(props);
   
    this.renderErrors = this.renderErrors.bind(this)
    
  }

  componentDidMount()
  {
    this.props.removeErrors();
    this.props.getConversationList(this.props.currentUser.id);//MIGHT BE IN CONSTRUCTOR OR OTHER PLACE LIKE MOUNTED
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

    if (this.props.convoList.length > 0)
    {
        let sortedList = this.props.convoList.sort( (a,b) => a.last_updated > b.last_updated ? -1 : 1)
        msgList = sortedList.map( (convo) => {
        return <li><Link to={`/conversations/${convo.id}`}>{convo.otherUser.username}</Link></li>;
        })        
    }
    else
    {
        msgList= <li>It's empty here...</li>
    }
    return (
      <section className="convos">
        
        <div className="conversations-list">
          <h2>Welcome back {this.props.currentUser.username}!</h2>
          
          <label htmlFor="c-list">List of Conversations</label>
          <ul id="c-list">
              {msgList}
          </ul>
          {this.renderErrors()}
        </div>

        <Route path="/conversations/:convoId" component={ConversationsContainer} />

      </section>
    );
  }
}

export default ConversationList;
