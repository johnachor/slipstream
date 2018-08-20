import React from 'react';
import { Link } from 'react-router-dom';
import { FormControl, ControlLabel, FormGroup, Button } from 'react-bootstrap';
import fbAuth from '../../firebaseReqs/auth';
import fbUsers from '../../firebaseReqs/users';
import fbFriends from '../../firebaseReqs/friends';
import { validateNewUser, getTestFailFeedback } from './validate';
import './Register.css';

class Register extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
    },
  };

  registerClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    fbUsers.getAllUsers()
      .catch(err => console.error(err))
      .then(fbReturnedUsers => {

        const testResults = validateNewUser(user, fbReturnedUsers.data);

        if (!testResults.length) {
          fbAuth.registerUser(user)
            .then((userResponse) => {
              const uid = userResponse.user.uid;
              const newUserObject = {
                uid: uid,
                email: user.email,
                username: user.username,
              };
              const newFriendObject = {
                senderUid: uid,
                receiverUid: '92CMQWn4vhUBN7FxoVczxKL43tq1',
                isAccepted: true,
                isPending: false,
              };
              Promise.all([fbUsers.createUserObject(newUserObject), fbFriends.addRequest(newFriendObject)])
                .then(this.props.history.push('/search'));
            }).catch(err => console.error(err));
        } else {
          alert('Please fix the following issues:\n\n' + testResults.map(getTestFailFeedback).join('\n'));
        }
      });
  };

  emailChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.email = e.target.value;
    this.setState({ user: tempUser });
  };

  passwordChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.password = e.target.value;
    this.setState({ user: tempUser });
  };

  confirmPasswordChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.confirmPassword = e.target.value;
    this.setState({ user: tempUser });
  };

  usernameChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.username = e.target.value;
    this.setState({ user: tempUser });
  };

  render() {
    const { user } = this.state;
    return (
      <div className="Register container">
        <div id="register-form">
          <form className="register-form col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
            <h1 className="text-center">Register</h1>
            <FormGroup>
              <ControlLabel className="text-left">
                Username
              </ControlLabel>
              <FormControl
                type="text"
                value={user.username}
                placeholder="Username"
                onChange={this.usernameChange}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>
                Email address
              </ControlLabel>
              <FormControl
                type="text"
                value={user.email}
                placeholder="Email address"
                onChange={this.emailChange}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>
                Password
              </ControlLabel>
              <FormControl
                type="password"
                value={user.password}
                placeholder="Password"
                onChange={this.passwordChange}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>
                Confirm Password
              </ControlLabel>
              <FormControl
                type="password"
                value={user.confirmPassword}
                placeholder="Confirm Password"
                onChange={this.confirmPasswordChange}
              />
            </FormGroup>
            <Button bsStyle="primary" type="submit" onClick={this.registerClickEvent}>Register</Button>
            <Link className="col-xs-12 text-right" to="/login">Looking for the login page?</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
