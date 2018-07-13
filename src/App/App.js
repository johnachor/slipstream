import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
const JustWatch = require('justwatch-api');

const jw = new JustWatch();

jw.getProviders().then(providers => console.log('providers:', providers));
jw.search('Anna Kendrick').then(results => console.log('actor search:', results.items));
jw.search('Deadpool').then(results => console.log('title search:', results.items));
jw.getTitle('movie', 157149).then(movie => console.log('retrieve specific movie:', movie));
jw.getPerson(6716).then(person => console.log('retrieve specific person:', person));
jw.getGenres().then(genres => console.log('genres:', genres));

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
