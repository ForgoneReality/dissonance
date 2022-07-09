
import React from "react"
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import { logout } from '../../actions/session_actions';
import Welcome from './welcome';

const mapStateToProps = ({ session, entities: { users } }) => {
  return {
    session_id: session.id,
    open:  <Link to="/home">
                <button type="button">
                    Open
                </button>
            </Link>,
    login: <Link to="/login">
    <button type="button">
        Login
    </button>
</Link>
  };
};

const mapDispatchToProps = dispatch => ({
//   logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
