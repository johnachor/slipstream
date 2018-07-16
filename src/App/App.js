import React, { Component } from 'react';
import './App.css';
import ActivityFeed from '../components/ActivityFeed/ActivityFeed';
import FriendList from '../components/FriendList/FriendList';
import FriendReview from '../components/FriendReview/FriendReview';
import Login from '../components/Login/Login';
import MediaDetail from '../components/MediaDetail/MediaDetail';
import MediaReviews from '../components/MediaReviews/MediaReviews';
import NavBar from '../components/NavBar/NavBar';
import OwnReview from '../components/OwnReview/OwnReview';
import OwnReviews from '../components/OwnReviews/OwnReviews';
import Queue from '../components/Queue/Queue';
import QueuedMedia from '../components/QueuedMedia/QueuedMedia';
import Register from '../components/Register/Register';
import Search from '../components/Search/Search';
import SearchResult from '../components/SearchResult/SearchResult';
import SearchResults from '../components/SearchResults/SearchResults';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ActivityFeed />
        <FriendList />
        <FriendReview />
        <Login />
        <MediaDetail />
        <MediaReviews />
        <NavBar />
        <OwnReview />
        <OwnReviews />
        <Queue />
        <QueuedMedia />
        <Register />
        <Search />
        <SearchResult />
        <SearchResults />
      </div>
    );
  }
}

export default App;
