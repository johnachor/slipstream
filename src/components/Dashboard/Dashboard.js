import React from 'react';
import ActivityFeed from '../ActivityFeed/ActivityFeed';
import FriendList from '../FriendList/FriendList';
import fbFriends from '../../firebaseReqs/friends';
import firebase from 'firebase';
import './Dashboard.css';

class Dashboard extends React.Component {

  state = {
    users: [],
    friendRequests: [],
    friendUids: [],
    friendObjects: [],
  }

  getUsersAndFriends = () => {
    fbFriends.retrieveBoth().then(usersAndFriends => {

      this.setState({ users: Object.values(usersAndFriends[0].data) });

      const friendRequests = Object.entries(usersAndFriends[1].data)
        // puts firebase IDs on request objects
        .reduce((acc, kvp) => {
          kvp[1].firebaseId = kvp[0];
          acc.push(kvp[1]);
          return acc;
        }, [])
        .filter(req => {
          // includes only requests relevant to current user
          return firebase.auth().currentUser.uid === req.senderUid || firebase.auth().currentUser.uid === req.receiverUid;
        });
      this.setState({ friendRequests: friendRequests });
      this.setState({
        friendUids: friendRequests
          .filter(req => { return req.isAccepted; })
          .reduce((accArray, currentReq) => {
            if (currentReq.senderUid === firebase.auth().currentUser.uid) {
              accArray.push(currentReq.receiverUid);
            } else {
              accArray.push(currentReq.senderUid);
            }
            return accArray;
          }, []),
      });
      this.setState({
        friendObjects: Object.values(usersAndFriends[0].data).filter(user => { return this.state.friendUids.includes(user.uid); }),
      });
    }).catch(err => console.error(err));
  }

  componentDidMount() {
    this.getUsersAndFriends();
  }

  render() {
    return (
      <div className="Dashboard">
        <div className="container-fluid">
          <div className="col-xs-12 col-md-9 activity-holder">
            <div className="container">
              <ActivityFeed updater={this.getUsersAndFriends} friends={this.state.friendObjects} friendUids={this.state.friendUids} />
            </div>
          </div>
          <div className="col-xs-12 col-md-3">
            <FriendList updater={this.getUsersAndFriends} friendUids={this.state.friendUids} friendRequests={this.state.friendRequests} users={this.state.users}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
