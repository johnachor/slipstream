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
          .filter(queuedItem => {
            return !queuedItem[1].isReviewed;
          })
          .reduce((queueArray, queuedItem) => {
            queuedItem[1].firebaseId = queuedItem[0];
            queueArray.push(queuedItem[1]);
            return queueArray;
          }, []);

        const tempState = { ...this.state };
        tempState.queue = queuedItems;
        this.setState(tempState);
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
