import React from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';
import './CurrentFriend.css';

class CurrentFriend extends React.Component {

  render() {
    return (
      <ListGroupItem>{this.props.friend.username}</ListGroupItem>
    );
  }

};

export default CurrentFriend;
