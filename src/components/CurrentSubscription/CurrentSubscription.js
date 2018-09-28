import React from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';
import './CurrentSubscription.css';

export default class CurrentSubscription extends React.Component {

  unsubscribe = () => {
    this.props.deleter(this.props.sub.firebaseId);
  }

  render() {
    return (
      <ListGroupItem className="CurrentSubscription">
        {this.props.providerName}
        <Button bsStyle='danger' onClick={this.unsubscribe}>Remove</Button>
      </ListGroupItem>
    );
  }
};
