import { connect } from 'react-redux';
import { removeErrors } from '../../actions/errors_actions.js';
import { getChannelMessages } from '../../actions/channels_actions.js';
import { createMessage, deleteMessage, updateMessage, otherReceiveMessage, removeMessage } from '../../actions/messages_actions';
import{resetModal} from "../../actions/modal_actions.js"

import Channel from "./channel.js"


const mapStateToProps = (state) => {
  return {
    errors: state.errors.session,
    currentUser: state.session.currentUser,
    channels: state.entities.channels,
    messages: Object.values(state.entities.messages)
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
    removeMessage: (msgId) => dispatch(removeMessage(msgId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
