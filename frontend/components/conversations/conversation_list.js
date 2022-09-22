import React from 'react';
import {
    Link, Route
  } from 'react-router-dom';

import ConversationsContainer from "./conversation_container"


class ConversationList extends React.Component {
  constructor(props) {
    super(props);
    this.trythis(); 
    
    this.renderErrors = this.renderErrors.bind(this)
  }

  componentDidMount()
  {
    this.props.removeErrors();
  }

  trythis()
  {
    this.props.getConversationList(this.props.currentUser.id);//MIGHT BE IN CONSTRUCTOR OR OTHER PLACE LIKE MOUNTED
  }

  componentDidUpdate(prevProps)
  {
    if(prevProps.convoList.length >0 && this.props.convoList > 0)
    {
      if(prevProps.convoList[0].last_updated !== this.props.convoList[0].last_updated)
      {
        this.props.getConversationList(this.props.currentUser.id);
      }
    }
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
        let sortedList = this.props.convoList;
        msgList = sortedList.map( (convo) => {
        let useronlinestatus = null;
        if(convo.otherUser.status === "online")
        {
          useronlinestatus = <svg height="15" width="15"><circle cx="7.5" cy="7.5" r="6" stroke="#2f3136" strokeWidth="2.25" fill="#3ba55d" /> </svg> 
        }
        else if (convo.otherUser.status === "offline")
        {
          useronlinestatus = <svg height="15" width="15"><circle cx="7.5" cy="7.5" r="3.75" stroke="#96989d" strokeWidth="2.25" fill="#2f3136" /> <circle cx="7.5" cy="7.5" r="6" stroke="#2f3136" strokeWidth="2.25" fill="none" /> </svg> 
        }
        else if (convo.otherUser.status === "busy")
        {
          useronlinestatus = <svg height="15" width="15"><circle cx="7.5" cy="7.5" r="6" stroke="#2f3136" strokeWidth="2.25" fill="#D83C3E" /> </svg> 
          
        }
        else if (convo.otherUser.status === "idle")
        {
          useronlinestatus = <svg height="15" width="15"><circle cx="7.5" cy="7.5" r="6" stroke="#2f3136" strokeWidth="2.25" fill="#faa81b" /> </svg> 
          
        }


        return <li key={convo.id}>
          <Link className="convo-link" to={`/conversations/${convo.id}`}>
            <div className="convolisting">
                 <div className="bruh001">

                  <img className="sidepfp" src={convo.otherUser.pfp_url}></img>
                  <div className="useronlinestatusicon">
                    {useronlinestatus}
                  </div>
                </div>
                <div>
                  <p>{convo.otherUser.username}</p>
                  {/* put user status in here way later */}
                </div>
               
              </div>
            
          </Link>
        </li>;
        })        
    }
    else
    {
        msgList= null;
    }
    return (
      <section className="convos">
        
        <nav id="conversations-list">
          {/* <p>Welcome back {this.props.currentUser.username}!</p> */}
          <Link to="/conversations"  style={{ textDecoration: 'none' }}>
            <div className="friend-thing-9000">
              <img src={window.friendicon} alt="waveicon"></img> 
              <p>Friends</p> 
            </div>
          </Link>
          
          <label htmlFor="c-list">DIRECT MESSAGES</label>
          <ul id="c-list">
              {msgList}
          </ul>
          {this.renderErrors()}
        </nav>

        <Route path="/conversations/:convoId" component={ConversationsContainer} />

      </section>
    );
  }
}

export default ConversationList;
