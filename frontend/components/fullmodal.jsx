import React from 'react';
import { hideFullModal } from '../actions/modal_actions';
import { connect } from 'react-redux';
import SettingsContainer from './settings/settings_container';
// import LoginFormContainer from '../session_form/login_form_container';
// import SignupFormContainer from '../session_form/signup_form_container';

class FullModal extends React.Component{
  constructor(props)
  {
    super(props)
    this.escFunction = this.escFunction.bind(this);
  }

  escFunction(event){
    if (event.key === "Escape") {
      this.props.hideFullModal();
    }
  }
  componentDidMount(){
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }
  render()
  {
    if (!this.props.modal) {
      return null;
    }
    let component;
    switch (this.props.modal) {
      case 'settings':
        component = <SettingsContainer/>;
        break;
      default:
        return null;
    }
    return (
      //   onClick={e => e.stopPropagation()
        <div className="modal-full">
          { component }
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    modal: state.ui.fullmodal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideFullModal: () => dispatch(hideFullModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullModal);