import React from 'react';
// import {compose} from 'redux';
import { connect } from 'react-redux';
import { removeErrors } from '../../actions/errors_actions';
import { hideFullModal, hideModal, resetModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';
import {removeChannel} from "../../actions/channels_actions"


class DeleteChannelModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this)

    this.state = {
      lastchannel: false
    }
  }


  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.props.currentChannel.id).then((res) => {
      console.log("!#$!E:", res);
      let new_channel_id = res.channel.id;
      this.props.history.push(`/channels/${new_channel_id}`);
      this.props.history.go();
    })
    this.props.hideModal();
    this.props.hideFullModal();
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
            <button type="submit" className="delete-button" style={{margin: "0px"}} onClick={this.handleSubmit}>Delete Channel</button>
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
    hideFullModal: () => dispatch(hideFullModal()),
    processForm: (id) => dispatch(removeChannel(id))
  };
};

// export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(DeleteServerModal);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)((DeleteChannelModal)));
