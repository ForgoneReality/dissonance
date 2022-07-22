import React from 'react';
import { connect } from 'react-redux';
import { removeErrors } from '../../actions/errors_actions';
import { hideModal, resetModal } from '../../actions/modal_actions';
import {createChannel} from "../../actions/channels_actions"

class CreateChannelModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        name: '',
        description: '',
        server_id: this.props.currentServer.id
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount()
  {
    this.props.removeErrors();
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  renderErrors() {
    if(this.props.errors.length > 0)
    {
      return(
        <ul>
          {this.props.errors.map((error, i) => (
            <li key={`error-${i}`}>
              {error}
            </li>
          ))}
        </ul>
      )
    }
    else
    {
      return null;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const channel = Object.assign({}, this.state);
    this.props.createChannel(channel).then((res) => this.props.hideModal(), (errs) => console.log("Failure"));
  }

  render() {
    return (
      <div id="edit-email-modal" onClick={(e) => e.stopPropagation()}>
          <div className="top1">
            <h1>Create Channel</h1>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div id="mid1">
                <div>
                    <label>CHANNEL NAME</label>
                    <input type="text" value={this.state.name} onChange={this.update("name")}></input>
                </div>  
                <div>
                    <label>DESCRIPTION</label>
                    <input type="text" value={this.state.description} onChange={this.update("description")}></input>
                </div>  
                <div className="modal-errors">
                    {this.renderErrors()}
                </div>
            </div>
            <div className="edit-modal-bottom">
                <button className="cancel1" onClick={() => this.props.hideModal()}>Cancel</button>
                <button type="submit" className="submit1" onClick={this.handleSubmit}>Done</button>
            </div>
        </form>

      </div>
    );
  }
}



const mapStateToProps = state => {
  return {
    currentServer: state.current.server,
    errors: state.errors.user //more bad code -> Using User errors for laziness but it's not user error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeErrors: () => dispatch(removeErrors()),
    hideModal: () => dispatch(hideModal()), 
    createChannel: (channel) => dispatch(createChannel(channel))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateChannelModal);