import React from 'react';
import StarRating from 'react-star-rating-component';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import fbQueue from '../../firebaseReqs/queue';
import './FriendReview.css';

class FriendReview extends React.Component {

  state = {
    queued: false,
  }

  // revert queue object to initial unreviewed state, strip firebase ID, and change user to self, then add to queue
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

  goToDetail = () => {
    const { review } = this.props;
    this.props.history.push(`/details/${review.mediaType}/${review.mediaId}`);
  }

  render() {

    const { review, reviewer } = this.props;
    return (
      <div className="FriendReview col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-5 col-lg-offset-0">
        <div className="col-xs-5 posterHolder">
          <img src={`https://images.justwatch.com${review.posterUrl}`} alt="Poster" />
        </div>
        <div className="col-xs-7 reviewBody">
          <h4>{reviewer ? reviewer.username : ''} reviewed </h4>
          <h4>{review.title}</h4>
          <StarRating name="reviewRating" starCount={5} value={review.starRating} editing={false} />
          <p>{review.reviewText}</p>
        </div>
        <div className="col-xs-7 queueButtonHolder">
          <Link to={`/detail/${review.mediaType}/${review.mediaId}`}><Button block bsStyle='info'>See Details</Button></Link>
          <Button onClick={this.addToQueue} block disabled={this.state.queued} bsStyle={this.state.queued ? 'success' : 'primary'}>{this.state.queued ? 'Added!' : 'Add to my queue'}</Button>
        </div>
      </div>
    );
  }
}

export default FriendReview;
