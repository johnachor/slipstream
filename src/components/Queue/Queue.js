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
        const queuedItems = Object.entries(results.data).reduce((queueArray, queuedItem) => {
          if (queuedItem[1].isReviewed === false) {
            queuedItem[1].firebaseId = queuedItem[0];
            queueArray.push(queuedItem[1]);
          }
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

  render() {

    const queueCards = this.state.queue.map(queueItem => {
      return (
        <QueuedMedia key={queueItem.firebaseId} onReviewButtonClick={this.reviewQueuedItem} onDeleteButtonClick={this.deleteQueuedItem} media={queueItem} />
      );
    });

    return (
      <div className="Queue">
        <h1>Queue</h1>
      </div>
    );
  }
}

export default Queue;
