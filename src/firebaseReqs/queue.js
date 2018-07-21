import axios from 'axios';
import constants from '../constants';
import firebase from 'firebase';

const addQueueItem = (media) => {
  return axios.post(`${constants.firebaseConfig.databaseURL}/mediaItems.json`, media);
};

const getMyQueue = () => {
  return axios.get(`${constants.firebaseConfig.databaseURL}/mediaItems.json?orderBy="ownerUid"&equalTo="${firebase.auth().currentUser.uid}"`);
}

export default { addQueueItem, getMyQueue };
