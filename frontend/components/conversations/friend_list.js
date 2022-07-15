import React from 'react';
import Tabs from './tabs.jsx';
import { findUser } from '../../actions/users_actions.js';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

class FriendList extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      addfriendtxt: ""
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

  update(property) {
    return e => this.setState({ [property]: e.currentTarget.value });
  }

  render() {
    let sortedList = Object.values(this.props.friends).sort((a,b) => a.username > b.username ? 1 : -1);
    let fList = sortedList.map( (fren) => {
        return(
            <li key={fren.id}>
                <h2>{fren.username}</h2>
                {fren.bio && fren.status !== "offline" ? fren.bio : fren.status}
            </li>
        )
    })

    let addFriend = <div className='addFriend'>
        <h2>ADD FRIEND</h2>
        <p>You can add a friend by entering their discord tag. For example: Bobby#1049</p>
        <p>{this.props.errors[0]}</p>
        <form id="addfriendform" onSubmit={this.addFriend}>
          <input id="addfriendinput" type="text" onChange={this.update("addfriendtxt")}/>
          <button type="Submit" value={this.state.addfriendtxt}>Add Friend</button>
        </form>
    </div>
    const panes = [
      {title: 'online', content: fList},
      {title: 'temp', content: 'Second pane here'},
      {title: 'AddFriend', content: addFriend}
    ];
    
    return (
      <section className="friendsList">
        <Tabs panes={panes} />
      </section>
    );
  }
}

export default FriendList;
