import React from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';
import './CurrentFriend.css';

class CurrentFriend extends React.Component {

  deleteFriend = () => {
    this.props.deleter(this.props.friend.uid);
  }

  render() {
    return (
      <ListGroupItem className="CurrentFriend">
        {this.props.friend.username}
        <Button bsStyle='danger' onClick={this.deleteFriend}>Delete</Button>
      </ListGroupItem>
    );
  }

};

export default CurrentFriend;
