import React from 'react';
import fbReviews from '../../firebaseReqs/queue';
import fbComments from '../../firebaseReqs/comments';
import FriendReview from '../FriendReview/FriendReview';
import './ActivityFeed.css';

class ActivityFeed extends React.Component {

  state = {
    friendReviews: [],
    comments: [],
  }

  getFriendActivities = () => {
    Promise.all([fbReviews.getEntireQueue(), fbComments.getComments()])
      .then(responseArray => {
        const friendReviews = Object.entries(responseArray[0].data)
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
          .slice(0, 20);
        const allComments = Object.values(responseArray[1].data);
        this.setState({ friendReviews: friendReviews, comments: allComments });
      })
      .catch(err => console.error(err));
  }

  componentWillReceiveProps() {
    this.getFriendActivities();
  }

  render() {
    const reviews = this.state.friendReviews.map(review => {
      const reviewer = this.props.friends.find(friend => { return friend.uid === review.ownerUid; });
      const relevantComments = this.state.comments.filter(comment => {
        return comment.reviewId === review.firebaseId;
      })
        .sort((a, b) => {
          return a.commentDate - b.commentDate;
        });
      return (
        <FriendReview key={review.firebaseId} review={review} reviewer={reviewer} comments={relevantComments}/>
      );
    });

    return (
      <div className="ActivityFeed text-center">
        {reviews}
      </div>
    );
  }
}

export default ActivityFeed;
