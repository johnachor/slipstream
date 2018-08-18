import React from 'react';
import jw from '../../justwatchApi/justwatch';
import SearchResults from '../SearchResults/SearchResults';
import fbSubs from '../../firebaseReqs/subs';
import { Checkbox, FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';
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
    const searchResults = apiResponse.data.items.filter(item => { return item.poster; });
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

    const searchResults = this.state.filterForSubs ? this.state.searchResults.filter(this.hasStream) : this.state.searchResults;
    return (
      <div className="Search">
        <div className="container">
          <form className="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
            <FormGroup>
              <InputGroup>
                <FormControl
                  type="text"
                  value={searchText}
                  placeholder="Enter search term..."
                  onChange={this.searchTextChange}
                />
                <InputGroup.Button>
                  <Button className="searchButton" type="submit" onClick={this.searchJW} disabled={this.state.searching}> {this.state.searching ? 'Working...' : 'Submit'}</Button>
                </InputGroup.Button>
              </InputGroup>
              <Checkbox checked={this.state.filterForSubs} onChange={this.filterChange}>Show only streams on my subscriptions</Checkbox>
            </FormGroup>
          </form>
        </div>
        <SearchResults results={searchResults} />
      </div>
    );
  }
}

export default Search;
