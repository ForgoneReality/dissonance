import React from 'react';
import { connect } from 'react-redux';
import { removeErrors } from '../../actions/errors_actions';
import { hideModal, resetModal } from '../../actions/modal_actions';

class InviteUsersModal extends React.Component {
  constructor(props) {
    super(props);

    this.full_link =  window.location.origin + "/#/invite/" + this.props.server.server_link;

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

  // renderErrors() {
  //   if(this.props.errors.length > 0)
  //   {
  //     return(
  //       <ul>
  //         {this.props.errors.map((error, i) => (
  //           <li key={`error-${i}`}>
  //             {error}
  //           </li>
  //         ))}
  //       </ul>
  //     )
  //   }
  //   else
  //   {
  //     return null;
  //   }
  // }

  handleSubmit(e) {
    e.preventDefault();
    // this.props.setNickname(this.state.nickname, this.props.currentUser.id, this.props.server_id).then((res) => this.props.hideModal());
    this.props.setNickname(this.state.nickname, this.props.currentUser.id, this.props.server_id);
    this.props.hideModal();
  }


  render() {
    return (
      <div id="invite-users-modal">
          <form onSubmit={this.handleSubmit}>
            <div id="top1">
              <h1 id="bruh3098">Invite Friends to {this.props.server.name}</h1>
            </div>
            <div id="mid1">
              {/* WE WANT TO ADD UESRS FROM CONVO LIST HERE WITH A CLICK TO INVITE BUTTON!!! this generates a conversation if none exists */}
                <div>
                    <label>SEND A SERVER INVITE TO A FRIEND</label>
                    <div style={{position: "absolute", width: "100%"}}>
                      <input type="text" value={this.full_link} readonly></input>
                      <button id="copy-link" onClick={() => {navigator.clipboard.writeText(this.full_link)}}>Copy Link</button>
                    </div>

                </div>  
                {/* <div className="modal-errors">
                    {this.renderErrors()}
                </div> */}
            </div>
            {/* <div className="edit-modal-bottom">
                <button className="cancel1" onClick={() => this.props.hideModal()}>Cancel</button>
                <button type="submit" className="submit1" onClick={this.props.handleSubmit}>Done</button>
            </div> */}
        </form>

      </div>
    );
  }
}



const mapStateToProps = state => {
  return {
    errors: state.errors.user,
    server: state.current.server
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeErrors: () => dispatch(removeErrors()),
    hideModal: () => dispatch(hideModal())  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InviteUsersModal);
