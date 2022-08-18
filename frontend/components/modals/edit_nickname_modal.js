import React from 'react';
import { connect } from 'react-redux';
import { removeErrors } from '../../actions/errors_actions';
import { hideModal, resetModal } from '../../actions/modal_actions';
import { setNickname } from '../../actions/users_actions';


class EditNicknameModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: ''
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
    this.props.setNickname(this.state.nickname, this.props.currentUser.id, this.props.server_id).then((res) => this.props.hideModal());
    this.props.hideModal();
  }


  render() {
    return (
      <div id="edit-nickname-modal">
          <form onSubmit={this.handleSubmit}>
            <div id="mid1">
                <div>
                    <label>NICKNAME</label>
                    <input type="text" value={this.state.nickname} onChange={this.update("nickname")}></input>
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
    errors: state.errors.user,
    server_id: state.current.server.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeErrors: () => dispatch(removeErrors()),
    hideModal: () => dispatch(hideModal()),
    setNickname: (nick, user_id, server_id) => dispatch(setNickname(nick, user_id, server_id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditNicknameModal);
