import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from '../components/Dashboard/Dashboard';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
import MediaDetail from '../components/MediaDetail/MediaDetail';
import NavBar from '../components/NavBar/NavBar';
import OwnReviews from '../components/OwnReviews/OwnReviews';
import Queue from '../components/Queue/Queue';
import Register from '../components/Register/Register';
import Search from '../components/Search/Search';
import firebase from 'firebase';
import firebaseInit from '../firebaseReqs/initialize';

firebaseInit();

// Private Routes only accessible when user is authenticated, otherwise redirect to login route
const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

// Public Route only accessible when not authenticated, otherwise redirect to dashboard
const PublicRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/dashboard', state: { from: props.location } }}
          />
        )
      }
    />
  );
};

class App extends Component {

  state = {
    authed: false,
  }

  // add event listener for firebase auth state change for routing
  componentDidMount() {
    this.authListener = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ authed: user ? true : false });
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <NavBar authed={this.state.authed} />
            <div className="container-fluid">
              <div className="row">
                <Switch>
                  <Route path="/" exact component={Home} authed={this.state.authed}/>
                  <PrivateRoute
                    path="/search"
                    authed={this.state.authed}
                    component={Search}
                  />
                  <PrivateRoute
                    path="/dashboard"
                    authed={this.state.authed}
                    component={Dashboard}
                  />
                  <PrivateRoute
                    path="/queue"
                    authed={this.state.authed}
                    component={Queue}
                  />
                  <PrivateRoute
                    path="/myreviews"
                    authed={this.state.authed}
                    component={OwnReviews}
                  />
                  <PrivateRoute
                    path="/detail/:mediaType/:mediaId"
                    authed={this.state.authed}
                    component={MediaDetail}
                  />
                  <PrivateRoute
                    path="/movie/:mediaId"
                    authed={this.state.authed}
                    component={MediaDetail}
                  />
                  <PublicRoute
                    path="/register"
                    authed={this.state.authed}
                    component={Register}
                  />
                  <PublicRoute
                    path="/login"
                    authed={this.state.authed}
                    component={Login}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
