import React from 'react';
import fbQueue from '../../firebaseReqs/queue';
import OwnReview from '../OwnReview/OwnReview';
import './OwnReviews.css';

class OwnReviews extends React.Component {

  state = {
    reviews: [],
  }

  updateReviews = () => {
    fbQueue.getMyQueue()
      .then(results => {
        const reviewedItems = Object.entries(results.data)
          .filter(queueItem => {
            return queueItem[1].isReviewed;
          })
          .reduce((queueArray, queueItem) => {
            queueItem[1].firebaseId = queueItem[0];
            queueArray.push(queueItem[1]);
            return queueArray;
          }, []);

        this.setState({reviews: reviewedItems});
      })
      .catch(err => console.error(err));
  }

  deleteReviewedItem = (firebaseId) => {
    fbQueue.deleteQueueItem(firebaseId)
      .then(this.updateReviews)
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.updateReviews();
  }

  render() {

    const reviewCards = this.state.reviews.map(reviewItem => {
      return (
        <OwnReview key={reviewItem.firebaseId} onDeleteButtonClick={this.deleteReviewedItem} media={reviewItem} />
      );
    });

    return (
      <div className="OwnReviews">
        <div className="container">
          {reviewCards}
        </div>
      </div>
    );
  }
}

export default OwnReviews;
