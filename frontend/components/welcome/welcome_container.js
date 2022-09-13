
import React from "react"
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { demo } from '../../actions/session_actions';
import Welcome from './welcome';

const mapStateToProps = ({ session, entities: { users } }) => {
  let signupp = session.id ? <button id="welcome-signup" type="button" onClick={() => {window.open('https://github.com/ForgoneReality/dissonance','_blank', 'noopener,noreferrer')}}>
      Download
    </button> : <Link to="/signup"> 
      <button id="welcome-signup" type="button">
          Sign Up
      </button>
  </Link>;

  let demoo = session.id ? <Link to="/conversations"> 
  <button id="welcome-demo" type="button">
      Open Dissonance
  </button>
  </Link> : "trash code time"
    
  return {
    session_id: session.id,
    open:  <Link to="/conversations">
                <button className="welcome-button" type="button">
                    Open
                </button>
            </Link>,
    login: <Link to="/login">
      <button className="welcome-button" type="button">
          Login
      </button>,
      
      </Link>,
    signup: signupp,
    demo: demoo
  };
};

const mapDispatchToProps = dispatch => ({
  loginDemo: () => dispatch(demo())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
