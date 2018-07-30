import axios from 'axios';
import constants from '../constants';
import firebase from 'firebase';

const getMySubscriptions = () => {
  return axios.get(`${constants.firebaseConfig.databaseURL}/subscriptions.json?orderBy="uid"&equalTo="${firebase.auth().currentUser.uid}"`);
};

const deleteSubscription = (firebaseId) => {
  return axios.delete(`${constants.firebaseConfig.databaseURL}/subscriptions/${firebaseId}.json`);
};

const addSubscription = (subscriptionObject) => {
  return axios.post(`${constants.firebaseConfig.databaseURL}/subscriptions.json`, subscriptionObject);
};

export default { getMySubscriptions, deleteSubscription, addSubscription };
