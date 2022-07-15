import React from "react";

import { channelRedirect } from "../../util/servers_api_util";
import { Redirect } from "react-router-dom";

class serverInit extends React.Component {
    render()
    {
        console.log("WTF")
        const serverId = props.match.params.serverId;

        channelRedirect(serverId).then( (res) => 
        {
            console.log("?", res.id);
            <Redirect to={`/channels/${res.id}`}/>;
        });
    }
}

export default serverInit;