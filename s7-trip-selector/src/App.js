import React, { Component } from 'react';
import TripSelector from './TripSelector';
import LocationSource from './LocationSource';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <div>
          <TripSelector locations={(new LocationSource()).locations} />
        </div>
      </div>
    );
  }
}

export default App;
