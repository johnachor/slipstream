import React from 'react';
import fbQueue from '../../firebaseReqs/queue';
import './Queue.css';

class Queue extends React.Component {

  state = {
    queue: [],
  }

  componentDidMount() {
    fbQueue.getMyQueue()
      .then(results => {
        const queuedItems = Object.entries(results.data).reduce((queueArray, queuedItem) => {
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

  render() {
    return (
      <div className="Queue">
        <h1>Queue</h1>
      </div>
    );
  }
}

export default Queue;
