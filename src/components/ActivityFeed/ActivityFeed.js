import React from 'react';
import fbReviews from '../../firebaseReqs/queue';
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
          })
          .sort((a, b) => {
            return a.reviewDate - b.reviewDate;
          });
        this.setState({ friendReviews: friendReviews });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getFriendActivities();
  }

  render() {

    const reviews = this.state.friendReviews.map(review => {
      return (
        <h1 key={review.firebaseId}>{review.reviewText}</h1>
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
