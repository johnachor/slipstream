import React from 'react';
import firebase from 'firebase';
import { Tabs, Tab, ListGroup } from 'react-bootstrap';
import CurrentFriend from '../CurrentFriend/CurrentFriend';
import './FriendList.css';

class FriendList extends React.Component {

  state = {
    currentFriends: [],
    pendingRequests: [],
    availableUsers: [],
  }

  checkIfRequested = (friendUid) => {
    const currentUid = firebase.auth().currentUser.uid;
    return this.props.friendRequests.find(friendReq => {
      return ((friendReq.senderUid === currentUid && friendReq.receiverUid === friendUid) || (friendReq.senderUid === friendUid && friendReq.receiverUid === currentUid));
    });
  };

  updateFriendsList = () => {
    const currentFriends = this.props.users.filter(user => { return this.props.friendUids.includes(user.uid); });
    const pendingRequests = this.props.friendRequests.filter(req => {
      return req.isPending && req.receiverUid === firebase.auth().currentUser.uid;
    });
    const availableUsers = this.props.users.filter(user => {
      return !this.checkIfRequested(user.uid) && user.uid !== firebase.auth().currentUser.uid;
    });
    this.setState({
      availableUsers: availableUsers,
      currentFriends: currentFriends,
      pendingRequests: pendingRequests,
    });
  }

  componentWillReceiveProps() {
    this.updateFriendsList();
  }

  render() {

    const currentFriendList = this.state.currentFriends.map(friend => {
      return (
        <CurrentFriend key={friend.uid} friend={friend} />
      );
    });

    return (
      <div className="FriendList">
        <Tabs defaultActiveKey={1} id="friendsListTabs">
          <Tab eventKey={1} title="Friends">
            <ListGroup>{currentFriendList}</ListGroup>
          </Tab>
          <Tab eventKey={2} title="Pending">
            Tab 2 content
          </Tab>
          <Tab eventKey={3} title="Find">
            Tab 3 content
          </Tab>
        </Tabs>;
      </div>
    );
  }
}

export default FriendList;
