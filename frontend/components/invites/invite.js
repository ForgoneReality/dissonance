import React from 'react';
import { withRouter } from 'react-router-dom';
import { joinServer } from '../../util/servers_api_util';

class Invite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      fourdigit_id: this.generate_fourdigit(),
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentDidMount()
  {
    this.props.removeErrors();
    this.props.getServerFromLink(this.props.invite_link);
    document.body.style = 'background: #5865f4; overflow: hidden;'//prob don't need it
    // if(this.props.formType === "login")
  }

  generate_fourdigit()
  {
    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    let ans = ''
    for(let i = 0; i < 4; i++)
    {
      ans = ans.concat(numbers[Math.floor(Math.random()*numbers.length)]);
    }
    return ans;
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    joinServer(this.props.currentUser.id, this.props.server.id).then((res) => {
      this.props.history.push(`/channels/${res.id}`);
    })
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

  render() {
    let server_img = this.props.server.image_url ? <img id="server-pic2" src={this.props.server.image_url}/> : <div></div>
    let mems = this.props.server.num_members > 1 ? "Members" : "Member";
    let num_members = this.props.server.online_members > 0 ?  <div id="num-members">
    <svg height="12" width="12"><circle cx="6" cy="6" r="5" stroke="#B9BBBE" strokeWidth="2.25" fill="#B9BBBE" /> </svg> 
    <h2>{this.props.server.num_members} {mems}</h2>
    <svg id="bruh3904" height="12" width="12"><circle cx="6" cy="6" r="5" stroke="#3ba55d" strokeWidth="2.25" fill="#3ba55d" /> </svg> 
    <h2 style={{color: "#3ba55d"}}>{this.props.server.online_members} Online</h2>
   </div> :
     <div id="num-members">
      <svg height="12" width="12"><circle cx="6" cy="6" r="5" stroke="#B9BBBE" strokeWidth="2.25" fill="#B9BBBE" /> </svg> 
      <h2>{this.props.server.num_members} {mems}</h2>
     </div>
    return(
        <div className="login-form-container">
         {/* <form onSubmit={this.handleSubmit} className="login-form-box"> */}
         <form className="login-form-box">
          {server_img}
          <h2>You've been invited to join</h2>
          <h1>{this.props.server.name}</h1>
          {/* Please {this.props.formType} or {this.props.navLink} */}
          {this.renderErrors()}
          {num_members}
          <button id="bruh0030" onClick={this.handleSubmit}>Accept Invite</button>
        </form>
        <img className="login-form-container-img" src={window.loginimg}/>
        </div>
    );
  }
}

export default withRouter(Invite);

