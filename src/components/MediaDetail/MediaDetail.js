import React from 'react';
import jw from '../../justwatchApi/justwatch';
import './MediaDetail.css';
import fbQueue from '../../firebaseReqs/queue';
import fbSubs from '../../firebaseReqs/subs';
import fbUsers from '../../firebaseReqs/users';
import StarRating from 'react-star-rating-component';
import YouTube from 'react-youtube';

class MediaDetail extends React.Component {

  state = {
    details: {
      clips: [],
    },
    userReviews: [],
    userSubscriptions: [],
    overallRating: 0,
    streamingProviders: {},
  }

  shapeData = (promiseResponseArray) => {
    const itemDetail = promiseResponseArray[0].data;
    itemDetail.poster = itemDetail.poster.replace('{profile}', 's592');
    if (!itemDetail.clips) itemDetail.clips = [];
    const mediaType = itemDetail.object_type;
    const mediaId = itemDetail.id;

    // filter queue items for reviews for this media item and sort them in reverse chronological order
    const userReviews = Object.values(promiseResponseArray[1].data)
      .filter(queueItem => { return queueItem.isReviewed === true && queueItem.mediaId === mediaId && queueItem.mediaType === mediaType; })
      .sort((a, b) => {
        return b.reviewDate - a.reviewDate;
      });

    let overallRating = 0;
    // set overall rating as average of all reviews of this media item, rounded to the nearest whole number
    // overall rating display is not currently implemented
    if (userReviews.length) {
      overallRating = Math.round(userReviews.reduce((total, currentReview) => {
        return total + currentReview.starRating;
      }, 0) / userReviews.length);
    }

    // make array of numbers representing streaming providers the current user is subscribed to
    // this will be used to display relevant streams before nonrelevant ones
    const userSubscriptions = Object.values(promiseResponseArray[3].data).map(sub => { return sub.providerId; });

    // make easier-to-read object with provider id as key names and properties for icon and name, also show flatrate only
    const streamingProviders = promiseResponseArray[2].data.reduce((providersObject, currentProvider) => {
      providersObject[currentProvider.id] = {
        icon: currentProvider.icon_url.replace('{profile}', 's100'),
        name: currentProvider.clear_name,
      };
      return providersObject;
    }, {});

    const users = Object.values(promiseResponseArray[4].data);

    this.setState({
      details: itemDetail,
      userReviews: userReviews,
      overallRating: overallRating,
      userSubscriptions: userSubscriptions,
      streamingProviders: streamingProviders,
      users: users,
    });
  }

  componentDidMount() {
    const mediaType = this.props.match.params.mediaType;
    const mediaId = this.props.match.params.mediaId;
    Promise.all([jw.jwGetItemDetail(mediaType, mediaId), fbQueue.getEntireQueue(), jw.jwGetProviders(), fbSubs.getMySubscriptions(), fbUsers.getAllUsers()])
      .then(this.shapeData)
      .catch(err => console.error(err));
  }

  render() {

    const { details } = this.state;

    const reviews = this.state.userReviews.map(review => {
      return review.reviewText ? (
        <div key={review.ownerUid} className="userReview">
          <StarRating name="userStarRating" starCount={5} value={review.starRating} editing={false} />
          <p className="text-left">{review.reviewText} ― <i>{this.state.users.find(user => {
            return user.uid === review.ownerUid;
          }).username}, {new Date(review.reviewDate).toLocaleDateString()}</i></p>
        </div>
      ) : '';
    });

    const clips = details.clips.map(clip => {
      return clip.provider === 'youtube' ? (
        <div className="clip" key={clip.external_id}>
          <h6>{clip.name}</h6>
          <YouTube videoId={clip.external_id} opts={{ width: '100%' }} />
        </div>
      ) : '';
    });

    const streamLinks = details.offers ? details.offers.filter(offer => {
      return offer.monetization_type === 'flatrate' && offer.presentation_type === 'hd';
    })
      .map(offer => {
        return (
          <a target="_blank" rel="noopener noreferrer" className="providerLink" key={offer.provider_id} href={`${offer.urls.standard_web}`}><img alt={this.state.streamingProviders[offer.provider_id].name} src={`https://images.justwatch.com${this.state.streamingProviders[offer.provider_id].icon}`} /></a>
        );
      }) : [];

    const avgRatingDisplay = <StarRating name="averageStarRating" starCount={5} value={this.state.overallRating} editing={false} />;

    return details.title ? (
      <div className="MediaDetail">
        <div className="container">
          <div className="col-lg-4 col-md-6 left-column">
            <h4 className="mediaTitle">{details.title}</h4>
            <div className="col-xs-4 mini-left"><h4>{details.age_certification ? details.age_certification : 'NR'}</h4></div>
            <div className="col-xs-4"><h4>{details.original_release_year}</h4></div>
            <div className="col-xs-4 mini-right"><h4>{details.object_type === 'show' ? `${details.max_season_number} seas.` : `${details.runtime} mins`}</h4></div>
            <img src={`https://images.justwatch.com${details.poster}`} alt="Poster" />
            <p>{details.short_description}</p>
          </div>
          <div className="col-lg-4 col-md-6 middle-column">
            <div className="stream-holder">
              <h4>Streaming options:</h4>
              {streamLinks.length ? streamLinks : <h5>None</h5>}
            </div>
            <h4>Average user rating:</h4>
            <div className="avgRating">
              {this.state.overallRating === 0 ? 'No reviews yet' : avgRatingDisplay}
            </div>
            {reviews.length ? <h4>User Reviews:</h4> : ''}
            {reviews}
          </div>
          <div className="col-lg-4 right-column high-res-only">
            <h4>Clips and trailers:</h4>
            <div className="clips-holder">{clips.length ? clips : 'None'}</div>
          </div>
        </div>
      </div>
    ) : (<h1>Retrieving details, please wait...</h1>);
  }
}

export default MediaDetail;
