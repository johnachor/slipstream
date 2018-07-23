import React from 'react';
import fbQueue from '../../firebaseReqs/queue';
import QueuedMedia from '../QueuedMedia/QueuedMedia';
import './Queue.css';

class Queue extends React.Component {

  state = {
    queue: [],
  }

  updateQueue = () => {
    fbQueue.getMyQueue()
      .then(results => {
        const queuedItems = Object.entries(results.data)
          .filter(queueItem => {
            return !queueItem[1].isReviewed;
          })
          .reduce((queueArray, queueItem) => {
            queueItem[1].firebaseId = queueItem[0];
            queueArray.push(queueItem[1]);
            return queueArray;
          }, []);

        this.setState({ queue: queuedItems });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.updateQueue();
  }

  deleteQueuedItem = (firebaseId) => {
    fbQueue.deleteQueueItem(firebaseId)
      .then(this.updateQueue)
      .catch(err => console.error(err));
  }

  reviewQueuedItem = (firebaseId, reviewedMedia) => {
    if (reviewedMedia.starRating !== 0) {
      fbQueue.addReview(firebaseId, reviewedMedia)
        .then(this.updateQueue)
        .catch(err => console.error(err));
    }
  }

  render() {

    const queueCards = this.state.queue.map(queueItem => {
      return (
        <QueuedMedia key={queueItem.firebaseId} onReviewButtonClick={this.reviewQueuedItem} onDeleteButtonClick={this.deleteQueuedItem} media={queueItem} />
      );
    });

    return (
      <div className="Queue">
        <div className="container">
          {queueCards}
        </div>
      </div>
    );
  }
}

export default Queue;
