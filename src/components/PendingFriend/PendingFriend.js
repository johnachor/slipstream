import React from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';
import './PendingFriend.css';

class PendingFriend extends React.Component {

  deleteFriendRequest = () => {
    this.props.deleter(this.props.req.firebaseId);
  }

  confirmFriendRequest = () => {
    const acceptedReq = { ...this.props.req };
    delete acceptedReq.firebaseId;
    acceptedReq.isAccepted = true;
    acceptedReq.isPending = false;
    this.props.confirm(this.props.req.firebaseId, acceptedReq);
  }

  render() {
    return (
      <ListGroupItem className="PendingFriend">
        {this.props.req.username}
        <Button bsStyle='danger' onClick={this.deleteFriendRequest}>Delete</Button>
        <Button bsStyle='primary' onClick={this.confirmFriendRequest}>Confirm</Button>
      </ListGroupItem>
    );
  }

};

export default PendingFriend;
