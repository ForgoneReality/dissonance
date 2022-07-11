
import React from "react"
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { logout } from '../../actions/session_actions';
import Welcome from './welcome';

const mapStateToProps = ({ session, entities: { users } }) => {
  return {
    session_id: session.id,
    open:  <Link to="/home">
                <button className="welcome-button" type="button">
                    Open
                </button>
            </Link>,
    login: <Link to="/login">
      <button className="welcome-button" type="button">
          Login
      </button>,
      
      </Link>,
    signup: <Link to="/signup"> 
      <button id="welcome-signup" type="button">
          Sign Up
      </button>
      </Link>,
    demo: <button id="welcome-demo"> Demo (Soon) </button>
  };
};

const mapDispatchToProps = dispatch => ({
//   logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
