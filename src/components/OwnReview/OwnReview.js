import React from 'react';
import StarRating from 'react-star-rating-component';
import './OwnReview.css';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

class OwnReview extends React.Component {

  removeItem = () => {
    this.props.onDeleteButtonClick(this.props.media.firebaseId);
  }

  render() {
    const { media } = this.props;
    return (
      <div className="col-xs-12 col-md-6">
        <div className="OwnReview">
          <div className="col-xs-4 col-sm-3 col-lg-4 posterHolder">
            <img src={`https://images.justwatch.com${media.posterUrl}`} alt="Poster" />
          </div>
          <div className="col-xs-8 col-sm-9 col-lg-8 reviewBody">
            <h4>{media.title}</h4>
            <StarRating name="mediaRating" starCount={5} value={media.starRating} editing={false} />
            <p className="non-mobile-only">{media.reviewText}</p>
          </div>
          <p className="mobile-only">{media.reviewText}</p>
          <div className="col-xs-12 buttonHolder">
            <Button className="col-xs-6" bsStyle="danger" onClick={this.removeItem}>Remove</Button>
            <LinkContainer className="col-xs-6" to={`/detail/${media.mediaType}/${media.mediaId}`}><Button bsStyle='info'>Details</Button></LinkContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default OwnReview;
