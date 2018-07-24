
import axios from 'axios';
// jw.getProviders().then(providers => console.log('providers:', providers));
// jw.search('Anna Kendrick').then(results => console.log('actor search:', results.items));
// jw.search('Deadpool').then(results => console.log('title search:', results.items));
// jw.getTitle('movie', 123777).then(movie => console.log('retrieve specific movie:', movie));
// jw.getPerson(6716).then(person => console.log('retrieve specific person:', person));
// jw.getGenres().then(genres => console.log('genres:', genres));

const jwSearch = (searchTerm) => {
  return axios.post('https://murmuring-spire-99787.herokuapp.com/search', { searchString: searchTerm });
};

export default { jwSearch };
