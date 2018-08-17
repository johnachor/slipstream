import React from 'react';
import StarRating from 'react-star-rating-component';
import './QueuedMedia.css';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, FormGroup, FormControl } from 'react-bootstrap';

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
      <div className="col-xs-12 col-md-6 col-lg-4">
        <div className="QueuedMedia">
          <div className="col-xs-4 col-sm-3 col-lg-4 posterHolder">
            <img src={`https://images.justwatch.com${media.posterUrl}`} alt="Poster" />
          </div>
          <div className="col-xs-8 col-sm-9 col-lg-8 queueBody">
            <h4>{media.title}</h4>
            <StarRating
              name='rating'
              value={this.state.starRating}
              starCount={5}
              onStarClick={this.changeStarRating}
              editing={true}
            />
            <FormGroup className="non-mobile-only" controlId="formControlsTextarea">
              <FormControl componentClass="textarea"
                placeholder="Type review here..."
                value={this.state.reviewText}
                onChange={this.reviewTextChange} />
            </FormGroup>
          </div>
          <FormGroup className="mobile-only" controlId="formControlsTextarea">
            <FormControl componentClass="textarea"
              placeholder="Type review here..."
              value={this.state.reviewText}
              onChange={this.reviewTextChange} />
          </FormGroup>
          <div className="col-xs-12 buttonHolder">
            <Button className="col-xs-4" bsStyle="danger" onClick={this.removeItem}>Remove</Button>
            <LinkContainer className="col-xs-4" to={`/detail/${media.mediaType}/${media.mediaId}`}><Button bsStyle='info'>Details</Button></LinkContainer>
            <Button className="col-xs-4" bsStyle="primary" onClick={this.reviewItem}>Submit</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default QueuedMedia;
