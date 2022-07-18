import React from "react"

class Settings extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email: this.props.currentUser.email,
        username: this.props.currentUser.username,
        fourdigit_id: this.props.currentUser.fourdigit_id,
        password: ''
      }
    }

    render()
    {
        return(
            <div id="settings-modal">
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
                        
                        <button id="logout-butt">
                            Log Out
                            <img  src={window.logoutimg}></img>
                        </button>
                    </div>
                </div>
                <div id="right-side-settings">
                    <div id="bruh9100">
                        <h1>My Account</h1>
                        <img id="exitimg" src={window.exitsettings}></img>
                    </div>
                    <div id="settings-bubble">
                        <div id="settings-header">
                            <img src={this.props.currentUser.pfp_url} className="pfp-large"></img>
                            <p><span className="white">{this.props.currentUser.username}</span><span className="B9">#{this.props.currentUser.fourdigit_id}</span></p>
                            <button id="bruh9002" className="settings-button">Edit Profile</button>
                        </div>
                        <div id="settings-bubble-inception">
                            <div className="space-between">
                                <div>
                                    <h3>USERNAME</h3>
                                    <p><span className="white">{this.props.currentUser.username}</span><span className="B9">#{this.props.currentUser.fourdigit_id}</span></p>
                                </div>

                                <button className="edit-button">Edit</button> 
                            </div>
                            <div className="space-between">
                                <div >
                                    <h3>EMAIL</h3>
                                    <p>{this.props.currentUser.email}</p>
                                </div>

                                <button className="edit-button">Edit</button> 
                            </div>
                            <div className="space-between">
                                <div id="bruh9003">
                                    <h3>ABOUT ME</h3> 
                                    <p id="about-me-settings">{this.props.currentUser.bio}LOOOO</p>
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
                        <button id="changepass" className="settings-button">Change Password</button>
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