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
        return <li key={convo.id}>
          <Link className="convo-link" to={`/conversations/${convo.id}`}>
            <div>{convo.otherUser.username}</div>
          </Link>
        </li>;
        })        
    }
    else
    {
        msgList= <li>It's empty here...</li>
    }
    return (
      <section className="convos">
        
        <div className="conversations-list">
          {/* <p>Welcome back {this.props.currentUser.username}!</p> */}
          <label htmlFor="c-list">DIRECT MESSAGES</label>
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
