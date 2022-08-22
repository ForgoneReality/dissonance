import React from 'react';
// import {compose} from 'redux';
import { connect } from 'react-redux';
import { removeErrors } from '../../actions/errors_actions';
import { hideModal, resetModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';
import {removeChannel} from "../../actions/channels_actions"


class DeleteChannelModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this)
  }


  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // console.log(".")
    // const history = useHistory();
    // console.log("nah");

        this.props.processForm(this.props.currentServer.id).then((res) => {
            let new_channel_id = Object.values(this.props.channels)[0].id;
            this.props.history.push(`/conversations/${new_channel_id}`);
        })
        this.props.hideModal();
  }


  render() {
    return (
      <div id="delete-server-modal" style={{minHeight: "200px", width: "35vw"}}>
          <div className="top1">
            <h1>Delete '{this.props.currentChannel.name}'</h1>
            <h3>Are you sure you want to delete this channel? This action cannot be undone.</h3>
          </div>
          
        <div className="edit-modal-bottom" id="bruh0499" style={{width:"calc(35vw - 16px)"}}>
            <button className="cancel1" onClick={() => this.props.hideModal()}>Cancel</button>
            <button type="submit" className="delete-button" style={{margin: "0px"}} onClick={this.props.handleSubmit}>Delete Server</button>
        </div>
      </div>
    );
  }
}



const mapStateToProps = state => {
  let channel_num = Number(/[^/]*$/.exec(window.location.hash)[0]);
  return {
    currentChannel: state.entities.channels[channel_num],
    channels: state.entities.channels
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeErrors: () => dispatch(removeErrors()),
    hideModal: () => dispatch(hideModal()),
    processForm: (id) => dispatch(removeServer(id))
  };
};

// export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(DeleteServerModal);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)((DeleteChannelModal)));
