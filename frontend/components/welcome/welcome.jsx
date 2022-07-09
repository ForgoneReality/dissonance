import React from 'react';
import clouds from "./main-page-clouds.svg"
import icon from "./icon.png"

class Welcome extends React.Component
{
  constructor(props)
  {
    super(props)
  }

  render()
  {
    const { session_id } = this.props;
    let butt;
    if(session_id)
    {
        butt=this.props.open;
    }
    else
    {
        butt = this.props.login;
    }
    return (
        <div>
            <nav className="welcome-nav"> 
                <div className="left-nav">
                    <h1>Dissonance</h1>
                </div>
                <div className="center-nav">
                    <a href="https://github.com/ForgoneReality/dissonance">Github</a> &nbsp; <a href="https://linkedin.com/">Linkedin</a>
                </div>
                <div className="right-nav">
                    {butt}
                </div>
            </nav>
            <img id="clouds" src={clouds}/>

        </div>
    );
  }
};


export default Welcome;
