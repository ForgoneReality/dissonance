import { connect } from 'react-redux';
import React from 'react';
import { removeErrors } from '../../actions/errors_actions';
import Settings from "./settings.jsx"

const mapStateToProps = (state) => {
  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // processForm: (user) => dispatch(login(user)), 

    // removeErrors: () => dispatch(removeErrors())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
