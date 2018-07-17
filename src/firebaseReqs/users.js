import axios from 'axios';
import constants from '../constants';

const createUserObject = (user) => {
  return axios.post(`${constants.firebaseConfig.databaseURL}/users.json`, user);
};

export default { createUserObject };