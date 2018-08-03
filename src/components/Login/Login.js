import React from 'react';
import { Link } from 'react-router-dom';
import { FormControl, ControlLabel, FormGroup, Button } from 'react-bootstrap';
import fbAuth from '../../firebaseReqs/auth';
import './Login.css';

class Login extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
    },
  };

  loginClickEvent = (e) => {
    const { user } = this.state;
    e.preventDefault();
    fbAuth
      .loginUser(user)
      .then(() => {
        this.props.history.push('/dashboard');
      })
      .catch(err => console.error(err));
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

  render() {
    const { user } = this.state;
    return (
      <div className="Login">
        <div id="login-form">
          <h1 className="text-center">Login</h1>
          <form className="form-horizontal col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1">
            <FormGroup>
              <ControlLabel className="col-sm-4">
                Email
              </ControlLabel>
              <FormControl
                type="text"
                value={user.email}
                placeholder="Email address"
                onChange={this.emailChange}
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel className="col-sm-4">
                Password
              </ControlLabel>
              <FormControl
                type="password"
                value={user.password}
                placeholder="Password"
                onChange={this.passwordChange}
              />
            </FormGroup>
            <Button onClick={this.loginClickEvent}>Login</Button>
            <Link to="/register">Register a new account</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
