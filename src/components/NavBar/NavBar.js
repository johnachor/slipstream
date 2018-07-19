import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';
import Logo from './img/logo.png';

class NavBar extends React.Component {
  render() {

    const {authed} = this.props;

    return (
      <div className="NavBar">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/" className="navbar-brand"><img alt="Brand logo" src={Logo} /></Link>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              {
                authed ? (
                  <ul className="nav navbar-nav navbar-right">
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/queue">My Queue</Link>
                    </li>
                    <li>
                      <Link to="/myreviews">My Reviews</Link>
                    </li>
                    <li>
                      <Link to="/search">Search</Link>
                    </li>
                  </ul>
                ) : (
                  <ul className="nav navbar-nav navbar-right">
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                  </ul>
                )
              }
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
