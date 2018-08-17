import React from 'react';
import fbReviews from '../../firebaseReqs/queue';
import fbComments from '../../firebaseReqs/comments';
import FriendReview from '../FriendReview/FriendReview';
import firebase from 'firebase';
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
          // filter for reviews written by friends or self
          .filter(review => {
            return (this.props.friendUids.includes(review.ownerUid) || review.ownerUid === firebase.auth().currentUser.uid) && review.isReviewed === true;
          })
          // sort by date descending
          .sort((a, b) => { return b.reviewDate - a.reviewDate; })
          // limit to last 20 so we don't get a massive page that scrolls forever -- may include pagination later
          .slice(0, 10);
        const allComments = Object.values(responseArray[1].data);
        this.setState({ friendReviews: friendReviews, comments: allComments });
        this.forceUpdate();
      })
      .catch(err => console.error(err));
  }

  componentWillReceiveProps() {
    this.getFriendActivities();
  }

  componentDidMount() {
    this.autoupdate = setInterval(this.getFriendActivities, 30000);
  }

  componentWillUnmount() {
    clearInterval(this.autoupdate);
  }

  render() {
    const reviews = this.state.friendReviews.map(review => {
      const reviewer = this.props.users.find(friend => { return friend.uid === review.ownerUid; });
      const relevantComments = this.state.comments.filter(comment => {
        return comment.reviewId === review.firebaseId;
      })
        .map(comment => {
          const commenter = this.props.users.find(friend => { return friend.uid === comment.commenterUid; });
          comment.username = commenter.username;
          return comment;
        })
        .sort((a, b) => {
          return a.commentDate - b.commentDate;
        });
      if (review.reviewText) {
        relevantComments.unshift({
          commentDate: 0,
          commentText: review.reviewText,
          commenterUid: review.ownerUid,
          reviewId: review.firebaseId,
          username: this.props.users.find(user => { return user.uid === review.ownerUid; }).username,
        });
      }
      return (
        <FriendReview key={review.firebaseId} review={review} reviewer={reviewer} comments={relevantComments} updater={this.getFriendActivities}/>
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
