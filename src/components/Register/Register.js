import React from 'react';
import { Link } from 'react-router-dom';
import { FormControl, ControlLabel, FormGroup, Button } from 'react-bootstrap';
import fbAuth from '../../firebaseReqs/auth';
import fbUsers from '../../firebaseReqs/users';
import fbFriends from '../../firebaseReqs/friends';
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

  // TODO: refactor this - single responsibility functions
  registerClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    fbUsers.getAllUsers()
      .catch(err => console.error(err))
      .then(fbReturnedUsers => {
        const existingUsernames = Object.values(fbReturnedUsers.data).reduce((usernameArray, user) => {
          usernameArray.push(user.username.toLowerCase().split(' ').join(''));
          return usernameArray;
        }, []);
        const existingEmails = Object.values(fbReturnedUsers.data).reduce((emailArray, user) => {
          emailArray.push(user.email.toLowerCase().split(' ').join(''));
          return emailArray;
        }, []);
        if (user.username.length < 6) {
          alert('Please enter a username of at least 6 characters.');
          document.getElementById('inputUsername').focus();
        } else if (user.password.length < 6) {
          alert('Passwords must be at least 6 characters in length.');
        } else if (existingEmails.includes(user.email)) {
          alert('Email address matches an existing account.');
        } else if (existingUsernames.includes(user.username.toLowerCase().split(' ').join(''))) {
          alert('Username already exists. Please choose another username.');
        } else if (user.password !== user.confirmPassword) {
          alert('Password fields do not match.');
          const tempUser = { ...this.state.user };
          tempUser.password = '';
          tempUser.confirmPassword = '';
          this.setState({ user: tempUser });
          document.getElementById('inputPassword').value = '';
          document.getElementById('confirmPassword').value = '';
        } else {
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
