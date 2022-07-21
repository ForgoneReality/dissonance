import React from "react";

class DropdownModal extends React.Component{
constructor(props) {
    super(props);

    this.state = {
      name: '',
      icon: null,
      photoUrl: null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFile = this.handleFile.bind(this)
  }


  componentDidMount()
  {

  }

  componentDidUpdate(){

  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    
    switch(this.props.modal_type)
    {
      case "createserver": 
        console.log("hello?")
        const server = Object.assign({}, this.state);
        // this.props.generateServer(server).then((res) => this.props.hideModal(), (errs) => console.log("Failure"));

        const formData = new FormData();
        formData.append("server[name]", this.state.name);
        formData.append("server[owner_id]", this.props.currentUser.id);
        formData.append("server[icon])", this.state.icon);
        console.log("OVER HERE", this.state.icon);
        $.ajax({
          url: "/api/servers",
          method: "POST",
          data: formData,
          contentType: false,
          processData: false
        }).then( (response) => {
          this.props.hideModal();
          this.props.receiveServer(response);
        })
        break;
      case "joinserver":
        break;
      default:
        console.log("something went wrong: ", this.props.modal_type);
        break;
    }
  }

  handleFile(e)
  {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({icon: file, photoUrl: fileReader.result});
    }

    if (file){
      fileReader.readAsDataURL(file);
    }
  }

  render() {
    let content;
    
    if (this.props.modal_type === "createserver")
    {
      let image_thing = this.state.photoUrl ? <img id="server-img-preview" src={this.state.photoUrl} /> : <div id="bruh9567"><label htmlFor="img-uploader1">
      <img src={window.serverimageupload} alt="server-upload-icon"/>
    </label> 
    <input type="file" id="img-uploader1" onChange={this.handleFile}></input></div>;
      content = <div id="create-server-modal">
        <div className="top2">
          <h1>Customize your server</h1>
          <h2>Give your new server a personality with a name an icon. You can always change it later.</h2>
        </div>
        <form>
          <div className="mid2">
              {image_thing}
            <h5>SERVER NAME</h5>
            <input id="bruh9861" type="text" value={this.state.name} onChange={this.update("name")}></input>
          </div>
          <div className="bot2">
            <button id="back-button-1" onClick={() => console.log("hi")}>
            Back
            </button>
            <button id="create-server-smol-button" className="submit1" onClick={this.handleSubmit}>
            Create
            </button>
          </div>
        </form>

      </div>
  }
  return(<div>{content}</div>)
  }
}




const mapStateToProps = state => {
  return {
    currentUser: state.session.currentUser,
    modal_type: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => dispatch(hideModal()), 
    showModal: (name) => dispatch(showModal(name)),
    receiveServer: (server) => dispatch(receiveServer(server))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DropdownModal);
