import React from 'react';
import login_img from "../../../app/assets/images/login-img.png"


class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      fourdigit_id: this.generate_fourdigit(),
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this)
  }

  componentDidMount()
  {
    this.props.removeErrors();
    document.body.style = 'background: #5865f4; overflow: hidden;'
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
    const user = Object.assign({}, this.state);
    this.props.processForm(user);
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
    let AdditionalSignupInfo = this.props.formType === "Login" ? <p></p> :
    (
      <div>
        <label htmlFor="login-input-username">USERNAME</label>
        <input type="text"
            value={this.state.username}
            onChange={this.update('username')}
            className="login-input"
            id="login-input-username"
          />
        <label htmlFor="login-input-4id">FOUR-DIGIT ID</label>
        <input type="text"
            value={this.state.fourdigit_id}
            onChange={this.update('fourdigit_id')}
            className="login-input"
            id="login-input-4id"
          />
      </div>
    )

    let TitleMessage = this.props.formType === "Login" ? "Welcome Back!" : "Create an Account";
    let optionalSubtitle = this.props.formType === "Login" ? <h3>We're so excited to see you again!</h3> : null
    return (
      <div className="login-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          <h1>{TitleMessage}</h1>
          {optionalSubtitle}
          {/* Please {this.props.formType} or {this.props.navLink} */}
          {this.renderErrors()}
          <div className="login-form">
            <div className="to-the-left">
              <label htmlFor="email-login-input">EMAIL</label>
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                className="login-input" id="email-login-input"
              />
              <label htmlFor="password-login-input">PASSWORD </label>
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input" id="password-login-input"
              />
              {AdditionalSignupInfo}
              <p id="bruh9203" onClick={() => this.props.signinDemo()}>Don't want to register? Try the demo!</p>

              <br/>
            </div>
            <input className="session-submit" type="submit" value={this.props.formType} />
            <div id="bruh9300">
              {this.props.navLink}
            </div>
          </div>
        </form>
        <img src={window.loginimg}/>
      </div>
    );
  }
}

export default SessionForm;
