import React from 'react';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

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
  }

  generate_fourdigit()
  {
    let ans = ''
    for(let i = 0; i < 4; i++)
    {
      ans.concat(numbers[Math.floor(Math.random()*numbers.length)]);
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
    let AdditionalSignupInfo = this.props.formType === "login" ? <p></p> :
    (
      <div>
        <label>Username:
          <input type="text"
            value={this.state.username}
            onChange={this.update('username')}
            className="login-input"
          />
        </label>
        <label>Four-Digit Identifier:
          <input type="text"
            value={this.state.fourdigit_id}
            onChange={this.update('fourdigit_id')}
            className="login-input"
          />
        </label>
      </div>
    )
    return (
      <div className="login-form-container">
        <form onSubmit={this.handleSubmit} className="login-form-box">
          Welcome to Dissonance!
          <br/>
          Please {this.props.formType} or {this.props.navLink}
          {this.renderErrors()}
          <div className="login-form">
            <br/>
            <label>Email:
              <input type="text"
                value={this.state.email}
                onChange={this.update('email')}
                className="login-input"
              />
            </label>
            <br/>
            <label>Password:
              <input type="password"
                value={this.state.password}
                onChange={this.update('password')}
                className="login-input"
              />
            </label>
            {AdditionalSignupInfo}
            <br/>
            <input className="session-submit" type="submit" value={this.props.formType} />
          </div>
        </form>
      </div>
    );
  }
}

export default SessionForm;
