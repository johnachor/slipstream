import React from 'react';
import SearchResult from '../SearchResult/SearchResult';
import './SearchResults.css';

class SearchResults extends React.Component {

  state = {
    results: [],
  }

  componentWillReceiveProps(newProps) {
    if (newProps.results !== this.props.results) this.setState({ results: newProps.results });
  }

  render() {

    const resultCards = this.state.results.map(result => {
      return (
        <SearchResult key={`${result.object_type}-${result.id}`} media={result}/>
      );
    });

    return (
      <div className="SearchResults container">
        {resultCards}
      </div>
    );
  }
}

export default SearchResults;
