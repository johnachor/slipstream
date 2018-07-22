import React from 'react';
import ActivityFeed from '../ActivityFeed/ActivityFeed';
import FriendList from '../FriendList/FriendList';
import './Dashboard.css';

class Dashboard extends React.Component {

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
