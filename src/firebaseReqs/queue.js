import axios from 'axios';
import constants from '../constants';
import firebase from 'firebase';

const addQueueItem = (media) => {
  return axios.post(`${constants.firebaseConfig.databaseURL}/mediaItems.json`, media);
};

const getMyQueue = () => {
  return axios.get(`${constants.firebaseConfig.databaseURL}/mediaItems.json?orderBy="ownerUid"&equalTo="${firebase.auth().currentUser.uid}"`);
};

const deleteQueueItem = (id) => {
  return axios.delete(`${constants.firebaseConfig.databaseURL}/mediaItems/${id}.json`);
};

const addReview = (id, reviewedMedia) => {
  return axios.put(`${constants.firebaseConfig.databaseURL}/mediaItems/${id}.json`, reviewedMedia);
};

export default { addQueueItem, getMyQueue, deleteQueueItem, addReview };
