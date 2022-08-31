import React from "react"

class ServerSettings extends React.Component {
    constructor(props) {
        super(props);
        this.original = {
            name: this.props.currentServer.name,
            photoUrl: this.props.currentServer.image_url,
            photoFile: null,
            changed: false, 
            tabSelected: 0,
            invitelink: this.props.currentServer.server_link,
            invite_mode: 0
        }
        this.state = {
            name: this.props.currentServer.name,
            photoUrl: this.props.currentServer.image_url,
            photoFile: null,
            changed: false,
            tabSelected: 0,
            invitelink: this.props.currentServer.server_link,
            invite_mode: 0
        }
        this.handleFile = this.handleFile.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSubmit2 = this.handleSubmit2.bind(this)


    }


    handleFile(e)
    {
      const file = e.currentTarget.files[0];
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        this.setState({photoFile: file, photoUrl: fileReader.result, changed: true});
      }
  
      if (file){
        fileReader.readAsDataURL(file);
      }
    }

    handleSubmit(e)
    {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        const formData = new FormData();
        formData.append("server[name]", this.state.name);
        // formData.append("server[id]", this.props.currentServer.id);
        formData.append("server[icon]", this.state.photoFile);
        $.ajax({
            url: `/api/servers/${this.props.currentServer.id}`,
            method: "PATCH",
            data: formData,
            contentType: false,
            processData: false
        }).then((res) => {
            this.original = this.state;
            this.original.changed = false;
            this.setState({changed: false});
            console.log("CHANGED: ", this.state);
            this.props.updateServer(res);
        });
    }

    handleSubmit2(e)
    {
        e.preventDefault();
        this.props.updateInviteLink(this.props.currentServer.id, this.state.invitelink).then((res) => {
            if(Array.isArray(res))
            {
            this.setState({invite_mode: 2});
            }
            else
                this.setState({invite_mode: 1});
        }, () => this.setState({invite_mode: 2}));
    }

    update(field) {
        return e => this.setState({
          [field]: e.currentTarget.value,
          changed: true
        });
      }

    render()
    {
        // let server_pfp_label = this.state.photoUrl : <- Change to Remove button if it already exists
        let save_settings_mini_modal = this.state.changed ? <div id="save-mini">
            <p>Careful — you have unsaved changes!</p>
            <div id="bruh9390">
                <button className="cancel2" onClick={() => this.setState(this.original)}>Reset</button>
                <button type="submit" className="submit2" onClick={this.handleSubmit}>Save Changes</button>
            </div>
        </div> : <div></div>

        let pfp = this.state.photoUrl ? <img src={this.state.photoUrl} id="server_img_large"/> : <a className="server-link2"><div id="broi">{this.props.currentServer.name[0].toUpperCase()}</div></a>

        let button1 = this.state.tabSelected === 0 ? <div className="bruh-selected">Overview</div> : <div className="bruh-unselected" onClick={() => this.setState({tabSelected: 0})}>Overview</div>;
        let button2 = this.state.tabSelected === 1 ? <div className="bruh-selected">Roles</div> : <div className="bruh-unselected" onClick={() => this.setState({tabSelected: 1})}>Roles</div>;
        let button3 = this.state.tabSelected === 2 ? <div className="bruh-selected">Emoji</div> : <div className="bruh-unselected" onClick={() => this.setState({tabSelected: 2})}>Emoji</div>;
        let button4 = this.state.tabSelected === 3 ? <div className="bruh-selected">Custom Invite Link</div> : <div className="bruh-unselected" onClick={() => this.setState({tabSelected: 3, invite_mode: 0})}>Custom Invite Link</div>;

        let settingsContent;

        switch(this.state.tabSelected)
        {
            case 0:
                settingsContent = <div id="right-side-settings">
                <div id="bruh9100">
                    <h1>Server Overview</h1>
                    <button onClick={() => this.props.hideFullModal()}>
                        <img id="exitimg" src={window.exitsettings}></img>
                    </button>
                </div>

                <div id="bruh9101">
                    <div id="bruh9102">
                        <div id="bruh9109">
                            <div id="bruh8109">
                                {pfp}
                            </div>
                            {/* <div id="sadge">
                                <img src={window.editimg} id="uploadimgicon"></img>
                            </div> */}
                        </div>
                        <p id="bruh9328">Minimum Size: <span>128x128</span></p>
                    </div>
                    <div id="bruh9103">
                        <h3>
                            We recommend that an image of at least 512x512 for the server.
                        </h3>
                        <input id="bruh9110" type="file" onChange={this.handleFile}/>
                        <button  id="bruh9111" onClick= {() => document.getElementById('bruh9110').click()}>Upload Image</button>
                    </div>
                    <div id="bruh9400">
                        <h3>SERVER NAME</h3>
                        <input type="text" className="input-text" value={this.state.name} onChange={this.update("name")}></input>
                    </div>
                </div>
                
                
                <div id="bruh9004">
                    <h1>Server Banner Background </h1>
                    <img id="passwordimg" src={window.passwordimg} alt="password-img"></img>
                    <hr/>
                </div>

                <h3>SERVER REMOVAL</h3>
                <button className="delete-button" onClick={() => this.props.displayModal("deleteserver")}>Delete Server</button>

                {save_settings_mini_modal}
                </div>
                break;
            case 1:
                settingsContent = <div id="right-side-settings" style={{paddingLeft: "0px"}}>
                    <div style={{display: "flex"}}>
                        <div id="bruh1203">
                            <h1>Roles</h1>

                        </div>
                        <div>

                        </div>
                    </div>
                </div>
                break;
            case 2:
                break;
            case 3:
                let extraText = "";
                if(this.state.invite_mode === 1)
                {
                    extraText = <div id="nyo">Successfully changed Invite Link!</div>
                }
                else if(this.state.invite_mode === 2)
                {
                    extraText = <div id="nye">Invite Link is already taken</div>
                }
                settingsContent = <div id="right-side-settings">
                    <h1 style={{marginTop: "32px"}}>Custom Invite Link</h1>
                    <form onSubmit={this.handleSubmit2} id="addfriendform" style={{marginBottom: "0px"}}>
                        <input type="text" id="addfriendinput" value={this.state.invitelink} onChange={this.update("invitelink")}></input>
                        <button type="submit" id="emoney" className="submit1">Update Link</button>
                    </form>
                    {extraText}

                </div>
                break;
            default:
                break;


        }
        return(
            <div id="settings-modal" className="modal-full">
                <div id="left-side-settings">
                    <div id="left-container"> 
                        <h2>{this.props.currentServer.name.toUpperCase()}</h2>
                        {button1}
                        {button2}
                        {button3}
                        {button4}
                        <hr/>
                    </div>
                </div>
                {settingsContent}
            </div>
        )
    }
}

export default ServerSettings