import { connect } from 'react-redux';

import { removeErrors } from '../../actions/errors_actions.js';
import { fetchFriendsList } from '../../actions/users_actions.js';
import FriendList from "./friend_list.js"
import { addUserError, findUser } from '../../actions/users_actions.js';
import { receiveUser, createFriendship} from '../../actions/users_actions.js';

const mapStateToProps = (state) => {
  return {
    errors: state.errors.user,
    currentUser: state.session.currentUser,
    friends: state.entities.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeErrors: () => dispatch(removeErrors()),
    fetchFriendsList: (id) => dispatch(fetchFriendsList(id)),
    addUserError: (err) => dispatch(addUserError(err)),
    findUser: (username, id) => dispatch(findUser(username, id)),
    addFriend: (user_id, friend_id) => 
    {
      createFriendship(user_id, friend_id);
    },
    receiveUser: (user) => dispatch(receiveUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);