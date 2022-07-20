import React from 'react';
import clouds from "../../../app/assets/images/main-page-clouds.svg"
import icon from "../../../app/assets/images/icon.png"
import leftWelcomePic from "../../../app/assets/images/main-page-left.svg"
import rightWelcomePic from "../../../app/assets/images/main-page-right.svg"


class Welcome extends React.Component
{
  constructor(props)
  {
    super(props)
  }

  componentDidMount()
  {
    document.body.style = 'overflow: hidden;'
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

    let demo;
    if (this.props.demo === "trash code time")
    {
        demo = <button id="welcome-demo" onClick={() => this.props.loginDemo()} type="button">
            Login as Demo User
        </button>
    }
    else {
        demo = this.props.demo;
    }
    return (
        <div id="welcome">
            <nav className="welcome-nav"> 
                <div className="left-nav">
                    <img id="icon" src={window.homeicon}/>
                    <h2>Dissonance</h2>
                </div>
                <div className="center-nav">
                
                    <a href="https://github.com/ForgoneReality/dissonance">Github</a> &nbsp; <a href="https://linkedin.com/">Linkedin</a>
                </div>
                <div className="right-nav">
                    {butt}
                </div>
            </nav>
            <section className="welcome-content">
                <h1>IMAGINE A PLACE...</h1>
                <p>...where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.</p>
                <div id="welcome-content-buttons">
                    {this.props.signup}
                    {demo}
                </div>

            </section>


            <img id="clouds" src={window.mainpageclouds}/>
            <img id="left-main" src={window.mainpageleft}/>
            <img id="right-main" src={window.mainpageright}/>
            

        </div>
    );
  }
};


export default Welcome;
