import axios from 'axios';
import constants from '../constants';

const addQueueItem = (media) => {
  return axios.post(`${constants.firebaseConfig.databaseURL}/mediaItems.json`, media);
};

export default { addQueueItem };
