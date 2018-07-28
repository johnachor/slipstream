import React from 'react';
// import StarRating from 'react-star-rating-component';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import fbQueue from '../../firebaseReqs/queue';
import './SearchResult.css';

class SearchResult extends React.Component {

  state = {
    // rating: 3,
    queued: this.props.queued || false,
  }

  addToQueue = (e) => {
    e.preventDefault();
    const queueItem = {
      ownerUid: firebase.auth().currentUser.uid,
      mediaType: this.props.media.object_type,
      mediaId: this.props.media.id,
      posterUrl: this.props.media.poster,
      description: this.props.media.short_description,
      title: this.props.media.title,
      isReviewed: false,
      starRating: 0,
      reviewText: '',
      reviewDate: 0,
    };
    fbQueue.addQueueItem(queueItem)
      .then(() => {
        const tempState = { ...this.state };
        tempState.queued = true;
        this.setState(tempState);
      })
      .catch(err => console.error(err));
  }

  gotoDetail = () => {
    this.props.history.push(`/detail/${this.props.media.object_type}/${this.props.media.id}`);
  }

  render() {
    const { media } = this.props;
    // const { rating } = this.state;

    if (media.poster) media.poster = media.poster.replace('{profile}', 's592');

    return (
      <div className="col-xs-12 col-sm-6 col-md-4">
        <div className="SearchResult">
          <div className="thumbnail">
            <img src={`https://images.justwatch.com${media.poster}`} alt="Poster" />
            <div className="caption">
              <h4>{media.title}</h4>
              {/* <StarRating name="mediaRating" starCount={5} value={rating} editing={false} /> */}
              <p>{media.short_description}</p>
            </div>
            <Link to={`/detail/${this.props.media.object_type}/${this.props.media.id}`}>Detail</Link>
          </div>
          <button disabled={this.state.queued} className={`btn ${this.state.queued ? 'btn-success' : 'btn-primary'} addToQueue`} onClick={this.addToQueue}>{this.state.queued ? 'Added!' : 'Add to Queue'}</button>
        </div>
      </div>
    );
  }
}

export default SearchResult;
