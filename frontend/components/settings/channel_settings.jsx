import React from "react"

class ChannelSettings extends React.Component {
    constructor(props) {
        super(props);
        this.original = {
            name: this.props.currentChannel.name,
            description: this.props.currentChannel.description,
            changed: false
        }
        this.state = {
            name: this.props.currentChannel.name,
            description: this.props.currentChannel.description,
            changed: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleSubmit(e)
    {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        const formData = new FormData();
        formData.append("channel[name]", this.state.name);
        formData.append("channel[description]", this.state.description);

        //technically don't need this, just similar to 
        $.ajax({
            url: `/api/channels/${this.props.currentChannel.id}`,
            method: "PATCH",
            data: formData,
            contentType: false,
            processData: false
        }).then((res) => {
            this.original = this.state;
            this.original.changed = false;
            this.setState({changed: false});
            this.props.receiveChannel(res);
        });

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

        return(
            <div id="settings-modal" className="modal-full">
                <div id="left-side-settings">
                    <div id="left-container"> 
                        <h2>{this.props.currentChannel.name}</h2>
                        <div className="bruh-selected">
                            Overview
                        </div>
                        <div className="bruh-unselected">
                            Permissions
                        </div>
                        <hr/>
                    </div>
                </div>
                <div id="right-side-settings">
                    <div id="bruh9100">
                        <h1>Overview</h1>
                        <button onClick={() => this.props.hideFullModal()}>
                            <img id="exitimg" src={window.exitsettings}></img>
                        </button>
                    </div>

                    <h3>CHANNEL NAME</h3>
                    <input type="text" className="input-text2" value={this.state.name} onChange={this.update("name")}></input>

                    <hr style={{marginBottom: "16px"}}></hr>

                    <h3>CHANNEL DESCRIPTION</h3>
                    <input type="text" className="input-text2" value={this.state.description} onChange={this.update("description")}></input>

                    <hr style={{marginBottom: "16px"}}></hr>

                    <h3>CHANNEL REMOVAL</h3>
                    <button className="delete-button" onClick={() => this.props.displayModal("deletechannel")}>Delete Channel</button>


                    <div id="bruh3209">
                    <img src={window.channelsettings}/>
                    </div>

                    {save_settings_mini_modal}

                </div>

               
            </div>
        )
    }
}

export default ChannelSettings