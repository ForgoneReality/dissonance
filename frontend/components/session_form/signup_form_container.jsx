import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup, demo } from '../../actions/session_actions';
import SessionForm from './session_form';
import { removeErrors } from '../../actions/errors_actions.js';

const mapStateToProps = ({ errors }) => {
  return {
    errors: errors.session,
    formType: 'Sign Up',
    navLink: 
    <p> <span id="bruh9201">Already have an account?</span> <span><Link id="auth-links" to="/login">Login instead</Link></span> </p>
    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: (user) => dispatch(signup(user)),
    removeErrors: () => dispatch(removeErrors()),
    signinDemo: () => dispatch(demo())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
