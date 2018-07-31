import React from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import fbAuth from '../../firebaseReqs/auth';
import './NavBar.css';
import Logo from './img/logo.png';

class NavBar extends React.Component {
  render() {

    const { authed } = this.props;

    const inLinksLeft = (
      <Nav>
        <LinkContainer to="/dashboard">
          <NavItem eventKey={1}>
          Dashboard
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/queue">
          <NavItem eventKey={2}>
            My Queue
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/myreviews">
          <NavItem eventKey={3}>
            My Reviews
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/search">
          <NavItem eventKey={4}>
            Search
          </NavItem>
        </LinkContainer>
      </Nav>
    );

    const logoutLink = (
      <Nav pullRight>
        <NavItem eventKey={5}>
          <Button className="authButton" bsStyle="link" onClick={fbAuth.logoutUser}>Logout</Button>
        </NavItem>
      </Nav>
    );

    const loginLink = (
      <Nav pullRight>
        <LinkContainer to="/login">
          <NavItem eventKey={5}>
            Login/Register
          </NavItem>
        </LinkContainer>
      </Nav>
    );

    return (
      <Navbar fixedTop inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to="/"><img alt="Brand logo" src={Logo} /></LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {authed ? inLinksLeft : ''}
          {authed ? logoutLink : loginLink}
        </Navbar.Collapse>
      </Navbar>
    );
  };
};

export default NavBar;
