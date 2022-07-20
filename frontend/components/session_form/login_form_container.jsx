import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { login, demo } from '../../actions/session_actions';
import SessionForm from './session_form';
import { removeErrors } from '../../actions/errors_actions';

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'Login',
    navLink: 
      <p> <span id="bruh9201">Don't have an account?</span> <span><Link id="auth-links" to="/signup">Sign up instead</Link></span> </p>

  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(login(user)), 
    removeErrors: () => dispatch(removeErrors()),
    signinDemo: () => dispatch(demo())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
