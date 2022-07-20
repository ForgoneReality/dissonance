import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import Conversation from './conversation';
import { removeErrors } from '../../actions/errors_actions.js';
import { getConversationList, getConvoMessages } from '../../actions/conversations_actions';
import { createMessage, deleteMessage, updateMessage, otherReceiveMessage, removeMessage } from '../../actions/messages_actions';
import { resetModal } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => {
    console.log(state);
    console.log("OWNPROPS: ", ownProps)
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
        removeModals: () => dispatch(resetModal()),
        getConversationList: (userid) => dispatch(getConversationList(userid)),
        getConvoMessages: (id) => dispatch(getConvoMessages(id)),
        sendMessage: (message) => dispatch(createMessage(message)),
        deleteMessage: (msgId) => dispatch(deleteMessage(msgId)),
        editMessage: (msg) => dispatch(updateMessage(msg)),
        receiveMessage: (msg) => dispatch(otherReceiveMessage(msg)),
        removeMessage: (msgId) => dispatch(removeMessage(msgId))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);

  