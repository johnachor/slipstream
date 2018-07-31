import React from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import fbAuth from '../../firebaseReqs/auth';
import './NavBar.css';
import Logo from './img/logo.png';

class NavBar extends React.Component {
  render() {

    const { authed } = this.props;

    const inLinksLeft = (
      <Nav>
        <NavItem eventKey={1}>
          <Link to="/dashboard">Dashboard</Link>
        </NavItem>
        <NavItem eventKey={2}>
          <Link to="/queue">My Queue</Link>
        </NavItem>
        <NavItem eventKey={3}>
          <Link to="/myreviews">My Reviews</Link>
        </NavItem>
        <NavItem eventKey={4}>
          <Link to="/search">Search</Link>
        </NavItem>
      </Nav>
    );

    const inLinksRight = (
      <Nav pullRight>
        <NavItem eventKey={5}>
          <Button bsStyle="warning" onClick={fbAuth.logoutUser}>Logout</Button>
        </NavItem>
      </Nav>
    );

    return (
      <Navbar fixedTop inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/"><img alt="Brand logo" src={Logo} /></Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {inLinksLeft}
          {inLinksRight}
        </Navbar.Collapse>
      </Navbar>
    );
  };
};

export default NavBar;
