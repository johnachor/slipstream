import React from 'react';
import ActivityFeed from '../ActivityFeed/ActivityFeed';
import FriendList from '../FriendList/FriendList';
import fbFriends from '../../firebaseReqs/friends';
import helpers from './helpers';
import './Dashboard.css';

export default class Dashboard extends React.Component {

  state = {
    users: [],
    friendRequests: [],
    friendUids: [],
    friendObjects: [],
  }

  getUsersAndFriends = () => {
    fbFriends.retrieveBoth().then(usersAndFriends => {

      const users = Object.values(usersAndFriends[0].data);

      const friendRequests = Object.entries(usersAndFriends[1].data)
        .reduce(helpers.addKeyNameToObjects, [])
        .filter(helpers.filterForSelfAndFriends);

      const friendUids = friendRequests
        .filter(req => { return req.isAccepted; })
        .reduce(helpers.getUidsOfCurrentUsersFriends, []);

      const friendObjects = users.filter(user => { return friendUids.includes(user.uid); });

      this.setState({
        users: users,
        friendRequests: friendRequests,
        friendUids: friendUids,
      });

      // Doing this setState call separately resolves an issue where the friends list does not populate on first load
      // I have no idea why
      this.setState({
        friendObjects: friendObjects,
      });

    }).catch(err => console.error(err));
  }

  componentDidMount() {
    this.getUsersAndFriends();
    this.autoUpdate = setInterval(this.getUsersAndFriends, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.autoUpdate);
  }

  render() {
    return (
      <div className="Dashboard">
        <div className="container">
          <div className="col-xs-12 col-lg-8 col-md-7 activity-holder">
            <div className="container-fluid">
              <div className="col-xs-12">
                <ActivityFeed friends={this.state.friendObjects} friendUids={this.state.friendUids} users={this.state.users} />
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-lg-4 col-md-5">
            <FriendList updater={this.getUsersAndFriends} friendUids={this.state.friendUids} friendRequests={this.state.friendRequests} users={this.state.users}/>
          </div>
        </div>
      </div>
    );
  }
}
