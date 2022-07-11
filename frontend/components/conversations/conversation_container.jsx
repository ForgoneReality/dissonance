import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import Conversation from './conversation';
import { removeErrors } from '../../actions/errors_actions.js';
import { getConversationList, getConvoMessages } from '../../actions/conversations_actions';

const mapStateToProps = (state, ownProps) => {
  
    //console.log(state);
    return {
      id: parseInt(ownProps.match.params.convoId),
      errors: state.errors.session,
      messages: Object.values(state.entities.messages),
      convo: state.entities.conversations[ownProps.match.params.convoId],
      currentUser: state.session.currentUser
    
      //need user1/user2 info maybe? must select the right one first prob (with selector)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        removeErrors: () => dispatch(removeErrors()),
        getConversationList: (userid) => dispatch(getConversationList(userid)),
        getConvoMessages: (id) => dispatch(getConvoMessages(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);

  