import React from 'react';
// import {compose} from 'redux';
import { connect } from 'react-redux';
import { removeErrors } from '../../actions/errors_actions';
import { hideModal, resetModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';
import {removeServer} from "../../actions/servers_actions"


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
    // console.log(".")
    // const history = useHistory();
    // console.log("nah");

    if (this.state.name === this.props.currentServer.name)
    {
        this.props.processForm(this.props.currentServer.id);
        this.props.hideModal();
        console.log("!")
        this.props.history.push("/conversations");
        console.log("!!");
    }
    else
    {
        this.setState({failed: true});
    }
  }


  render() {
    let err = this.state.failed ? <ul><li>You didn't enter the server name correctly</li></ul> : <div></div>
    return (
      <div id="delete-server-modal">
          <div className="top1">
            <h1>Delete '{this.props.currentServer.name}'</h1>
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
            <div className="edit-modal-bottom" id="bruh0499">
                <button className="cancel1" onClick={() => this.props.hideModal()}>Cancel</button>
                <button type="submit" className="delete-button" style={{margin: "0px"}} onClick={this.props.handleSubmit}>Delete Server</button>
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
    processForm: (id) => dispatch(removeServer(id))
  };
};

// export default compose(withRouter, connect(mapStateToProps, mapDispatchToProps))(DeleteServerModal);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)((DeleteServerModal)));
