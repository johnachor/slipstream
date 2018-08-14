import axios from 'axios';

const proxyDomain = 'https://murmuring-spire-99787.herokuapp.com';

const jwSearch = (searchTerm) => {
  return axios.post(`${proxyDomain}/search`, { searchString: searchTerm });
};

const jwGetItemDetail = (mediaType, mediaId) => {
  return axios.post(`${proxyDomain}/detail`, { mediaType: mediaType, mediaId: mediaId });
};

const jwGetProviders = () => {
  return axios.get(`${proxyDomain}/providers`);
};

export default { jwSearch, jwGetItemDetail, jwGetProviders };
