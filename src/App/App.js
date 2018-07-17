import React, { Component } from 'react';
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom';
import './App.css';
// import ActivityFeed from '../components/ActivityFeed/ActivityFeed';
import Dashboard from '../components/Dashboard/Dashboard';
// import FriendList from '../components/FriendList/FriendList';
// import FriendReview from '../components/FriendReview/FriendReview';
import Home from '../components/Home/Home';
import Login from '../components/Login/Login';
// import MediaDetail from '../components/MediaDetail/MediaDetail';
// import MediaReviews from '../components/MediaReviews/MediaReviews';
import NavBar from '../components/NavBar/NavBar';
// import OwnReview from '../components/OwnReview/OwnReview';
import OwnReviews from '../components/OwnReviews/OwnReviews';
import Queue from '../components/Queue/Queue';
// import QueuedMedia from '../components/QueuedMedia/QueuedMedia';
import Register from '../components/Register/Register';
import Search from '../components/Search/Search';
// import SearchResult from '../components/SearchResult/SearchResult';
// import SearchResults from '../components/SearchResults/SearchResults';
import firebase from 'firebase';
import firebaseInit from '../firebaseReqs/initialize';

firebaseInit();

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

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <NavBar />
            <div className="container">
              <div className="row">
                <Switch>
                  <Route path="/" exact component={Home} />
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
