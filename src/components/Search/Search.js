import React from 'react';
import jw from '../../justwatchApi/justwatch';
import SearchResults from '../SearchResults/SearchResults';
import fbSubs from '../../firebaseReqs/subs';
import { Checkbox } from 'react-bootstrap';
import './Search.css';

class Search extends React.Component {

  state = {
    searchText: '',
    searchResults: [],
    mySubscriptions: [],
    searching: true,
    filterForSubs: false,
  }

  searchTextChange = (e) => {
    this.setState({searchText: e.target.value});
  };

  isStream = (offer) => {
    return offer.monetization_type === 'flatrate' && this.state.mySubscriptions.includes(offer.provider_id);
  };

  // returns true if a media item's "offers" array contains any flatrate offers
  // from providers the current user is subscribed to
  hasStream = (item) => {
    return item.offers ? item.offers.some(this.isStream) : false;
  };

  setSearchResults = (apiResponse) => {
    let searchResults = apiResponse.data.items.filter(item => { return item.poster; });
    if (this.state.filterForSubs) {
      searchResults = searchResults.filter(this.hasStream);
    }
    this.setState({ searchResults: searchResults });
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

  filterChange = (e) => {
    this.setState({ filterForSubs: e.target.checked });
  }

  componentDidMount() {
    fbSubs.getMySubscriptions()
      .then(subs => {
        const providerArray = Object.values(subs.data).map(sub => { return sub.providerId; });
        this.setState({ mySubscriptions: providerArray, searching: false });
      })
      .catch(err => console.error(err));
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
              <Checkbox checked={this.state.filterForSubs} onChange={this.filterChange}>Show only results streamable with my subscriptions</Checkbox>
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
