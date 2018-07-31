import React from 'react';
import jw from '../../justwatchApi/justwatch';
import './UserOptions.css';
import fbSubs from '../../firebaseReqs/subs';
import CurrentSubscription from '../CurrentSubscription/CurrentSubscription';
import { ListGroup } from 'react-bootstrap';
import AvailableProvider from '../AvailableProvider/AvailableProvider';
import firebase from 'firebase';

class UserOptions extends React.Component {

  state = {
    subscriptions: [],
    providers: {},
  }

  shapeData = (promiseResponseArray) => {
    // adds firebase key name as key on object and returns array of objects
    const mySubs = Object.entries(promiseResponseArray[1].data).reduce((subs, currentSub) => {
      currentSub[1].firebaseId = currentSub[0];
      subs.push(currentSub[1]);
      return subs;
    }, []);

    // creates a simplified provider object with provider IDs as key names
    const providers = promiseResponseArray[0].data.reduce((providersObject, currentProvider) => {
      if (currentProvider.monetization_types.includes('flatrate')) {
        providersObject[currentProvider.id] = {
          icon: currentProvider.icon_url.replace('{profile}', 's100'),
          name: currentProvider.clear_name,
        };
      }
      return providersObject;
    }, {});

    this.setState({
      subscriptions: mySubs,
      providers: providers,
    });
  }

  deleteSubscription = (firebaseId) => {
    fbSubs.deleteSubscription(firebaseId).then(this.refreshMySubs).catch(err => console.error(err));
  };

  addSubscription = (providerId) => {
    const newsub = {
      providerId: providerId,
      uid: firebase.auth().currentUser.uid,
    };
    fbSubs.addSubscription(newsub)
      .then(this.refreshMySubs).catch(err => console.error(err));
  };

  refreshMySubs = () => {
    fbSubs.getMySubscriptions().then(response => {
      const mySubs = Object.entries(response.data).reduce((subs, currentSub) => {
        currentSub[1].firebaseId = currentSub[0];
        subs.push(currentSub[1]);
        return subs;
      }, []);
      this.setState({ subscriptions: mySubs });
    }).catch(err => console.error(err));
  }

  componentDidMount() {
    Promise.all([jw.jwGetProviders(), fbSubs.getMySubscriptions()])
      .then(this.shapeData)
      .catch(err => console.error(err));
  }

  render() {

    const currentSubs = this.state.subscriptions.map(sub => {
      return (
        <CurrentSubscription key={sub.firebaseId} deleter={this.deleteSubscription} sub={sub} providerName={this.state.providers[sub.providerId].name} />
      );
    });

    const availableProviders = Object.entries(this.state.providers)
      .reduce((providersArray, providerKVP) => {
        providerKVP[1].providerId = parseInt(providerKVP[0], 10);
        providersArray.push(providerKVP[1]);
        return providersArray;
      }, [])
      .map(provider => {
        return !this.state.subscriptions.some(sub => {
          return sub.providerId === provider.providerId;
        }) ? (
            <AvailableProvider key={provider.providerId} provider={provider} subscribe={this.addSubscription} />
          ) : '';
      });

    return (
      <div className="UserOptions">
        <h4>Current subscriptions:</h4>
        <ListGroup>
          {currentSubs}
        </ListGroup>
        <h4>Available providers:</h4>
        <ListGroup>
          {availableProviders}
        </ListGroup>
      </div>
    );
  }
}

export default UserOptions;
