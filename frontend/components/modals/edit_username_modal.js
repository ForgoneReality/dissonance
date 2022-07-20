import React from 'react';
import { connect } from 'react-redux';
import { removeErrors } from '../../actions/errors_actions';
import { hideModal, resetModal } from '../../actions/modal_actions';
import {updateUser} from "../../actions/users_actions";


class EditUsernameModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        username: this.props.currentUser.username + "#" + this.props.currentUser.fourdigit_id,
        password: ''
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
    let username = this.state.username.slice(0, this.state.username.length-5);
    let id = this.state.username.slice(this.state.username.length-4);
    const user = {
      username: username,
      fourdigit_id: id, 
      password: this.state.password
    }
    this.props.processForm(this.props.currentUser.id, user).then((res) => this.props.hideModal());
  }


  render() {
    return (
      <div id="edit-username-modal">
          <div className="top1">
            <h1>Change your username</h1>
            <h3>Enter your username and your existing password.</h3>
          </div>
          <form onSubmit={this.handleSubmit}>

            <div id="mid1">
                <div>
                    <label>USERNAME</label>
                    <input type="text" value={this.state.username} onChange={this.update("username")}></input>
                </div>  
                <div>
                    <label>CURRENT PASSWORD</label>
                    <input type="password" value={this.state.password} onChange={this.update("password")}></input>
                </div>
                <div className="modal-errors">
                    {this.renderErrors()}
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
    currentUser: state.session.currentUser,
    errors: state.errors.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeErrors: () => dispatch(removeErrors()),
    hideModal: () => dispatch(hideModal()),
    processForm: (id, user) => dispatch(updateUser(id, user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUsernameModal);
