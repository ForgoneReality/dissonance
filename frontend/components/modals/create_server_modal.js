import React from 'react';
import { connect } from 'react-redux';
import { hideModal, resetModal } from '../../actions/modal_actions';

class CreateServerModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        name: '',
        owner: this.props.currentUser.id,
        photoFile: null,
        photoUrl: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFile = this.handleFile.bind(this)
  }


  componentDidMount()
  {
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const server = Object.assign({}, this.state);
    this.props.generateServer(server, this.props.currentUser).then((res) => this.props.hideModal(), (errs) => console.log("Failure"));
  }

  handleFile(e)
  {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({photoFile: file, photoUrl: fileReader.result});
    }

    if (file){
      fileReader.readAsDataURL(file);
    }
  }

  render() {
   
  }
}



const mapStateToProps = state => {
  return {
    currentUser: state.session.currentUser  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => dispatch(hideModal()), 
    generateServer: (server) => dispatch(generateServer(server))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateServerModal);
