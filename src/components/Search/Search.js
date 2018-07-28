import React from 'react';
import jw from '../../justwatchApi/justwatch';
import SearchResults from '../SearchResults/SearchResults';

import './Search.css';

class Search extends React.Component {

  state = {
    searchText: '',
    searchResults: [],
  }

  searchTextChange = (e) => {
    this.setState({searchText: e.target.value});
  };

  setSearchResults = (apiResponse) => {
    this.setState({ searchResults: apiResponse.data.items.filter(item => { return item.poster; }) });
  };

  searchJW = (e) => {
    e.preventDefault();
    this.setState({ searching: true });
    jw.jwSearch(this.state.searchText)
      .then((response) => {
        this.setState({ searching: false });
        this.setSearchResults(response);
      })
      .catch((err) => {
        console.error(err);
        this.setState({ searching: false });
      });
  }

  render() {
    const { searchText } = this.state;
    return (
      <div className="Search">
        <form className="form-horizontal col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1">
          <div className="form-group">
            <label htmlFor="searchInput" className="col-sm-4 control-label">
              Search Term
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                id="searchInput"
                placeholder="Search..."
                value={searchText}
                onChange={this.searchTextChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-5 col-sm-6">
              <button
                type="submit"
                className="btn btn-default col-xs-12"
                onClick={this.searchJW}
                disabled={this.state.searching}
              >
                {this.state.searching ? 'Working...' : 'Search'}
              </button>
            </div>
          </div>
        </form>
        <SearchResults results={this.state.searchResults} />
      </div>
    );
  }
}

export default Search;
