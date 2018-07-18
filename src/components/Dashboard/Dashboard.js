import React from 'react';
import firebase from 'firebase';

import './Dashboard.css';

class Dashboard extends React.Component {

  logout = () => {
    firebase.auth().signOut();
  }

  render() {
    return (
      <div className="Dashboard">
        <h1>Dashboard</h1>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Dashboard;
