import React from 'react';
import { Link } from 'react-router-dom';
import fbAuth from '../../firebaseReqs/auth';
import fbUsers from '../../firebaseReqs/users';
import './Register.css';

class Register extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
      confirmPassword: '',
      displayName: '',
    },
  };

  registerClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    if (user.displayName.length < 6) {
      alert('Please enter a display name of at least 6 characters.');
      document.getElementById('inputDisplayName').focus();
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
          fbUsers.createUserObject({
            uid: userResponse.user.uid,
            email: user.email,
            displayName: user.displayName,
          }).then(() => {
            this.props.history.push('/dashboard');
          });
        }).catch(err => console.error(err));
    }
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

  displayNameChange = (e) => {
    const tempUser = { ...this.state.user };
    tempUser.displayName = e.target.value;
    this.setState({ user: tempUser });
  };

  render() {
    const { user } = this.state;
    return (
      <div className="Register">
        <div id="login-form">
          <h1 className="text-center">Register</h1>
          <form className="form-horizontal col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1">
            <div className="form-group">
              <label htmlFor="inputDisplayName" className="col-sm-4 control-label">
                Display Name
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="inputDisplayName"
                  placeholder="Display Name"
                  value={user.displayName}
                  onChange={this.displayNameChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputEmail" className="col-sm-4 control-label">
                Email
              </label>
              <div className="col-sm-8">
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="Email"
                  value={user.email}
                  onChange={this.emailChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword" className="col-sm-4 control-label">
                Password
              </label>
              <div className="col-sm-8">
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword"
                  placeholder="Password"
                  value={user.password}
                  onChange={this.passwordChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="col-sm-4 control-label">
                Confirm Password
              </label>
              <div className="col-sm-8">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={user.confirmPassword}
                  onChange={this.confirmPasswordChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-5 col-sm-6">
                <button
                  type="submit"
                  className="btn btn-default col-xs-12"
                  onClick={this.registerClickEvent}
                >
                  Register
                </button>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10 text-right">
                <Link to="/login">Looking for the login page?</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
