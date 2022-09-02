import React from "react"

const Footerr = (
  {useronlinestatus, username, fourdigit_id, openSettings, pfp_url, displayModal}) => {
    return (<div className="userFooter">
    <div className="bruh001" style={{cursor: "pointer"}} onClick={() => displayModal("user-status")}>
      <img id="footerpfp" className="sidepfp" src={pfp_url} alt="currentUserPFP"></img>
      <div className="useronlinestatusicon">
        {useronlinestatus}
      </div>
    </div>
    <div>
      <h2>{username}</h2>
      <p>#{fourdigit_id}</p>
    </div>
    <button onClick={openSettings} id="settings-button">
      <img id="settings-icon" src={window.settingsicon} alt="settings-icon"></img>
    </button>
  </div>)

}

export default Footerr;