import axios from 'axios';
import constants from '../constants';

const createUserObject = (user) => {
  return axios.post(`${constants.firebaseConfig.databaseURL}/users.json`, user);
};

const getAllUsers = () => {
  return axios.get(`${constants.firebaseConfig.databaseURL}/users.json`);
};

export default { createUserObject, getAllUsers };
