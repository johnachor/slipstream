import React from 'react';
import StarRating from 'react-star-rating-component';
import './OwnReview.css';

class OwnReview extends React.Component {

  removeItem = () => {
    this.props.onDeleteButtonClick(this.props.media.firebaseId);
  }

  render() {
    const { media } = this.props;
    return (
      <div className="col-xs-12 col-sm-6 col-md-4">
        <div className="OwnReview">
          <div className="thumbnail">
            <img src={`https://images.justwatch.com${media.posterUrl}`} alt="Poster" />
            <div className="caption">
              <h4>{media.title}</h4>
              <StarRating name="mediaRating" starCount={5} value={media.starRating} editing={false} />
              <p>{media.reviewText}</p>
            </div>
            <button className="btn btn-danger" onClick={this.removeItem}>Delete Review</button>
          </div>
        </div>
      </div>
    );
  }
}

export default OwnReview;
