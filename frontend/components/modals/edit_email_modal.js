import React from 'react';
import { connect } from 'react-redux';
import { removeErrors } from '../../actions/errors_actions';
import { hideModal, resetModal } from '../../actions/modal_actions';
import {updateUser} from "../../actions/users_actions";

class EditEmailModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        email: this.props.currentUser.email,
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
    console.log("SUBMITTING: ", this.state);
    const user = Object.assign({}, this.state);
    this.props.processForm(this.props.currentUser.id, user).then((res) => this.props.hideModal(), (errs) => console.log("Failure"));
  }

  render() {
    return (
      <div id="edit-email-modal">
          <div className="top1">
            <h1>Change your email</h1>
            <h3>Enter your email and your existing password.</h3>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div id="mid1">
                <div>
                    <label>EMAIL</label>
                    <input type="text" value={this.state.email} onChange={this.update("email")}></input>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditEmailModal);
