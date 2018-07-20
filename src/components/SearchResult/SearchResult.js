import React from 'react';

import './SearchResult.css';

class SearchResult extends React.Component {



  render() {
    return (
      <div className="col-xs-12 col-sm-6 col-md-4 SearchResult">
        <h1>{this.props.media.title}</h1>
      </div>
    );
  }
}

export default SearchResult;
