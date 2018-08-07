import axios from 'axios';
import constants from '../constants';

const addComment = (commentObject) => {
  return axios.post(`${constants.firebaseConfig.databaseURL}/reviewComments.json`, commentObject);
};

const getComments = () => {
  return axios.get(`${constants.firebaseConfig.databaseURL}/reviewComments.json`);
};

export default { addComment, getComments };
