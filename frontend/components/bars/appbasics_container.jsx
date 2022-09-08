import { connect } from 'react-redux';
import React from 'react';
import AppBasics from './appbasics.js';
import { getServersList } from '../../actions/servers_actions.js';
import { displayFullModal, displayModal } from '../../actions/modal_actions.js';
import { getConversationList, newUnreadMessage } from '../../actions/conversations_actions.js';

//at the moment it's just the userbar at the bottom... need servers list later soon
const mapStateToProps = (state) => {
  const sL = Object.values(state.entities.servers);
  const cL = Object.values(state.entities.conversations).filter((convo) => convo.unread > 0).sort( (a,b) => a.last_updated > b.last_updated ? -1 : 1);
  return {
    currentUser: state.session.currentUser,
    serversList: sL,
    modal: state.ui.modal,
    fullmodal: state.ui.fullmodal,
    unreadConvos: cL
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getServersList: (userId) => dispatch(getServersList(userId)),
    openSettings: () => dispatch(displayFullModal("settings")),
    displayCreateServerModal: () => dispatch(displayModal("createserver")),
    getConversationList: (userId) => dispatch(getConversationList(userId)),
    displayModal: (modal) => dispatch(displayModal(modal)),
    newUnreadMessage: (convo) => dispatch(newUnreadMessage(convo.id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBasics);
