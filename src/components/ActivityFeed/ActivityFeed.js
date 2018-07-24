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
          .reduce((acc, kvp) => {
            kvp[1].firebaseId = kvp[0];
            acc.push(kvp[1]);
            return acc;
          }, [])
          .filter(review => {
            return this.props.friendUids.includes(review.ownerUid) && review.isReviewed === true;
          });
        this.setState({ friendReviews: friendReviews });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
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
