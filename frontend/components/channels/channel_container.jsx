import { connect } from 'react-redux';
import { removeErrors } from '../../actions/errors_actions.js';
import { getChannelMessages } from '../../actions/channels_actions.js';
import { createMessage, deleteMessage, updateMessage, otherReceiveMessage, removeMessage, pinMessage } from '../../actions/messages_actions';
import{resetModal, displayModal, hideModal} from "../../actions/modal_actions.js"


import Channel from "./channel.js"


const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    currentUser: state.session.currentUser,
    channels: state.entities.channels,
    messages: Object.values(state.entities.messages),
    usersList: Object.values(state.entities.users),
    modal: state.ui.modal,
    currentServer: state.current.server
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeErrors: () => dispatch(removeErrors()),
    removeModals: () => dispatch(resetModal()),
    getChannelMessages: (id) => dispatch(getChannelMessages(id)),
    sendMessage: (message) => dispatch(createMessage(message)),
    deleteMessage: (msgId) => dispatch(deleteMessage(msgId)),
    editMessage: (msg) => dispatch(updateMessage(msg)),
    receiveMessage: (msg) => dispatch(otherReceiveMessage(msg)),
    removeMessage: (msgId) => dispatch(removeMessage(msgId)),
    pinMessage: (msgId) => dispatch(pinMessage(msgId)),
    displayModal: (modal, payload) => dispatch(displayModal(modal, payload)),
    hideModal: () => dispatch(hideModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
