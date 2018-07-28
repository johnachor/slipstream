import React from 'react';
import jw from '../../justwatchApi/justwatch';
import './MediaDetail.css';
import fbQueue from '../../firebaseReqs/queue';
import fbSubs from '../../firebaseReqs/subs';

class MediaDetail extends React.Component {

  state = {
    details: {},
    userReviews: [],
    streamingOptions: [],
    overallRating: 0,
  }

  getItemDetail = (mediaType, mediaId) => {
    return jw.jwGetItemDetail(mediaType, mediaId);
  }

  shapeData = (promiseResponseArray) => {
    const itemDetail = promiseResponseArray[0].data;
    const mediaType = itemDetail.object_type;
    const mediaId = itemDetail.id;

    // grab all queue items and filter for reviews for this media
    const userReviews = Object.values(promiseResponseArray[1].data)
      .filter(queueItem => { return queueItem.isReviewed === true && queueItem.mediaId === mediaId && queueItem.mediaType === mediaType; });

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
    Promise.all([this.getItemDetail(mediaType, mediaId), fbQueue.getEntireQueue(), fbSubs.getMySubscriptions()])
      .then(this.shapeData)
      .catch(err => console.error(err));
  }

  render() {

    return (
      <div className="MediaDetail">
        <div className="mediaCard container">
          <div className="col-lg-4">Poster, title, rating, year, length</div>
          <div className="col-lg-4">Streaming options, description, trailer</div>
          <div className="col-lg-4">User reviews</div>
        </div>
      </div>
    );
  }
}

export default MediaDetail;
