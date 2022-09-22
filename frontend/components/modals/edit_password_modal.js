import React from 'react';
import bcrypt from 'bcryptjs';
import { connect } from 'react-redux';
import { removeErrors } from '../../actions/errors_actions';
import { hideModal, resetModal } from '../../actions/modal_actions';
import {updateUser, receiveError} from "../../actions/users_actions";

class EditPasswordModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        password: '',
        newpassword: '',
        confirmPassword: ""
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
    const user = Object.assign({}, this.state);
    if(this.state.newpassword != this.state.confirmPassword)
    {
        this.props.sendError("New password and confirm password do not match!");
    }
    else
    {

      bcrypt.compare(this.state.password, this.props.hash, (err, result) => { 
          if(err) //?
          {
              this.props.sendError("Invalid old password");
          }
          else if (result)
          {
              this.props.processForm(this.props.currentUser.id, user).then((res) => this.props.hideModal(), (errs) => console.log("Failure"));
          }
          else
          {
            this.props.sendError("Invalid old password");
          }
      })
    }
  }

  render() {
    return (
      <div id="edit-password-modal">
          <div className="top1">
            <h1>Change your password</h1>
            <h3>Enter your existing password and a new password.</h3>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div id="mid1">
                <div>
                    <label>OLD PASSWORD</label>
                    <input type="password" value={this.state.password} onChange={this.update("password")}></input>
                </div>  
                <div>
                    <label>NEW PASSWORD</label>
                    <input type="password" value={this.state.newpassword} onChange={this.update("newpassword")}></input>
                </div>
                <div>
                    <label>CONFIRM NEW PASSWORD</label>
                    <input type="password" value={this.state.confirmPassword} onChange={this.update("confirmPassword")}></input>
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
    currentUser: state.session.currentUser,
    errors: state.errors.user,
    hash: state.session.currentUser.password_digest
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeErrors: () => dispatch(removeErrors()),
    hideModal: () => dispatch(hideModal()), 
    processForm: (id, user) => dispatch(updateUser(id, user)),
    sendError: (err) => dispatch(receiveError(err))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPasswordModal);
