import React from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';
import firebase from 'firebase';
import './FriendSearchResult.css';

class FriendSearchResult extends React.Component {

  requestFriend = () => {
    const requestObject = {
      senderUid: firebase.auth().currentUser.uid,
      receiverUid: this.props.user.uid,
      isAccepted: false,
      isPending: true,
    };
    this.props.requester(requestObject);
  }

  render() {
    return (
      <ListGroupItem className="FriendSearchResult">
        {this.props.user.username}
        <Button bsStyle='info' onClick={this.requestFriend}>Add Friend</Button>
      </ListGroupItem>
    );
  }

};

export default FriendSearchResult;
