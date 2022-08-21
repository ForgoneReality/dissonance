import React from 'react';
import { connect } from 'react-redux';
import { removeErrors } from '../../actions/errors_actions';
import { hideModal, resetModal } from '../../actions/modal_actions';
import {updateBio} from "../../actions/users_actions";


class EditBioModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        bio: this.props.currentUser.bio
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

    console.log("fol", this.props.currentUser.id, user)
    this.props.processForm(this.props.currentUser.id, user).then((res) => this.props.hideModal());
  }


  render() {
    return (
      <div id="edit-bio-modal">
          <div className="top1">
            <h1>Change your About Me</h1>
          </div>
          <form onSubmit={this.handleSubmit}>

            <div id="mid1">
                <div>
                    <label>BIO</label>
                    <input type="text" value={this.state.bio} onChange={this.update("bio")}></input>
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
    processForm: (id, bio) => dispatch(updateBio(id, bio))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBioModal);
