import { connect } from 'react-redux';
import React from 'react';
import AppBasics from './appbasics.js';
import { getServersList } from '../../actions/servers_actions.js';
import { displayFullModal } from '../../actions/modal_actions.js';

//at the moment it's just the userbar at the bottom... need servers list later soon
const mapStateToProps = (state) => {
  const sL = Object.values(state.entities.servers);
  return {
    currentUser: state.session.currentUser,
    serversList: sL,
    modal: state.ui.modal,
    fullmodal: state.ui.fullmodal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getServersList: (userId) => dispatch(getServersList(userId)),
    openSettings: () => dispatch(displayFullModal("settings"))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBasics);
