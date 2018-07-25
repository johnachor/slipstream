import React from 'react';
import StarRating from 'react-star-rating-component';
import { Button } from 'react-bootstrap';
import firebase from 'firebase';
import fbQueue from '../../firebaseReqs/queue';
import './FriendReview.css';

class FriendReview extends React.Component {

  state = {
    queued: false,
  }

  addToQueue = () => {
    const reviewToAdd = { ...this.props.review };
    delete reviewToAdd.firebaseId;
    reviewToAdd.isReviewed = false;
    reviewToAdd.ownerUid = firebase.auth().currentUser.uid;
    reviewToAdd.starRating = 0;
    reviewToAdd.reviewText = '';
    reviewToAdd.reviewDate = 0;
    fbQueue.addQueueItem(reviewToAdd)
      .then(() => this.setState({queued: true}))
      .catch(err => console.error(err));
  }

  render() {

    const { review } = this.props;
    const reviewer = this.props.friends.find(friend => { return friend.uid === review.ownerUid; });
    return (
      <div className="FriendReview col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-5 col-lg-offset-0">
        <div className="col-xs-5 posterHolder">
          <img src={`https://images.justwatch.com${review.posterUrl}`} alt="Poster" />
        </div>
        <div className="col-xs-7 reviewBody">
          <h4>{reviewer.username} reviewed </h4>
          <h4>{review.title}</h4>
          <StarRating name="reviewRating" starCount={5} value={review.starRating} editing={false} />
          <p>{review.reviewText}</p>
        </div>
        <div className="col-xs-7 queueButtonHolder">
          <Button onClick={this.addToQueue} block disabled={this.state.queued} bsStyle={this.state.queued ? 'success' : 'primary'}>{this.state.queued ? 'Added!' : 'Add to my queue'}</Button>
        </div>
      </div>
    );
  }
}

export default FriendReview;
