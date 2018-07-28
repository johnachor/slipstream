import axios from 'axios';
import constants from '../constants';
import firebase from 'firebase';

const getMySubscriptions = () => {
  return axios.get(`${constants.firebaseConfig.databaseURL}/subscriptions.json?orderBy="uid"&equalTo="${firebase.auth().currentUser.uid}"`);
};

export default { getMySubscriptions };
