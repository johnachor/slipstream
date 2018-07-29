import React from 'react';
import StarRating from 'react-star-rating-component';
import './OwnReview.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class OwnReview extends React.Component {

  removeItem = () => {
    this.props.onDeleteButtonClick(this.props.media.firebaseId);
  }

  render() {
    const { media } = this.props;
    return (
      <div className="col-xs-12 col-sm-6 col-md-4">
        <div className="OwnReview">
          <Button bsStyle="danger" onClick={this.removeItem}>Delete Review</Button>
          <div className="thumbnail">
            <img src={`https://images.justwatch.com${media.posterUrl}`} alt="Poster" />
            <div className="caption">
              <h4>{media.title}</h4>
              <StarRating name="mediaRating" starCount={5} value={media.starRating} editing={false} />
              <p>{media.reviewText}</p>
            </div>
          </div>
          <Link to={`/detail/${media.mediaType}/${media.mediaId}`}><Button block bsStyle='info'>See Details</Button></Link>
        </div>
      </div>
    );
  }
}

export default OwnReview;
