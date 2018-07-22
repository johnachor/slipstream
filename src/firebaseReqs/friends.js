import axios from 'axios';
import constants from '../constants';

const retrieveFriends = () => {
  return axios.get(`${constants.firebaseConfig.databaseURL}/friendRequests.json`);
};

const retrieveUsers = () => {
  return axios.get(`${constants.firebaseConfig.databaseURL}/users.json`);
};

const retrieveBoth = () => {
  return Promise.all([retrieveFriends(), retrieveUsers()]);
};

const addRequest = (requestObject) => {
  return axios.post(`${constants.firebaseConfig.databaseURL}/friends.json`, requestObject);
};

const updateRequest = (firebaseId, requestObject) => {
  return axios.put(`${constants.firebaseConfig.databaseURL}/friends/${firebaseId}.json`, requestObject);
};

const deleteRequest = (firebaseId) => {
  return axios.delete(`${constants.firebaseConfig.databaseURL}/friends/${firebaseId}.json`);
};

export default { addRequest, updateRequest, deleteRequest, retrieveBoth, retrieveFriends, retrieveUsers };
