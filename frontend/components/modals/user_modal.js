import React from 'react';
import { connect } from 'react-redux';
import { createConversation } from '../../actions/conversations_actions';
import { removeErrors } from '../../actions/errors_actions';
import { hideModal, resetModal } from '../../actions/modal_actions';
import {createMessage} from "../../actions/messages_actions";
import { withRouter } from 'react-router-dom';
import { searchConversation } from '../../util/conversations_api_util';


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
    const message = this.state.usermsg;
    const author_id = this.props.currentUser.id;
    const recipient_id = this.props.user.id;
    this.props.searchConversation(author_id, recipient_id).then((res) => {
      if(Array.isArray(res))
      {
        this.props.postForm(author_id, recipient_id).then((res2) => {
          console.log("??!", res2);
          this.props.sendMessage( {content: message, author_id: author_id, location_type:"Conversation", location_id: res2.conversation.id}).then((res3) => {
            this.props.history.push(`/conversations/${res2.conversation.id}`);  
          })
        })
      }
      else
      {
        this.props.sendMessage( {content: message, author_id: author_id, location_type:"Conversation", location_id: res.id}).then((res2) => {
          this.props.history.push(`/conversations/${res.id}`);  
        })
      }
    })
    this.props.hideModal();
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

    let textbox = this.props.user.id != this.props.currentUser.id ? <input type="text" placeholder={`Message @${this.props.user.username}`} id="usermsg" value={this.state.usermsg} onChange={this.update("usermsg")}></input> : 
    <input type="text" placeholder={`You cannot message yourself`} id="usermsg" value={this.state.usermsg} readOnly></input>
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
                {textbox}
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
    errors: state.errors.user,
    searchConversation: (author_id, recipient_id) => searchConversation(author_id, recipient_id)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeErrors: () => dispatch(removeErrors()),
    hideModal: () => dispatch(hideModal()), 
    postForm: (author_id, recipient_id) => dispatch(createConversation(author_id, recipient_id)),
    sendMessage: (message) => dispatch(createMessage(message))

  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)((UserModal)));
