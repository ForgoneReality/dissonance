import React from 'react';
import { connect } from 'react-redux';
import { removeErrors } from '../../actions/errors_actions';
import { hideModal, resetModal } from '../../actions/modal_actions';
import { useHistory } from 'react-router-dom';
import {deleteServer} from "../../actions/servers_actions"


class DeleteServerModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        name: "",
        failed: false
    }
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
    const history = useHistory();

    if (this.state.name === this.props.currentServer.name)
    {
        this.props.processForm(this.props.currentServer.id);
        this.props.hideModal();
        history.push('/conversations');
    }
    else
    {
        this.setState({failed: true});
    }
  }


  render() {
    let err = this.state.failed ? <div></div> : <ul><li>You didn't enter the server name correctly</li></ul>
    return (
      <div id="delete-server-modal">
          <div className="top1">
            <h1>Delete {this.props.currentServer.name}</h1>
            <h3>Are you sure you want to delete your server? This action cannot be undone.</h3>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div id="mid1">
                <div>
                    <label>ENTER SERVER NAME</label>
                    <input type="text" value={this.state.name} onChange={this.update("name")}></input>
                </div>  
                 <div className="modal-errors">
                    {err}
                </div>
            </div>
            <div className="edit-modal-bottom">
                <button className="cancel1" onClick={() => this.props.hideModal()}>Cancel</button>
                <button type="submit" className="submit1" onClick={this.props.handleSubmit}>Done</button>
            </div>
        </form>
      </div>
    );
  }
}



const mapStateToProps = state => {
  return {
    currentServer: state.current.server
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeErrors: () => dispatch(removeErrors()),
    hideModal: () => dispatch(hideModal()),
    processForm: (id) => dispatch(deleteServer(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteServerModal);
