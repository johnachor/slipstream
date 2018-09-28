import React from 'react';
import { ListGroupItem, Button } from 'react-bootstrap';
import './AvailableProvider.css';

export default class AvailableProvider extends React.Component {

  subscribe = (e) => {
    e.target.disabled = true;
    this.props.subscribe(this.props.provider.providerId);
  }

  render() {
    return (
      <ListGroupItem className="AvailableProvider">
        {this.props.provider.name}
        <Button bsStyle='primary' onClick={this.subscribe}>Add</Button>
      </ListGroupItem>
    );
  }
};
