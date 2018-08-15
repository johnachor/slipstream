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
      <div className="Login container">
        <div id="login-form">
          <form className="login-form col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
            <h1 className="text-center">Magic Words?</h1>
            <FormGroup>
              <ControlLabel>
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
            <Button bsStyle="primary" type="submit" onClick={this.loginClickEvent}>Login</Button>
            <Link className="text-right col-xs-12" to="/register">Register a new account</Link>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
