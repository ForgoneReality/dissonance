import { connect } from 'react-redux';
import React from 'react';
import ServerSettings from "./server_settings.jsx"
import { displayModal, hideFullModal } from '../../actions/modal_actions';
import { updateServer } from '../../actions/servers_actions.js';

const mapStateToProps = (state) => {
  return {
    currentServer: state.current.server
  };
};

const mapDispatchToProps = dispatch => ({
    hideFullModal: () => dispatch(hideFullModal()),
    updateServer: (server) => dispatch(updateServer(server))}
);

export default connect(mapStateToProps, mapDispatchToProps)(ServerSettings);
