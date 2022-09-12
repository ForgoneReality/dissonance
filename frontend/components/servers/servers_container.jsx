import { connect } from 'react-redux';
import { removeErrors } from '../../actions/errors_actions.js';
import { displayFullModal, displayModal, hideModal } from '../../actions/modal_actions.js';
import { fetchServer} from "../../actions/servers_actions"

import Server from "./servers"

const mapStateToProps = (state, ownProps) => {
  let x = false;
  if(state.current.server && (state.session.id === state.current.server.owner_id))
  {
    x = true;
  }
  return {
    // errors: state.errors.channels,
    channelId: ownProps.match.params.channelId,
    channelsList: Object.values(state.entities.channels),
    channels: state.entities.channels,
    servers: state.entities.servers,
    usersList: Object.values(state.entities.users),
    isOwner: x
    // getServerID: (channelId) => findServerID(channelId)
  };
};

const mapDispatchToProps = (dispatch) => {

  return {
    removeErrors: () => dispatch(removeErrors()),
    fetchServer: (serverId) => dispatch(fetchServer(serverId)),
    displayModal: (modal, payload) => dispatch(displayModal(modal, payload)),
    displayFullModal: (modal) => dispatch(displayFullModal(modal)),
    hideModal: () => dispatch(hideModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Server);
