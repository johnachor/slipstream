import React from 'react';
import { Redirect } from 'react-router-dom';
import './Home.css';

class Home extends React.Component {

  render() {
    return (
      <Redirect
        to={{ pathname: this.props.authed ? '/dashboard' : '/login' }}
      />
    );
  }
}

export default Home;
