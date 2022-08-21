import React from 'react';
import { connect } from 'react-redux';
import { removeErrors } from '../../actions/errors_actions';
import { hideModal, resetModal } from '../../actions/modal_actions';

class UserModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usermsg: ""
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
    const user = Object.assign({}, this.state);
    // this.props.processForm(this.props.currentUser.id, user).then((res) => this.props.hideModal(), (errs) => console.log("Failure"));
  }


  render() {
    console.log("PAINNNNN", this.props.user);
    let usernamestuff = this.props.user && this.props.user.nickname ? <div>
        <h1>{this.props.user.nickname}</h1>
        <h3>{this.props.user.username+"#"+this.props.user.fourdigit_id}</h3>
    </div> : <div>
        <h1>{this.props.user.username+"#"+this.props.user.fourdigit_id}</h1>
    </div>

    let biostuff = this.props.user.bio ? <div>
        <label>ABOUT ME</label>
        <h3>{this.props.user.bio}</h3>
    </div> : <div>
        <label>ABOUT ME</label>
        <h3>This user does not have a bio...</h3>
    </div> 
    //above might cause spacing issues when no bio

    return (
      <div id="user-modal">
          <div style={{height: "86px"}}>
            <img className="pfp-large" src={this.props.user.pfp_url}/>
          </div>
          {usernamestuff}
          <hr></hr> 
          {biostuff}
          <label>ROLES</label>
          {/*TO BE IMPLEMENTED: ALSO NEED MESSAGE BOX*/}
          <div id="msg-form-bubble2">
              <form id="msg-form2" onSubmit={this.handleSubmit}>
                <input type="text" placeholder={`Message @${this.props.user.username}`} id="usermsg" value={this.state.usermsg} onChange={this.update("usermsg")}></input>
                <button className="invisible" type="Submit">Submit</button>
              </form>
            </div> 
    
      </div>
    );
  }
}



const mapStateToProps = (state) => {

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

export default connect(mapStateToProps, mapDispatchToProps)(UserModal);
