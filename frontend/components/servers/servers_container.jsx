import { connect } from 'react-redux';
import { removeErrors } from '../../actions/errors_actions.js';
import { displayModal } from '../../actions/modal_actions.js';
import { fetchServer} from "../../actions/servers_actions"

import Server from "./servers"

const mapStateToProps = (state, ownProps) => {

    
  return {
    // errors: state.errors.channels,
    channelId: ownProps.match.params.channelId,
    channelsList: Object.values(state.entities.channels),
    channels: state.entities.channels,
    servers: state.entities.servers,
    usersList: Object.values(state.entities.users)  
    // getServerID: (channelId) => findServerID(channelId)
  };
};

const mapDispatchToProps = (dispatch) => {

  return {
    removeErrors: () => dispatch(removeErrors()),
    fetchServer: (serverId) => dispatch(fetchServer(serverId)),
    displayModal: (modal, payload) => dispatch(displayModal(modal, payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Server);
