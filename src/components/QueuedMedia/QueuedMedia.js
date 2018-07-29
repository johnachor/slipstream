import React from 'react';
import StarRating from 'react-star-rating-component';
import './QueuedMedia.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class QueuedMedia extends React.Component {

  state = {
    starRating: 0,
    reviewText: '',
  }

  changeStarRating = (val) => {
    const tempState = { ...this.state };
    tempState.starRating = val;
    this.setState(tempState);
  }

  reviewTextChange = (e) => {
    const tempState = { ...this.state };
    tempState.reviewText = e.target.value;
    this.setState(tempState);
  };

  removeItem = () => {
    this.props.onDeleteButtonClick(this.props.media.firebaseId);
  }

  reviewItem = () => {
    const reviewedMedia = { ...this.props.media };
    delete reviewedMedia.firebaseId;
    reviewedMedia.reviewDate = Date.now();
    reviewedMedia.reviewText = this.state.reviewText;
    reviewedMedia.starRating = this.state.starRating;
    reviewedMedia.isReviewed = true;
    this.props.onReviewButtonClick(this.props.media.firebaseId, reviewedMedia);
  }

  render() {
    const { media } = this.props;
    return (
      <div className="col-xs-12 col-sm-6 col-md-4">
        <div className="QueuedMedia">
          <Button className="bottomButton" block bsStyle="danger" onClick={this.removeItem}>Remove</Button>
          <div className="thumbnail">
            <img src={`https://images.justwatch.com${media.posterUrl}`} alt="Poster" />
            <div className="caption">
              <h4>{media.title}</h4>
              <StarRating
                name='rating'
                value={this.state.starRating}
                starCount={5}
                onStarClick={this.changeStarRating}
                editing={true}
              />
              <textarea
                className="form-control"
                rows={4}
                id="reviewInput"
                placeholder="Type review here..."
                value={this.state.reviewText}
                onChange={this.reviewTextChange}
              />
            </div>
          </div>
          <Link to={`/detail/${media.mediaType}/${media.mediaId}`}><Button block bsStyle='info'>See Details</Button></Link>
          <Button className="bottomButton" block bsStyle="primary" onClick={this.reviewItem}>Submit Review</Button>
        </div>
      </div>
    );
  }
}

export default QueuedMedia;
