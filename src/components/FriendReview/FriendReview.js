import React from 'react';
import StarRating from 'react-star-rating-component';
import { Button, FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import firebase from 'firebase';
import fbQueue from '../../firebaseReqs/queue';
import './FriendReview.css';
import fbComments from '../../firebaseReqs/comments';

class FriendReview extends React.Component {

  state = {
    queued: false,
    comments: [],
    newCommentText: '',
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
    this.setState({ comments: comments });
  }

  componentWillReceiveProps() {
    this.setComments();
  }

  newCommentTextChange = (e) => {
    this.setState({ newCommentText: e.target.value });
  };

  addComment = (e) => {
    e.preventDefault();

    if (this.state.newCommentText.length) {
      const newComment = {
        commenterUid: firebase.auth().currentUser.uid,
        commentDate: Date.now(),
        commentText: this.state.newCommentText,
        reviewId: this.props.review.firebaseId,
      };

      // clear comment entry field
      this.setState({ newCommentText: '' });

      // add comment to firebase and update state of parent
      fbComments.addComment(newComment).then(() => {
        this.props.updater();
      }).catch(err => console.error(err));
    }
  }

  render() {

    const { review, reviewer } = this.props;

    const comments = this.state.comments.map(comment => {
      return (
        <div key={comment.commentText} className="reviewComment col-xs-12 col-sm-10 col-sm-offset-2">
          <p><b>{comment.username}: </b>{comment.commentText}</p>
        </div>
      );
    });

    return (
      <div className="reviewHolder">
        <div className="FriendReview col-xs-12">
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
        <div className="commentHolder col-xs-12">
          {comments}
          <div className="reviewComment col-xs-12 col-sm-10 col-sm-offset-2">
            <form>
              <FormGroup>
                <InputGroup>
                  <FormControl
                    type="text"
                    value={this.state.newCommentText}
                    placeholder="Add a comment..."
                    onChange={this.newCommentTextChange}
                  />
                  <InputGroup.Button>
                    <Button type="submit" onClick={this.addComment}>Submit</Button>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default FriendReview;
