import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import ConversationList from './conversation_list';
import { removeErrors } from '../../actions/errors_actions.js';
import { getConversationList } from '../../actions/conversations_actions.js';

const mapStateToProps = (state) => {
  const cL = Object.values(state.entities.conversations).sort( (a,b) => a.last_updated > b.last_updated ? -1 : 1);
  return {
    errors: state.errors.session,
    currentUser: state.session.currentUser,
    convoList: cL
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getConversationList: (userId) => dispatch(getConversationList(userId)),
    removeErrors: () => dispatch(removeErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConversationList);
