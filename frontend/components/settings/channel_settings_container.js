import { connect } from 'react-redux';
import React from 'react';
import { displayModal, hideFullModal } from '../../actions/modal_actions';
import { receiveChannel } from '../../actions/channels_actions.js';
import ChannelSettings from './channel_settings.jsx';

const mapStateToProps = (state) => {
   let channel_num = Number(/[^/]*$/.exec(window.location.hash)[0]);
    console.log(channel_num, "cn")
    console.log(state.entities.channels[channel_num], "yo")
  return {
    currentChannel: state.entities.channels[channel_num]
  };
};

const mapDispatchToProps = dispatch => ({
    hideFullModal: () => dispatch(hideFullModal()),
    displayModal: (modal) => dispatch(displayModal(modal)),
    receiveChannel: (channel) => dispatch(receiveChannel(channel))
}
);

export default connect(mapStateToProps, mapDispatchToProps)(ChannelSettings);
