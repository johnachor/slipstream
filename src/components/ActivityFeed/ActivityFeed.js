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
          // sort by date descending
          .sort((a, b) => { return b.reviewDate - a.reviewDate; })
          // limit to last 20 so we don't get a massive page that scrolls forever -- may include pagination later
          .slice(0,20);
        this.setState({ friendReviews: friendReviews });
      })
      .catch(err => console.error(err));
  }

  componentWillReceiveProps() {
    this.getFriendActivities();
  }

  render() {
    const reviews = this.state.friendReviews.map(review => {
      const reviewer = this.props.friends.find(friend => { return friend.uid === review.ownerUid; });
      return (
        <FriendReview key={review.firebaseId} review={review} reviewer={reviewer}/>
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
