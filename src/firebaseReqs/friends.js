import axios from 'axios';
import constants from '../constants';

const retrieveFriends = () => {
  return axios.get(`${constants.firebaseConfig.databaseURL}/friendRequests.json`);
};

const retrieveUsers = () => {
  return axios.get(`${constants.firebaseConfig.databaseURL}/users.json`);
};

const retrieveBoth = () => {
  return Promise.all([retrieveUsers(), retrieveFriends()]);
};

const addRequest = (requestObject) => {
  return axios.post(`${constants.firebaseConfig.databaseURL}/friendRequests.json`, requestObject);
};

const updateRequest = (firebaseId, requestObject) => {
  return axios.put(`${constants.firebaseConfig.databaseURL}/friendRequests/${firebaseId}.json`, requestObject);
};

const deleteRequest = (firebaseId) => {
  return axios.delete(`${constants.firebaseConfig.databaseURL}/friendRequests/${firebaseId}.json`);
};

export default { addRequest, updateRequest, deleteRequest, retrieveBoth, retrieveFriends, retrieveUsers };
