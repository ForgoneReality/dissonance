import React from "react"

class Settings extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: this.props.currentUser.email,
        username: this.props.currentUser.username,
        fourdigit_id: this.props.currentUser.fourdigit_id,
        password: '',
        // photoFile: null,
        // photoUrl: null,
        // imageUploaded: false
      }

      this.handleFile = this.handleFile.bind(this)
    }

    //IDEALLY THERE SHOULD BE A PREVIEW AND YOU CAN DISCARD CHANGES 
    handleFile(e)
    {
      const file = e.currentTarget.files[0];
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        // this.setState({photoFile: file, photoUrl: fileReader.result, imageUploaded: true});
        // this.setState({photoFile: file, photoUrl: fileReader.result});
        console.log("CID", this.props.currentUser.id);
        this.props.changePFP(this.props.currentUser.id, file);
      }
  
      if (file){
        fileReader.readAsDataURL(file);
      }
    }

    render()
    {
        let pass_butt = !this.props.isDemo ? <button id="changepass" className="settings-button" onClick={() => this.props.showPasswordModal()}>Change Password</button> : <button id="changepassdemo" className="settings-button">Change Password</button> 
        let bio = this.props.currentUser.bio ? this.props.currentUser.bio : "Nothing here...";
        return(
            <div id="settings-modal" className="modal-full">
                <div id="left-side-settings">
                    <div id="left-container"> 
                        <h2>User Settings</h2>
                        <div className="bruh-selected">
                            My Account
                        </div>
                        <div className="bruh-unselected">
                            User Profile
                        </div>
                        <hr/>
                        
                        <button id="logout-butt" onClick={() => this.props.showLogoutModal()}>
                            Log Out
                            <img  src={window.logoutimg}></img>
                        </button>
                    </div>
                </div>
                <div id="right-side-settings">
                    <div id="bruh9100">
                        <h1>My Account</h1>
                    <button onClick={() => this.props.hideFullModal()}>
                            <img id="exitimg" src={window.exitsettings}></img>
                        </button>
                    </div>
                    <div id="settings-bubble">
                        <div id="settings-header">
                            <div id="bruh9045">
                            <label htmlFor="pfp-uploader">
                                <img src={this.props.currentUser.pfp_url} className="pfp-large" />
                            </label> 
                            <input type="file" id="pfp-uploader" onChange={this.handleFile}></input>
                            <div id="sadge">
                                <img src={window.editimg} id="uploadimgicon"></img>
                            </div>
                            <div id="painge"></div>
                            </div>
                            <p><span className="white">{this.props.currentUser.username}</span><span className="B9">#{this.props.currentUser.fourdigit_id}</span></p>
                            <button id="bruh9002" className="settings-button">Edit Profile</button>
                        </div>
                        <div id="settings-bubble-inception">
                            <div className="space-between">
                                <div>
                                    <h3>USERNAME</h3>
                                    <p><span className="white">{this.props.currentUser.username}</span><span className="B9">#{this.props.currentUser.fourdigit_id}</span></p>
                                </div>

                                <button className="edit-button" onClick={() => this.props.showUsernameModal()}>Edit</button> 
                            </div>
                            <div className="space-between">
                                <div >
                                    <h3>EMAIL</h3>
                                    <p>{this.props.currentUser.email}</p>
                                </div>

                                <button className="edit-button" onClick={() => this.props.showEmailModal()}>Edit</button> 
                            </div>
                            <div className="space-between">
                                <div id="bruh9003">
                                    <h3>ABOUT ME</h3> 
                                    <p id="about-me-settings">{bio}</p>
                                    {/* <button>Save</button>  */}
                                </div>
                                <button className="edit-button">Edit</button> 
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <div id="bruh9004">
                        <h1>Password and Authentication</h1>
                        <img id="passwordimg" src={window.passwordimg} alt="password-img"></img>
                        {pass_butt}
                        <hr/>
                    </div>

                    <h3>ACCOUNT REMOVAL</h3>
                    <button className="delete-button">Delete Account</button>

                </div>
            </div>
        )
    }
}

export default Settings