import React from 'react';
import firebase from 'firebase';
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
    return (
      <div className="FriendList">
        <h1>FriendList</h1>
      </div>
    );
  }
}

export default FriendList;
