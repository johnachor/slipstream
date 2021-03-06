import React from 'react';
import firebase from 'firebase';
import { Badge, Tabs, Tab, ListGroup, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import CurrentFriend from '../CurrentFriend/CurrentFriend';
import FriendSearchResult from '../FriendSearchResult/FriendSearchResult';
import PendingFriend from '../PendingFriend/PendingFriend';
import fbFriends from '../../firebaseReqs/friends';
import UserOptions from '../UserOptions/UserOptions';
import './FriendList.css';

class FriendList extends React.Component {

  state = {
    currentFriends: [],
    pendingRequests: [],
    availableUsers: [],
    searchResults: [],
    searchText: '',
  }

  // this function determines whether there is already an extant friend request between oneself and the target uid
  // this is used to prevent duplicates from being created
  checkIfRequested = (friendUid) => {
    const currentUid = firebase.auth().currentUser.uid;
    return this.props.friendRequests.find(friendReq => {
      return ((friendReq.senderUid === currentUid && friendReq.receiverUid === friendUid) || (friendReq.senderUid === friendUid && friendReq.receiverUid === currentUid));
    });
  };

  // updates state on new props
  updateFriendsList = () => {
    const currentFriends = this.props.users.filter(user => { return this.props.friendUids.includes(user.uid); });
    const pendingRequests = this.props.friendRequests.filter(req => {
      return req.isPending && req.receiverUid === firebase.auth().currentUser.uid;
    });
    const availableUsers = this.props.users.filter(user => {
      return !this.checkIfRequested(user.uid) && user.uid !== firebase.auth().currentUser.uid;
    });
    this.setState({
      availableUsers: availableUsers,
      currentFriends: currentFriends,
      pendingRequests: pendingRequests,
    });
  }

  // the following 4 methods are passed into the relevant child components as props
  deleteFriend = (uid) => {
    const firebaseIdToDelete = this.props.friendRequests.find(req => {
      return req.senderUid === uid || req.receiverUid === uid;
    }).firebaseId;
    fbFriends.deleteRequest(firebaseIdToDelete)
      .then(this.props.updater)
      .catch(err => console.error(err));
  }

  deleteFriendRequest = (firebaseId) => {
    fbFriends.deleteRequest(firebaseId).then(this.props.updater).catch(err => console.error(err));
  }

  sendFriendRequest = (requestObject) => {
    fbFriends.addRequest(requestObject)
      .then(() => {
        const tempResultsState = [...this.state.searchResults];
        this.setState({
          searchResults: tempResultsState.filter(user => {
            return user.uid !== requestObject.receiverUid;
          }),
        });
        this.props.updater();
      })
      .catch(err => console.error(err));
  }

  confirmFriendRequest = (firebaseId, requestObject) => {
    fbFriends.updateRequest(firebaseId, requestObject)
      .then(this.props.updater)
      .catch(err => console.error(err));
  }

  // on new props (parent state change) change state
  componentWillReceiveProps() {
    this.updateFriendsList();
  }

  // filters the array of available non-friends for the search term
  // username can partial match, email must match exactly
  searchUsers = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const searchResults = this.state.availableUsers.filter(user => {
        return user.username.toLowerCase().split(' ').join('').includes(this.state.searchText) || user.email.toLowerCase() === (this.state.searchText);
      });
      this.setState({ searchResults: searchResults });
    }
  };

  searchTextChange = (e) => {
    this.setState({ searchText: e.target.value });
  }

  render() {

    const currentFriendList = this.state.currentFriends.map(friend => {
      return (
        <CurrentFriend key={friend.uid} friend={friend} deleter={this.deleteFriend} />
      );
    });

    const friendSearchResultList = this.state.searchResults.map(user => {
      return (
        <FriendSearchResult key={user.uid} user={user} requester={this.sendFriendRequest} />
      );
    });

    const pendingRequestList = this.state.pendingRequests.map(req => {
      req.username = this.props.users.find(user => { return user.uid === req.senderUid; }).username;
      return (
        <PendingFriend key={req.firebaseId} req={req} confirm={this.confirmFriendRequest} deleter={this.deleteFriendRequest} />
      );
    });

    const pendingTitle = <span>Pending <Badge>{this.state.pendingRequests.length > 0 ? this.state.pendingRequests.length : ''}</Badge></span>;

    return (
      <div className="FriendList">
        <Tabs animation={false} defaultActiveKey={1} id="friendsListTabs">
          <Tab eventKey={1} title="Friends">
            <ListGroup>{currentFriendList}</ListGroup>
          </Tab>
          <Tab eventKey={2} title={pendingTitle}>
            {pendingRequestList}
          </Tab>
          <Tab eventKey={3} title="Find">
            <form>
              <FormGroup
                controlId="friendSearchForm"
              >
                <ControlLabel>Search by username or email</ControlLabel>
                <FormControl
                  type="text"
                  value={this.state.searchText}
                  placeholder="Search term"
                  onChange={this.searchTextChange}
                  onKeyPress={this.searchUsers}
                />
              </FormGroup>
            </form>
            {friendSearchResultList}
          </Tab>
          <Tab eventKey={4} title="Options">
            <UserOptions />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default FriendList;
