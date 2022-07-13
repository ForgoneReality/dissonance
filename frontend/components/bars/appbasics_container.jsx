import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import AppBasics from './appbasics.js';


//at the moment it's just the userbar at the bottom... need servers list later soon
const mapStateToProps = (state) => {

  return {
    currentUser: state.session.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBasics);
