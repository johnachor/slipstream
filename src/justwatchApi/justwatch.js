
import axios from 'axios';

const jwSearch = (searchTerm) => {
  return axios.post('https://murmuring-spire-99787.herokuapp.com/search', { searchString: searchTerm });
};

const jwGetItemDetail = (mediaType, mediaId) => {
  return axios.post('https://murmuring-spire-99787.herokuapp.com/detail', { mediaType: mediaType, mediaId: mediaId });
};

const jwGetProviders = () => {
  return axios.get('https://murmuring-spire-99787.herokuapp.com/providers');
};

export default { jwSearch, jwGetItemDetail, jwGetProviders };
