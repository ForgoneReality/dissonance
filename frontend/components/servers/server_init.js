import React from "react";

import { channelRedirect } from "../../util/servers_api_util";
import { Redirect } from "react-router-dom";

class serverInit extends React.Component {
    constructor(props)
    {
        super(props)
        this.state = {
            redirectToReferrer: false,
            address: -1
        }
    }
    
    componentDidMount(){
        const serverId = this.props.match.params.serverId;
        channelRedirect(serverId).then( (res) => 
        {
            this.setState({redirectToReferrer: true, address: res.id})
        });
    }

    render()
    {
        
        if (this.state.redirectToReferrer) {
            return (
              <Redirect to={`/channels/${this.state.address}`}/>
            )
        }
        else{
            return(<div></div>)
        }
    }
}

export default serverInit;