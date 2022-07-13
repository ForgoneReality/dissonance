import React from 'react';
import ConversationsListContainer from "../conversations/conversation_list_container"

import {
  Route
} from 'react-router-dom';

class AppBasics extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount()
  {
    document.body.style = 'background: white; overflow: visible;'
  }


  render()
  {
    console.log(this.props);
    console.log("props above")
    let {username, status, fourdigit_id} = this.props.currentUser;
    return(
        <main>
            <Route path="/conversations" component={ConversationsListContainer} />
            <footer className="userFooter">
                <h2>{username}</h2>
                <h3>{status}</h3>
                <p>{fourdigit_id}</p>
            </footer>
        </main>
    )
  }
}

export default AppBasics;
