import React from 'react';
import { findUser } from '../../actions/users_actions.js';
import { searchConversation } from '../../util/conversations_api_util.jsx';
import { withRouter } from 'react-router-dom';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

class FriendList extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      addfriendtxt: "",
      selectedTab: 0 //0: Online, 1: All, 2: Pending, 3: Add Friend
    }
    this.addFriend = this.addFriend.bind(this);
  }

  addFriend(e)
  {
    let str = this.state.addfriendtxt;
    if (str.length < 6)
    {
      this.props.addUserError("Must be at least length 6, including the hashtag and fourdigit id")
    }
    else if (str[str.length - 5] !== "#")
    {
      this.props.addUserError("Must be in the format: username#1234")
    }
    else if (numbers.includes(str[str.length -4]) && numbers.includes(str[str.length - 3]) && numbers.includes(str[str.length - 2]) && numbers.includes(str[str.length -1]))
    {
      let username = str.slice(0, str.length-5);
      let id = str.slice(str.length-4)
   
      this.props.findUser(username, id).then((user) => {
        if(Object.keys(this.props.friends).includes(user.result.id.toString()))
        {
          this.props.addUserError(` ${user.result.username} is already your friend!`)
        }
        else
        {
          this.props.addFriend(this.props.currentUser.id, user.result.id);
          this.props.receiveUser(user.result);
          
        }
        
       
        
      }, (err) => console.log("Errors", err));
     

    }
    else
    {
      this.props.addUserError("Please include the 4-digit tag at the end of the username i.e. #1684")
    }
  }

  componentDidMount()
  {
    this.props.removeErrors();
    this.props.fetchFriendsList(this.props.currentUser.id)
  }

  handleClick(friend_id)
  {
    searchConversation(this.props.currentUser.id, friend_id).then(res => {
      if(Array.isArray(res))
      {
        this.props.createConvo(this.props.currentUser.id, friend_id).then((res2) => {this.props.history.push(`/conversations/${res2.conversation.id}`); 
       })
      }
      else
      {
        this.props.history.push(`/conversations/${res.id}`);
      }
      
    })
  }

  update(property) {
    return e => this.setState({ [property]: e.currentTarget.value });
  }

  render() {
    let sortedList = Object.values(this.props.friends).sort((a,b) => a.username.toLowerCase() > b.username.toLowerCase() ? 1 : -1);
    let onlineList = sortedList.filter((user) => user.status !== "offline")

    let button1 = this.state.selectedTab === 0 ? <button className="butt-selected">Online</button> : <button className="butt" onClick={() => this.setState({selectedTab: 0})}>Online</button>
    let button2 = this.state.selectedTab === 1 ? <button className="butt-selected">All</button> : <button className="butt" onClick={() => this.setState({selectedTab: 1})}>All</button>
    let button3 = this.state.selectedTab === 2 ? <button className="butt-selected">Pending</button> : <button className="butt">Pending</button>
    let button4 = this.state.selectedTab === 3 ? <button className="butt-selected2">Add Friend</button> : <button className="butt2" onClick={() => this.setState({selectedTab: 3})}>Add Friend</button>
    
    
    let listContents;
    let fList;
    let listHeader;
    switch(this.state.selectedTab)
    {
      case 0:
        fList = onlineList.map( (fren) => {
          let useronlinestatus = null;
          if(fren.status === "online")
          {
            useronlinestatus = <svg height="15" width="15"><circle cx="7.5" cy="7.5" r="6" stroke="#2f3136" strokeWidth="2.25" fill="#3ba55d" /> </svg> 
          }
          else if (fren.status === "offline")
          {
            useronlinestatus = <svg height="15" width="15"><circle cx="7.5" cy="7.5" r="3.75" stroke="#96989d" strokeWidth="2.25" fill="#2f3136" /> <circle cx="7.5" cy="7.5" r="6" stroke="#2f3136" strokeWidth="2.25" fill="none" /> </svg> 
          }
          else if (fren.status === "busy")
          {
            useronlinestatus = <svg height="15" width="15"><circle cx="7.5" cy="7.5" r="6" stroke="#2f3136" strokeWidth="2.25" fill="#D83C3E" /> </svg> 
            
          }
          else if (fren.status === "idle")
          {
            useronlinestatus = <svg height="15" width="15"><circle cx="7.5" cy="7.5" r="6" stroke="#2f3136" strokeWidth="2.25" fill="#faa81b" /> </svg> 
            
          }

          return(
              <li key={fren.id} id="bruh0033" onClick={(e) => this.handleClick(fren.id)}>
                <div id="bruh30">
                  <div className="bruh001" style={{paddingLeft: "0px"}}>
                    <img className="sidepfp" src={fren.pfp_url}></img>
                    <div className="useronlinestatusicon2">
                      {useronlinestatus}
                    </div>
                  </div>
                  <div className="bruh0244">
                    <h2>{fren.username}</h2>
                    <p>{fren.bio && fren.status !== "offline" ? fren.bio : fren.status}</p>
                  </div>
                </div>
                <div style={{background: "#2F3136", borderRadius: "24px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <svg class="icon-1WVg4I" aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24" fill="none"><path fill="#B9BBBE" d="M4.79805 3C3.80445 3 2.99805 3.8055 2.99805 4.8V15.6C2.99805 16.5936 3.80445 17.4 4.79805 17.4H7.49805V21L11.098 17.4H19.198C20.1925 17.4 20.998 16.5936 20.998 15.6V4.8C20.998 3.8055 20.1925 3 19.198 3H4.79805Z"></path></svg>
                </div>
              </li>
          )
        })
        listContents = <div id="bruh0505">
          {fList}
        </div>
        listHeader = <h3>ONLINE - {onlineList.length}</h3>

        break;
      case 1:
        fList = sortedList.map( (fren) => {
          let useronlinestatus = null;
          if(fren.status === "online")
          {
            useronlinestatus = <svg height="15" width="15"><circle cx="7.5" cy="7.5" r="6" stroke="#2f3136" strokeWidth="2.25" fill="#3ba55d" /> </svg> 
          }
          else if (fren.status === "offline")
          {
            useronlinestatus = <svg height="15" width="15"><circle cx="7.5" cy="7.5" r="3.75" stroke="#96989d" strokeWidth="2.25" fill="#2f3136" /> <circle cx="7.5" cy="7.5" r="6" stroke="#2f3136" strokeWidth="2.25" fill="none" /> </svg> 
          }
          else if (fren.status === "busy")
          {
            useronlinestatus = <svg height="15" width="15"><circle cx="7.5" cy="7.5" r="6" stroke="#2f3136" strokeWidth="2.25" fill="#D83C3E" /> </svg> 
            
          }
          else if (fren.status === "idle")
          {
            useronlinestatus = <svg height="15" width="15"><circle cx="7.5" cy="7.5" r="6" stroke="#2f3136" strokeWidth="2.25" fill="#faa81b" /> </svg> 
            
          }

          return(
            <li key={fren.id} id="bruh0033" onClick={(e) => this.handleClick(fren.id)}>
            <div id="bruh30">
              <div className="bruh001" style={{paddingLeft: "0px"}}>
                <img className="sidepfp" src={fren.pfp_url}></img>
                <div className="useronlinestatusicon2">
                  {useronlinestatus}
                </div>
              </div>
              <div className="bruh0244">
                <h2>{fren.username}</h2>
                <p>{fren.bio && fren.status !== "offline" ? fren.bio : fren.status}</p>
              </div>
            </div>
            <div style={{background: "#2F3136", borderRadius: "24px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center"}}>
              <svg class="icon-1WVg4I" aria-hidden="true" role="img" width="20" height="20" viewBox="0 0 24 24" fill="none"><path fill="#B9BBBE" d="M4.79805 3C3.80445 3 2.99805 3.8055 2.99805 4.8V15.6C2.99805 16.5936 3.80445 17.4 4.79805 17.4H7.49805V21L11.098 17.4H19.198C20.1925 17.4 20.998 16.5936 20.998 15.6V4.8C20.998 3.8055 20.1925 3 19.198 3H4.79805Z"></path></svg>
            </div>
          </li>
          )
        })
        listContents = <div id="bruh0505">
          {fList}
        </div>
        listHeader = <h3>ALL - {sortedList.length}</h3>

        break;
      case 2:
        //needs future implementation
        break;
      case 3:
        listContents = <div className='addFriend'>
          <h1>ADD FRIEND</h1>
          <p id="zzzz">You can add a friend by entering their discord tag. For example: Bobby#1049</p>
          <p>{this.props.errors[0]}</p>
          <form id="addfriendform" onSubmit={this.addFriend}>
            <input id="addfriendinput" type="text" placeholder="Enter a Username#0000" onChange={this.update("addfriendtxt")}/>
            <button id="emoney" type="Submit" value={this.state.addfriendtxt}>Add Friend</button>
          </form>
      </div>
      default:

        break;
    }
   

    
    // const panes = [
    //   {title: 'online', content: fList},
    //   {title: 'temp', content: 'Second pane here'},
    //   {title: 'AddFriend', content: addFriend}
    // ];
    
    return (
      <section className="friendsList">
        {/* <Tabs panes={panes} /> */}
        <div id="friends-list-header">
          <div id="bruh4909">
            <svg x="0" y="0" class="icon-2xnN2Y" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path fill="#96989D" fillRule="nonzero" d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z" transform="translate(2 4)"></path><path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z"></path></g></svg>
            <h1>Friends</h1>
          </div>
          <div class="divider2"></div>
          {button1}
          {button2}
          {button3}
          {button4}
        </div>
        {listHeader}
        {listContents}
      </section>
    );
  }
}

export default withRouter(FriendList);
