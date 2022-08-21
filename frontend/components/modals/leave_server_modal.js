import React from 'react';
// import {compose} from 'redux';
import { connect } from 'react-redux';
import { removeErrors } from '../../actions/errors_actions';
import { hideModal, resetModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';
import {leaveServer} from "../../actions/servers_actions"


class LeaveServerModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount()
  {
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    
    this.props.processForm(this.props.currentUser.id, this.props.currentServer.id);
    this.props.hideModal();
    this.props.history.push("/conversations");

  }


  render() {
    return (
      <div id="delete-server-modal" style={{width: "33vw", minHeight: "230px"}}>
          <div className="top1">
            <h1>Leave '{this.props.currentServer.name}'</h1>
            <h3>Are you sure you want to leave this server? You won't be able to rejoin this server unless you are re-invited.</h3>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="edit-modal-bottom">
                <button className="cancel1" onClick={() => this.props.hideModal()}>Cancel</button>
                <button type="submit" className="delete-button" style={{margin: "0px"}} onClick={this.props.handleSubmit}>Leave Server</button>
            </div>
        </form>
      </div>
    );
  }
}



const mapStateToProps = state => {
  return {
    currentServer: state.current.server,
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeErrors: () => dispatch(removeErrors()),
    hideModal: () => dispatch(hideModal()),
    processForm: (user_id, server_id) => dispatch(leaveServer(user_id, server_id))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)((LeaveServerModal)));


