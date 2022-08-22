import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
// import { login, demo } from '../../actions/session_actions';
import Invite from './invite';
import { removeErrors } from '../../actions/errors_actions';
import { getServerFromLink } from '../../actions/servers_actions';

const mapStateToProps = (state, ownProps) => {
    console.log("OWNPROPS", ownProps)
  return {
    invite_link: ownProps.match.params.invite_link,
    errors: state.errors.session,
    server: state.current.server,
    currentUser: state.session.currentUser
    // formType: 'Login',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeErrors: () => dispatch(removeErrors()),
    getServerFromLink: (link) => dispatch(getServerFromLink(link)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Invite);
