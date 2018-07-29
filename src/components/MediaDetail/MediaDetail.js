import React from 'react';
import jw from '../../justwatchApi/justwatch';
import './MediaDetail.css';
import fbQueue from '../../firebaseReqs/queue';
import fbSubs from '../../firebaseReqs/subs';
import StarRating from 'react-star-rating-component';

class MediaDetail extends React.Component {

  state = {
    details: {},
    userReviews: [],
    streamingOptions: [],
    overallRating: 0,
  }

  shapeData = (promiseResponseArray) => {
    const itemDetail = promiseResponseArray[0].data;
    itemDetail.poster = itemDetail.poster.replace('{profile}', 's592');
    const mediaType = itemDetail.object_type;
    const mediaId = itemDetail.id;

    // grab all queue items and filter for reviews for this media
    const userReviews = Object.values(promiseResponseArray[1].data)
      .filter(queueItem => { return queueItem.isReviewed === true && queueItem.mediaId === mediaId && queueItem.mediaType === mediaType; })
      .sort((a, b) => {
        return a.reviewDate - b.reviewDate;
      })
      .reverse();

    let overallRating = 0;
    // set overall rating as average of all reviews of this media item, rounded to the nearest whole number
    if (userReviews.length) {
      overallRating = Math.round(userReviews.reduce((total, currentReview) => {
        return total + currentReview.starRating;
      }, 0) / userReviews.length);
    }

    // make array of numbers representing streaming providers the current user is subscribed to
    const streamingOptions = Object.values(promiseResponseArray[2].data).map(sub => { return sub.providerId; });

    this.setState({
      details: itemDetail,
      userReviews: userReviews,
      overallRating: overallRating,
      streamingOptions: streamingOptions,
    });
  }

  componentDidMount() {
    const mediaType = this.props.match.params.mediaType;
    const mediaId = this.props.match.params.mediaId;
    Promise.all([jw.jwGetItemDetail(mediaType, mediaId), fbQueue.getEntireQueue(), fbSubs.getMySubscriptions()])
      .then(this.shapeData)
      .catch(err => console.error(err));
  }

  render() {

    const { details } = this.state;

    const reviews = this.state.userReviews.map(review => {
      return (
        <div key={review.ownerUid} className="userReview">
          <StarRating name="userStarRating" starCount={5} value={review.starRating} editing={false} />
          <p className="text-left">{review.reviewText}</p>
        </div>
      );
    });

    return (
      <div className="MediaDetail">
        <div className="mediaCard container">
          <div className="col-lg-4 left-column">
            <img src={`https://images.justwatch.com${details.poster}`} alt="Poster" />
            <h4>{details.title}</h4>
            <div className="col-xs-4 mini-left"><h4>{details.age_certification}</h4></div>
            <div className="col-xs-4"><h4>{details.original_release_year}</h4></div>
            <div className="col-xs-4 mini-right"><h4>{details.object_type === 'show' ? `${details.max_season_number} seasons` : `${details.runtime} minutes`}</h4></div>
          </div>
          <div className="col-lg-4 middle-column">Streaming options, description, trailer</div>
          <div className="col-lg-4 right-column"><h4>User Reviews:</h4>{reviews}</div>
        </div>
      </div>
    );
  }
}

export default MediaDetail;
