import React from 'react';
import StarRating from 'react-star-rating-component';
import './SearchResult.css';

class SearchResult extends React.Component {

  state = {
    rating: 3,
  }

  render() {
    const { media } = this.props;
    const { rating } = this.state;

    media.poster = media.poster.replace('{profile}', 's592');

    return (
      <div className="col-xs-12 col-sm-6 col-md-4 SearchResult">
        <div class="thumbnail">
          <img src={`https://images.justwatch.com${media.poster}`} alt="Poster" />
          <div class="caption">
            <h3>{media.title}</h3>
            <StarRating starCount={5} value={rating} editing={false} />
            <p>{media.short_description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchResult;
