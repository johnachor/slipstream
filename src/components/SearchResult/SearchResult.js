import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import firebase from 'firebase';
import fbQueue from '../../firebaseReqs/queue';
import './SearchResult.css';

class SearchResult extends React.Component {

  state = {
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

    media.poster = media.poster.replace('{profile}', 's592');

    return (
      <div className="col-xs-12 col-md-6 col-lg-4">
        <div className="SearchResult">
          <div className="col-xs-4 col-sm-3 col-lg-4 posterHolder">
            <img src={`https://images.justwatch.com${media.poster}`} alt="Poster" />
          </div>
          <div className="col-xs-8 col-sm-9 col-lg-8 resultBody">
            <h4>{media.title}</h4>
            <p className="non-mobile-only">{media.short_description}</p>
          </div>
          <p className="mobile-only">{media.short_description}</p>
          <div className="col-xs-12 buttonHolder">
            <LinkContainer to={`/detail/${this.props.media.object_type}/${this.props.media.id}`}><Button className="col-xs-6" bsStyle='info'>See Details</Button></LinkContainer>
            <Button className="col-xs-6" disabled={this.state.queued} bsStyle={this.state.queued ? 'success' : 'primary'} onClick={this.addToQueue}>{this.state.queued ? 'Added!' : 'Add to Queue'}</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchResult;
