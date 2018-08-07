import React from 'react';
import StarRating from 'react-star-rating-component';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import firebase from 'firebase';
import fbQueue from '../../firebaseReqs/queue';
import './FriendReview.css';

class FriendReview extends React.Component {

  state = {
    queued: false,
    comments: [],
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

  setComments = () => {
    const comments = [...this.props.comments];
    comments.unshift({
      commentDate: 0,
      commentText: this.props.review.reviewText,
      commenterUid: this.props.review.ownerUid,
      reviewId: this.props.review.firebaseId,
    });
    this.setState({ comments: comments });
  }

  componentWillReceiveProps() {
    this.setComments();
  }

  render() {

    const { review, reviewer } = this.props;

    return (
      <div className="reviewHolder">
        <div className="FriendReview col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
          <div className="col-xs-4 col-sm-2 posterHolder">
            <img src={`https://images.justwatch.com${review.posterUrl}`} alt="Poster" />
          </div>
          <div className="col-xs-8 col-sm-10 reviewBody">
            <h4>{reviewer.username} reviewed </h4>
            <h4>{review.title}</h4>
            <StarRating name="reviewRating" starCount={5} value={review.starRating} editing={false} />
          </div>
          <div className="col-xs-8 col-sm-10 queueButtonHolder">
            <LinkContainer className="col-xs-6" to={`/detail/${review.mediaType}/${review.mediaId}`}><Button bsStyle='info'>See Details</Button></LinkContainer>
            <Button className="col-xs-6" onClick={this.addToQueue} disabled={this.state.queued} bsStyle={this.state.queued ? 'success' : 'primary'}>{this.state.queued ? 'Added!' : 'Add to queue'}</Button>
          </div>
        </div>
        <div className="commentHolder col-xs-12 col-sm-10 col-md-8">
          <div className="reviewComment col-xs-8 col-xs-offset-4 col-sm-10 col-sm-offset-2">
            <p><b>{reviewer.username}: </b>{review.reviewText}</p>
          </div>
          <div className="reviewComment col-xs-8 col-xs-offset-4 col-sm-10 col-sm-offset-2">
            <p><b>{reviewer.username}: </b>{review.reviewText}</p>
          </div>
          <div className="reviewComment col-xs-8 col-xs-offset-4 col-sm-10 col-sm-offset-2">
            <p><b>{reviewer.username}: </b>{review.reviewText}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default FriendReview;
