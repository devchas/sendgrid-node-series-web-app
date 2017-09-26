import React, { Component } from 'react';
import logo from './sg_logo.png';
import './App.css';
import DashboardContainer from './containers/DashboardContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Custom Drip Campaign Dashboard</h2>
        </div>
        <DashboardContainer />
      </div>
    );
  }
}

export default App;
