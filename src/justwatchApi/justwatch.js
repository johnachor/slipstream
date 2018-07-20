// The below imported module is included as-is in the project source so it will build with the
// unmodified create-react-app build script. Only the export line has been changed.
// TODO when project is complete and maintained: fork and refactor this module for ES6/front-end
import JustWatch from './original-package/justwatch-api/index';

const jw = new JustWatch();

// jw.getProviders().then(providers => console.log('providers:', providers));
// jw.search('Anna Kendrick').then(results => console.log('actor search:', results.items));
// jw.search('Deadpool').then(results => console.log('title search:', results.items));
// jw.getTitle('movie', 123777).then(movie => console.log('retrieve specific movie:', movie));
// jw.getPerson(6716).then(person => console.log('retrieve specific person:', person));
// jw.getGenres().then(genres => console.log('genres:', genres));

const jwSearch = (searchTerm) => {
  return jw.search(searchTerm);
};

export default { jwSearch };
