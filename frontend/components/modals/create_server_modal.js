// import React from 'react';
// import { connect } from 'react-redux';
// import { removeErrors } from '../../actions/errors_actions';
// import { hideModal, resetModal } from '../../actions/modal_actions';
// import {updateUser} from "../../actions/users_actions";

// class EditEmailModal extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//         email: this.props.currentUser.email,
//         password: ''
//     }
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   componentDidMount()
//   {
//     this.props.removeErrors();
//   }

//   update(field) {
//     return e => this.setState({
//       [field]: e.currentTarget.value
//     });
//   }

//   renderErrors() {
//     if(this.props.errors.length > 0)
//     {
//       return(
//         <ul>
//           {this.props.errors.map((error, i) => (
//             <li key={`error-${i}`}>
//               {error}
//             </li>
//           ))}
//         </ul>
//       )
//     }
//     else
//     {
//       return null;
//     }
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     const user = Object.assign({}, this.state);
//     this.props.processForm(this.props.currentUser.id, user).then((res) => this.props.hideModal(), (errs) => console.log("Failure"));
//   }

//   render() {
   
//   }
// }



// const mapStateToProps = state => {
//   return {
//     currentUser: state.session.currentUser,
//     errors: state.errors.user
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     removeErrors: () => dispatch(removeErrors()),
//     hideModal: () => dispatch(hideModal()), 
//     processForm: (id, user) => dispatch(updateUser(id, user))
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(EditEmailModal);
