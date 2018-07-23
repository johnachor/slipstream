import React from 'react';
import ActivityFeed from '../ActivityFeed/ActivityFeed';
import FriendList from '../FriendList/FriendList';
import fbFriends from '../../firebaseReqs/friends';
import './Dashboard.css';

class Dashboard extends React.Component {

  state = {
    users: [],
    friendRequests: [],
  }

  getUsersAndFriends = () => {
    fbFriends.retrieveBoth().then(usersAndFriends => {
      this.setState({ users: Object.values(usersAndFriends[0].data) });
      const friendRequests = Object.entries(usersAndFriends[1].data).reduce((acc, kvp) => {
        kvp[1].reqId = kvp[0];
        acc.push(kvp[1]);
        return acc;
      }, []);
      this.setState({ friendRequests: friendRequests });
    }).catch(err => console.error(err));
  }

  componentDidMount() {
    this.getUsersAndFriends();
  }

  render() {
    return (
      <div className="Dashboard">
        <div className="container-fluid">
          <div className="col-xs-12 col-sm-9">
            <ActivityFeed />
          </div>
          <div className="col-xs-12 col-sm-3">
            <FriendList />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
