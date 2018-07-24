import React from 'react';
import fbReviews from '../../firebaseReqs/queue';
import FriendReview from '../FriendReview/FriendReview';
import './ActivityFeed.css';

class ActivityFeed extends React.Component {

  state = {
    friendReviews: [],
  }

  getFriendActivities = () => {
    fbReviews.getEntireQueue()
      .then(queueItems => {
        const friendReviews = Object.entries(queueItems.data)
          // put firebase ID on objects
          .reduce((acc, kvp) => {
            kvp[1].firebaseId = kvp[0];
            acc.push(kvp[1]);
            return acc;
          }, [])
          // filter for reviews written by friends
          .filter(review => {
            return this.props.friendUids.includes(review.ownerUid) && review.isReviewed === true;
          })
          // sort by date
          .sort((a, b) => { return a.reviewDate - b.reviewDate; })
          // reverse to get descending date
          .reverse();
        this.setState({ friendReviews: friendReviews });
      })
      .catch(err => console.error(err));
  }

  componentWillReceiveProps() {
    this.getFriendActivities();
  }

  render() {
    const { friends } = this.props;
    const reviews = this.state.friendReviews.map(review => {
      return (
        <FriendReview key={review.firebaseId} review={review} friends={friends}/>
      );
    });

    return (
      <div className="ActivityFeed">
        {reviews}
      </div>
    );
  }
}

export default ActivityFeed;
